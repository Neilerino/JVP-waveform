from threading import Thread, _active
from app import db, socket
from random import randint
from app.interfacer import HistoryInterfacer
import datetime
import json
import time

# Initialize variables for collection threads

class Collection_Thread(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.history = None
        self.collecting = False
        self.start()

    def run(self):
        try:
            while True:
                if self.collecting is True and self.history is not None:
                    # TODO:
                    # call function to get data from micropocessor here,
                    #  for now I'll return a random number
                    # data = {
                    #     'value': randint(0, 100),
                    #     'time': datetime.datetime.now().strftime("%H:%M:%S")
                    # }
                    data = self.history.stream_history_data()
                    data_json = json.dumps(data, indent=4, sort_keys=True, default=str)
                    socket.emit('message', data_json)
                    time.sleep(1)
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
