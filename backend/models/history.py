from app import db
import json
from datetime import datetime

class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False,
                     default=datetime.now)
    data = db.Column(db.Text)
    patient = db.Column(db.Text)
    
    def __repr__(self):
        return "<History {}>".format(self.data)
    
    def append_data(self, data_point):
        data_parsed = json.loads(self.data)
        print(data_parsed)
        