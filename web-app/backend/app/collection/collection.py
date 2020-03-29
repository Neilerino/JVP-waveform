from threading import Thread, _active
from app import db, socket
from random import randint
from app.interfacer import HistoryInterfacer
from app.serial_connection import SerialConnection
import datetime
import json
import time
import serial


def get_serial_data():
    com_port = '/dev/cu.usbmodemFD121'
    read_size = 50  # arbitrary number
    line_end = "\r\n"
    freq = 60
    
    with serial.Serial(com_port, 115200, timeout=None) as port:
        output_list = []
        if port.in_waiting > 0:
            serial_read = str(port.read_until(line_end, read_size))
            serial_read = serial_read.replace('b', '')
            serial_read = serial_read.replace("'", '')
            serial_read = serial_read.split('\\r\\n')
            for serial_data in serial_read:
                if len(serial_data) == 10 and serial_data.find(',') is not -1:
                    data_str = serial_data.split(',')
                    time = float(data_str[0]) / freq
                    voltage = round((float(data_str[1]) / 1023 * 5) * 1000, 4)
                    output = {
                        'x': time,
                        'y': voltage
                    }
                    output_list.append(output)
        return output_list

class Collection_Thread(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.history = None
        self.collecting = False
        self.serial_connect = SerialConnection()
        self.start()

    def run(self):
        try:
            while True:
                if self.collecting is True and self.history is not None:
                    data = self.serial_connect.do_thing()
                    time.sleep(0.5)
                    if data.__len__ is not 0:
                        data_json = json.dumps(data, indent=4, sort_keys=True, default=str)
                        socket.emit('message', data_json)
        finally:
            print('Ending Thread Process')
            # send socket that recording has ended

    def end_collection(self):
        self.collecting = False

    def begin_collection(self):
        self.collecting = True
        
    def set_history(self, hist):
        self.history = hist

def start_collection(thread, hist_id):
    print('Started Data Collection')
    history = HistoryInterfacer(hist_id)
    thread.set_history(history)
    thread.begin_collection()

def stop_collection(thread):
    print('Ending Data Collection')
    thread.end_collection()
