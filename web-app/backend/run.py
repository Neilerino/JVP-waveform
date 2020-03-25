from app import app, socket, db

if __name__ == '__main__':
    socket.run(app, port=4000)