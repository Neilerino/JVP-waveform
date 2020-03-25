from app import app, socket, db
from flask import request, jsonify
from app.collection.collection import Collection_Thread, start_collection, stop_collection
from app.models import History
from app.interfacer import HistoryInterfacer

thread = Collection_Thread()

@app.route('/', methods=['GET'])
def index():
    return 'test message'

@app.route('/collection/POST/start', methods=['GET', 'POST'])
def collect_data():
    global thread
    print(thread.collecting)
    if thread.collecting is False:
        hist_id = 1
        start_collection(thread, hist_id)
        return jsonify('Started Data Collection')
    else:
         return 'Collection already running'

@app.route('/collection/POST/stop', methods=['GET', 'POST'])
def stop_collecting_data():
    global thread
    if thread.collecting is True:
        stop_collection(thread)
        return 'Sending task to stop collection'
    return 'No collection currently running'


#TODO: After the microproccesor class is implemented interface this API with that class
@app.route('/microprocessor/POST/values', methods=['GET', 'POST'])
def modify_microprocessor():
    micro_state = request.json
    return 'Sent information to MicroProcessor'


@app.route('/history/GET/ids', methods=['GET'])
def get_histories():
    ids = [1, 2, 3]
    return jsonify(ids)

@app.route('/history/GET/<int:hist_id>/data', methods=['GET'])
def get_history_data(hist_id):
    hist_interface= HistoryInterfacer(int(hist_id))
    data = hist_interface.get_history_data()
    return jsonify(data)

@app.route('/initilize/db', methods=['GET'])
def create_database():
    db.create_all()
    return ''