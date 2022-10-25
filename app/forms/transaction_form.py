from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired
from app.models import Watchlist

class WatchlistForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    symbol = StringField('symbol', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
