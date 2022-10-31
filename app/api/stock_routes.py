from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload


from app.models import db
from app.models.watchlist_stock import Stock, Watchlist
from app.api.auth_routes import validation_errors_to_error_messages

stock_routes = Blueprint('stock', __name__)

@stock_routes.route('', methods=['GET'])
@login_required
def get_stocks():
    stocks = Stock.query.all()
    return {stock.symbol: stock.to_dict() for stock in stocks}


@stock_routes.route('<string:sym>', methods=['GET'])
@login_required
def get_single_stock(sym):
    stock = Stock.query.filter_by(symbol=sym.upper()).first()

    if stock is None:
        return {
            "message": "Watchlist not found",
            "statusCode": 404
        }, 404

    return stock.to_big_dict()
