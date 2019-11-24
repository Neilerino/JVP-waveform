from threading import Thread, _active
from app import socket
from random import randint
import datetime
import json
import time

# Initialize variables for collection threads

class Collection_Thread(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.collecting = False
        self.start()

    def run(self):
        try:
            while True:
                if self.collecting is True:
                    # call function to get data from micropocessor here,
                    #  for now I'll return a random number
                    data = {
                        'data': randint(0, 100),
                        'time': datetime.datetime.now()
                    }
                    data_json = json.dumps(data, indent=4, sort_keys=True, default=str)
                    socket.send(data_json, json=True)
                    time.sleep(0.5)
        finally:
            print('Ending Thread Process')
            # send socket that recording has ended

    def end_collection(self):
        self.collecting = False

    def begin_collection(self):
        self.collecting = True

def start_collection(thread):
    print('Started Data Collection')
    thread.begin_collection()

def stop_collection(thread):
    print('Ending Data Collection')
    thread.end_collection()
