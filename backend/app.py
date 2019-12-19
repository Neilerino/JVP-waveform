from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config


app = Flask(__name__)
socket = SocketIO(app, cors_allowed_origins="*")
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from manage import routes, models