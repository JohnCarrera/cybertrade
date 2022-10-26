import websocket
import _thread
import time
import rel


def dataStream():
    pass

def on_message(ws, message):
    print(f'on-message: {message}')

def on_error(ws, error):
    print(f'on-error: {error}')

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")

def on_open(ws):
    print("Opened connection")
    ws.send({
        "action": "auth",
        "key": "CKBIPE7Z656PQ0H4ESUH",
        "secret": "9BFN6cl7lfxCTHIKgubpYOKA77tKIaruHqz1VZM3"
        })
    ws.send({"action":"subscribe","quotes":["AMZN"]})

websocket.enableTrace(True)
ws = websocket.WebSocketApp("wss://stream.data.alpaca.markets/v2/iex",
                            on_open=on_open,
                            on_message=on_message,
                            on_error=on_error,
                            on_close=on_close)

ws.run_forever(dispatcher=rel)  # Set dispatcher to automatic reconnection
rel.signal(2, rel.abort)  # Keyboard Interrupt
rel.dispatch()
