import os
from flask import Flask, render_template, request, session, redirect, g
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.stock_routes import stock_routes
from .api.watchlist_routes import watchlist_routes
from .api.transaction_routes import transaction_routes
from .api.asset_routes import asset_routes
from .api.note_routes import note_routes

from .seeds import seed_commands

from .config import Config

# import socket
# from _thread import *
# import threading

import websocket
import _thread
import time
import rel
import json
from threading import Thread

app = Flask(__name__)





# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(stock_routes, url_prefix='/api/stocks')
app.register_blueprint(watchlist_routes, url_prefix='/api/watchlists')
app.register_blueprint(transaction_routes, url_prefix='/api/transactions')
app.register_blueprint(asset_routes, url_prefix='/api/assets')
app.register_blueprint(note_routes, url_prefix='/api/notes')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/start-stream', methods=['GET'])
def start_stream():
    global stock_prices
    stock_prices = {
                "AMZN":0.00,
                "NFLX":0.00,
                "GOOG":0.00,
                "MSFT":0.00,
                "TSLA":0.00,
                "META":0.00,
                "NVDA":0.00,
                "ORCL":0.00,
                "CSCO":0.00,
                "CRM" :0.00,
                "ADBE":0.00,
                "QCOM":0.00,
                "IBM" :0.00,
                "INTC":0.00,
                "PYPL":0.00,
                "AMD" :0.00,
                "SONY":0.00,
                "ABNB":0.00,
                "MU"  :0.00,
                "TEAM":0.00,
                "VMW" :0.00,
                "ATVI":0.00,
                "UBER":0.00,
                "ADSK":0.00,
                "ZM"  :0.00,
                "DELL":0.00,
                "EA"  :0.00,
                "TWTR":0.00,
                "SNOW":0.00,
                "TXN" :0.00,
    }

    alpaca_login = '{"action": "auth", "key": "CKASOG6G35Y9RQTRX0HZ", "secret": "Svi5m9AFJnP0I4U3d1g6NdOVb8RUgKu6fbRbiLb7"}'
    alpaca_sub = '{"action":"subscribe","quotes":["AMZN", "NFLX", "GOOG", "MSFT", "TSLA", "META", "NVDA", "ORCL", "CSCO", "CRM", "ADBE", "QCOM", "IBM", "INTC", "PYPL", "AMD", "SONY", "ABNB", "MU", "TEAM", "VMW", "ATVI", "UBER", "ADSK", "ZM", "DELL", "EA", "TWTR",  "SNOW", "TXN"]}'
    # data = message
    # dataDict = json.loads(data)[0]
    # print(f'dict: {dataDict}')

    # if(dataDict['msg'] == 'connected'):
        # print('read connected from msg')

    def on_error(ws, error):
        print(f'on-error: {error}')

    def on_close(ws, close_status_code, close_msg):
        print("### closed ###")

    def on_open(ws):
        print("Opened connection")
        ws.send(alpaca_login)
        ws.send(alpaca_sub)
        connected = True

    def data_stream():
        connected = True
        data = dict()

        def on_message(ws, message):
            print(message)
            global stock_prices
        # print(f'on-message: {message}')
            if (connected):
                data = json.loads(message)
                for stock in data:
                    # print(stock)
                    stock_prices[stock['S']] = stock['bp']
                    # print(stock_prices)

# websocket.enableTrace(True)
        ws = websocket.WebSocketApp("wss://stream.data.sandbox.alpaca.markets/v2/iex",
                                on_open=on_open,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
        ws.run_forever()  # Set dispatcher to automatic reconnection
        # rel.signal(2, rel.abort)  # Keyboard Interrupt
        # rel.dispatch()

    ds_thread = Thread(target=data_stream)
    ds_thread.start()
    return({'msg': 'data stream started'})


@app.route('/data', methods=['GET'])
def stock_data():
    global stock_prices
    # global stock_prices
    if('stock_prices' in globals()):
        return(stock_prices)
    else:
        return {
                "AMZN":0.00,
                "NFLX":0.00,
                "GOOG":0.00,
                "MSFT":0.00,
                "TSLA":0.00,
                "META":0.00,
                "NVDA":0.00,
                "ORCL":0.00,
                "CSCO":0.00,
                "CRM" :0.00,
                "ADBE":0.00,
                "QCOM":0.00,
                "IBM" :0.00,
                "INTC":0.00,
                "PYPL":0.00,
                "AMD" :0.00,
                "SONY":0.00,
                "ABNB":0.00,
                "MU"  :0.00,
                "TEAM":0.00,
                "VMW" :0.00,
                "ATVI":0.00,
                "UBER":0.00,
                "ADSK":0.00,
                "ZM"  :0.00,
                "DELL":0.00,
                "EA"  :0.00,
                "TWTR":0.00,
                "SNOW":0.00,
                "TXN" :0.00,
            }


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
