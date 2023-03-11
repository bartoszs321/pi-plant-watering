from gpiozero import Motor
from time import sleep
from fastapi import FastAPI, HTTPException

app = FastAPI()

pump = Motor(forward=26, backward=20)

@app.get("/watering/start/{time}")
async def start_watering(time):
    if (time >= 30):
        return HTTPException(status_code=400, detail="Time too high")
    pump.forward(1)
    sleep(time)
    pump.stop()

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

@app.get("watering/stop")
async def stop_watering():
    pump.stop()
