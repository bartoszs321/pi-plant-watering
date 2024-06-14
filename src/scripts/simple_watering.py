from gpiozero import Motor
from time import sleep

pump1: Motor = Motor(
    forward=20, backward=19
)  # brown = 20 (M1B), ?? = 19 (not plugged in)
pump2: Motor = Motor(
    forward=26, backward=16
)  # white = 26 (M2A), ?? = 16 (not plugged in)

timeInMinutes: int = 1 * 60


def main():
    pump1.forward(1)
    pump2.forward(1)
    sleep(timeInMinutes)
    pump2.stop()
    pump1.stop()


if __name__ == "__main__":
    main()
