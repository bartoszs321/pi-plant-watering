from gpiozero import Motor
from time import sleep
from fastapi import FastAPI

app = FastAPI()

pump = Motor(forward=26, backward=20)

@app.get("/watering/start")
async def start_watering():
    pump.forward(1)
    sleep(5)
    pump.stop()

@app.get("/watering/start/slow")
async def start_watering_slow():
    pump.forward(0.1)
    sleep(5)
    pump.stop()

@app.get("watering/stop")
async def stop_watering():
    pump.stop()

# while True:
#     pump.forward(1)
#     sleep(5)
#     pump.stop()
#     sleep(5)
#     pump.forward(0.1)
#     sleep(5)
#     pump.stop()
