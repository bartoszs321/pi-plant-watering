from gpiozero import Motor
from time import sleep
from datetime import datetime, timedelta
from pydantic import BaseModel
from tinydb import TinyDB, Query

from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, FastAPI, HTTPException, status, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

pump = Motor(forward=20, backward=26)

db = TinyDB('db.json')

db.default_table_name = 'jwt-settings'
SECRET_KEY = db.get(doc_id=1)['secret_key']
ALGORITHM = db.get(doc_id=1)['algorithm']
ACCESS_TOKEN_EXPIRE_MINUTES = db.get(doc_id=1)['access_token_expiry_minutes']

def get_users():
    db.default_table_name = '_default'
    return db.all()

class WateringConfig(BaseModel):
    duration: int
    speed: float

class Token(BaseModel):
    access_token: str
    token_type: str
    expiry: datetime


class TokenData(BaseModel):
    username: str | None = None

class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None

class UserInDB(User):
    hashed_password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://192.168.0.55:3000', 'http://172.29.4.222:3000'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    for item in db:
        if Query().username == username:
            return UserInDB(**item)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt, expire


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(get_users(), username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
        current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/token", response_model=Token)
async def login_for_access_token(
        form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(get_users(), form_data.username,
                             form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token, expires = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expiry": expires
    }


@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


def update_password(username, new_password):
    db.update({'hashed_password': get_password_hash(new_password)},
              Query().username == username)


@app.post("/user")
async def update_user(
        new_password: str = Form(),
        current_user: User = Depends(get_current_active_user),
):
    update_password(current_user.username, new_password)
    return current_user

@app.post("/watering/start")
async def start_watering(config: WateringConfig, token: str = Depends(oauth2_scheme)):
    if (config.duration > 30):
        return HTTPException(status_code=400, detail="Duration too long")

    if (config.speed > 1 or config.speed < 0):
        return HTTPException(status_code=400, detail="Incorrect speed")

    pump.forward(config.speed)
    sleep(config.duration)
    pump.stop()

@app.get("watering/stop")
async def stop_watering(token: str = Depends(oauth2_scheme)):
    pump.stop()
