from app import db
from datetime import datetime

class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False,
                     default=datetime.now)
    data = db.Column(db.Text)
    