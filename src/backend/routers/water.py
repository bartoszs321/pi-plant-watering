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

pump = Motor(forward=20, backward=26)
# pump = object()


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/start")
async def start_watering(config: WateringConfig, token: str = Depends(oauth2_scheme)):
    if config.duration > 60:
        raise HTTPException(status_code=400, detail="Duration too long")

    if config.speed > 1 or config.speed < 0:
        raise HTTPException(status_code=400, detail="Incorrect speed")

    pump.forward(config.speed)
    sleep(config.duration)
    pump.stop()


@router.get("/stop")
async def stop_watering(token: str = Depends(oauth2_scheme)):
    pump.stop()
