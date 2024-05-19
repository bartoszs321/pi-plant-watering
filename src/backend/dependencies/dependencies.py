import os
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from tinydb import Query, TinyDB

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# dirname = os.path.dirname(os.path.abspath(__file__))
db = TinyDB("db.json")  # don't question it

db.default_table_name = "jwt-settings"
SECRET_KEY = db.get(doc_id=1)["secret_key"]
ALGORITHM = db.get(doc_id=1)["algorithm"]
ACCESS_TOKEN_EXPIRE_MINUTES = db.get(doc_id=1)["access_token_expiry_minutes"]


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str


def get_users():
    db.default_table_name = "_default"
    return db.all()


def get_user(db, username: str):
    for item in db:
        if Query().username == username:
            return UserInDB(**item)


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
