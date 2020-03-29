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
    
    def save_data(cls, id, data):
        hist = History.query.get(id)
        hist.data = data
        db.session.add(hist)
        db.session.commit()
        return
     
    def get_histories():
        hist_ids = History.query.with_entities('id').all()
        return hist_ids
         