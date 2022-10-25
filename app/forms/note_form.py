from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Watchlist

class NoteForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    symbol = StringField('symbol', validators=[DataRequired()])
    note = StringField('note', validators=[DataRequired()])
