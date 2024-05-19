from gpiozero import Motor, Button
import os
from time import sleep
from signal import pause

button17 = Button(17)  # blue wire - black switch
button27 = Button(27)  # green wire - red switch
button22 = Button(22)  # yellow wire - brown switch

pump = Motor(forward=20, backward=26)


# water all on red switch press
def water():
    pump.forward(1)
    sleep(15)
    pump.stop()


# resets the pi on brown switch
def reset():
    os.system("sudo shutdown -r now")


# def button17():
# print("Button pressed")

button27.when_pressed = water
button22.when_pressed = reset

pause()
