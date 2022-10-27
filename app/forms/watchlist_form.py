from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models.watchlist_stock import Watchlist

class WatchlistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
