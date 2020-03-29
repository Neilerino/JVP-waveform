import csv

class HistoryInterfacer():
    def __init__(self, id):
        self.id = id
        self.filename = 'app/data/graph-data-' + str(id) + '.csv'
        self.stream_name = 'app/serial_csv/data/test.csv'
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
        samples = 50
        with open(self.stream_name) as file:
            for row in file:
                if self.index  <= i  < self.index + samples:
                    row_values = row.split()[0].split(',')
                    data = {
                        "y" : row_values[1],
                        "x" : row_values[0]
                    }
                    data_points.append(data)
                i += 1
        self.index += samples if (self.index + samples) < (i - 1) else 1
        return data_points
