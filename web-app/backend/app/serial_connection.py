import serial
import serial.tools.list_ports
import time


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        else:
            cls._instances[cls].__init__(*args, **kwargs)
        return cls._instances[cls]


class SerialConnection(metaclass=Singleton):
    def __init__(self):
        self._connection = serial.Serial(port=None, baudrate=9600, timeout=None)

    def open(self) -> bool:
        for port in serial.tools.list_ports.comports(include_links=False):
            if port.hwid == "USB VID:PID=10C4:EA60 SER=0001 LOCATION=1-2.1.4":
                self._connection.port = port.device
                self._connection.open()
                return True
        return False

    def close(self):
        self._connection.close()

    def is_open(self) -> bool:
        return self._connection.is_open

    def in_waiting(self) -> int:
        return self._connection.in_waiting

    def read(self, size: int) -> bytes:
        return self._connection.read(size)

    def read_until(self, termination=None, size=None):
        if termination is None:
            return self._connection.read_until()
        else:
            return self._connection.read_until(termination, size)


if __name__ == "__main__":
    a = SerialConnection()
    b = SerialConnection()
    assert a == b

    if a.open():
        assert b.is_open()
        i = 0
        while i < 5:
            # if a.in_waiting() > 0:
            #     print("reading:", a.read(a.in_waiting()))
            #     i = i + 1
            #     time.sleep(1)
            reading = a.read_until(b'\r\n').decode("utf-8")
            print("received:", reading.replace("\r\n", "(CR)(LF)"))
            i = i + 1
            time.sleep(1)

        b.close()
        assert not a.is_open()








