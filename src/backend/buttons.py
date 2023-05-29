from gpiozero import Motor, Button
import os
from time import sleep
from multiprocessing import Process

button17 = Button(17) # blue wire
button27 = Button(27) # green wire
button22 = Button(22) # yellow wire

pump = Motor(forward=26, backward=20)

#water all on red switch press
def button27_water_all():
	while True:
		button27.wait_for_press()
		pump.forward(1)
		sleep(15)
		pump.stop()

#resets the pi on brown switch
def reset():
	while True:
		button22.wait_for_press()
		os.system("sudo shutdown -r now")

# def button17():
# 	while True:
# 		button17.wait_for_press()
# 		print("Button pressed")

if __name__ == "__main__":
	#create a multiprocessing.Process instance for each function to enable parallelism 
	resetprocess = Process(target = button27_water_all)
	resetprocess.start()

	waterProcess = Process(target=reset)
	waterProcess.start()

	button17process = Process(target=reset)
	button17process.start()

	resetprocess.join()
	waterProcess.join()
	button17process.join()