import serial
import serial.tools.list_ports


ports_list = serial.tools.list_ports.comports(include_links=False)
active_com = None
for port in ports_list:
    # FIXME: get rid of the location from hwid as it wont work if the USB port is changed
    if port.hwid == "USB VID:PID=10C4:EA60 SER=0001 LOCATION=1-2.1.4":
        active_com = port.device

if active_com is not None:
    # with serial.Serial(active_com, 115200, timeout=None) as port:
    with serial.Serial(active_com, 9600, timeout=None) as port:
        while True:
            reading = port.read_until(b'\r\n').decode("utf-8")
            print(reading.replace('\r\n', ""))

