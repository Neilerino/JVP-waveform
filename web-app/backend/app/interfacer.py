import csv

class HistoryInterfacer():
    def __init__(self, id):
        self.id = id
        self.filename = 'app/data/graph-data-' + str(id) + '.csv'
        self.index = 1
        
    def get_history_data(self):
        data_points = []
        i = 0
        with open(self.filename) as file:
            for row in file:
                if i > 0:
                    row_values = row.split()[0].split(',')
                    data = {
                        "y" : row_values[1],
                        "x" : row_values[0]
                    }
                    data_points.append(data)
                i += 1
        return data_points
    
    def stream_history_data(self):
        data_points = []
        i = 0
        with open(self.filename) as file:
            for row in file:
                if self.index  <= i  < self.index + 10:
                    row_values = row.split()[0].split(',')
                    data = {
                        "y" : row_values[1],
                        "x" : row_values[0]
                    }
                    data_points.append(data)
                i += 1
        self.index += 10 if (self.index + 10) < (i - 1) else 1
        return data_points
