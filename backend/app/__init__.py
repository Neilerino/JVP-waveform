from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.config import Config

app = Flask(__name__, instance_relative_config=True)
socket = SocketIO(app, cors_allowed_origins="*")
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes, models