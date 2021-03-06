import os

from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template("index.html")

@socketio.on("user connected")
def handleUser(data):
    print("User connected: " + data["user_name"])

@socketio.on('message received')
def handleMessage(data, methods=['GET', 'POST']):
    print('Received data: ' + str(data))
    socketio.emit('send message', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)