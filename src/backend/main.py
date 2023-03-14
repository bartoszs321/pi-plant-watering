from gpiozero import Motor
from time import sleep
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
pump = Motor(forward=26, backward=20)

class WateringConfig(BaseModel):
    duration: int
    speed: float

@app.get("/watering/start/fast")
async def start_watering_fast():
    pump.forward(1)
    sleep(5)
    pump.stop()

@app.get("/watering/start/slow")
async def start_watering_slow():
    pump.forward(0.6)
    sleep(5)
    pump.stop()

@app.post("/watering/start")
async def start_watering(config: WateringConfig):
    if (config.duration > 30):
        return HTTPException(status_code=400, detail="Duration too long")

    if (config.speed > 1 or config.speed < 0):
        return HTTPException(status_code=400, detail="Incorrect speed")

    pump.forward(config.speed)
    sleep(config.duration)
    pump.stop()

@app.get("watering/stop")
async def stop_watering():
    pump.stop()
