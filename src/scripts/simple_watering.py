from gpiozero import Motor
from time import sleep

pump1: Motor = Motor(forward=20, backward=26)  # brown = 20, white = 26
pump2: Motor = Motor(forward=16, backward=19)  # ? = 16, ? = 19


def main():
    pump1.forward(1)
    sleep(30)
    pump1.stop()


if __name__ == "__main__":
    main()
