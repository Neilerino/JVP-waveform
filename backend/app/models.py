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
        if self.data is None:
            self.data = data_point
            db.session.commit()
            return
        
        loaded_data = json.loads(self.data)
        
        if isinstance(loaded_data, list):
            data_parsed = loaded_data
        else:
            data_parsed = []
            data_parsed.append(loaded_data)
            
        data_parsed.append(json.loads(data_point))
        self.data = json.dumps(data_parsed)
        db.session.commit()
        return
        