from flask import Flask
from flask_socketio import SocketIO, send

app = Flask(__name__)
socket = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return 'test message'

if __name__ == '__main__':
    socket.run(app, port=4000)
