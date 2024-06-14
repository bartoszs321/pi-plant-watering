from fastapi import APIRouter
from gpiozero import Motor
from time import sleep
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, Form
from fastapi.security import OAuth2PasswordBearer


class WateringConfig(BaseModel):
    duration: int
    speed: float


router = APIRouter(prefix="/watering", tags=["water"])

pump1: Motor = Motor(
    forward=20, backward=19
)  # brown = 20 (M1B), ?? = 19 (not plugged in)
pump2: Motor = Motor(
    forward=26, backward=16
)  # white = 26 (M2A), ?? = 16 (not plugged in)

# pump1 = object
# pump2 = object


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/start")
async def start_watering(config: WateringConfig, token: str = Depends(oauth2_scheme)):
    if config.speed > 1 or config.speed < 0:
        raise HTTPException(status_code=400, detail="Incorrect speed")

    pump1.forward(1)
    pump2.forward(1)
    sleep(config.duration)
    pump2.stop()
    pump1.stop()


@router.get("/stop")
async def stop_watering(token: str = Depends(oauth2_scheme)):
    pump1.stop()
    pump2.stop()
