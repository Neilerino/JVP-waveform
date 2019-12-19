from collection.collection import Collection_Thread, start_collection, stop_collection
from app import app, socket
from models.history import History

thread = Collection_Thread()

@app.route('/')
def index():
    return 'test message'

@app.route('/collection/POST/start')
def collect_data():
    global thread
    print(thread.collecting)
    if thread.collecting is False:
        hist = History()
        start_collection(thread, hist)
        return 'Sending task to start collection'
    else:
         return 'Collection already running'

@app.route('/collection/POST/stop')
def stop_collecting_data():
    global thread
    if thread.collecting is True:
        stop_collection(thread)
        return 'Sending task to stop collection'
    return 'No collection currently running'

if __name__ == '__main__':
    socket.run(app, port=4000)
