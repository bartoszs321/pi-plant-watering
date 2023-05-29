from typing import Annotated

from gpiozero import Motor
from time import sleep
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sys import platform

app = FastAPI()

if platform == "linux" or platform == "linux2":
    pump = Motor(forward=26, backward=20)
elif platform == "win32":
    pump = object()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class WateringConfig(BaseModel):
    duration: int
    speed: float


@app.get("/")
async def home(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}


# @app.get("/watering/start/fast")
# async def start_watering_fast():
#     pump.forward(1)
#     sleep(5)
#     pump.stop()

# @app.get("/watering/start/slow")
# async def start_watering_slow():
#     pump.forward(0.6)
#     sleep(5)
#     pump.stop()

# @app.post("/watering/start")
# async def start_watering(config: WateringConfig):
#     if (config.duration > 30):
#         return HTTPException(status_code=400, detail="Duration too long")

#     if (config.speed > 1 or config.speed < 0):
#         return HTTPException(status_code=400, detail="Incorrect speed")

#     pump.forward(config.speed)
#     sleep(config.duration)
#     pump.stop()

# @app.get("watering/stop")
# async def stop_watering():
#     pump.stop()
