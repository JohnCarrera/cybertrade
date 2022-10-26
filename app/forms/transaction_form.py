from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired

class TransactionForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    symbol = StringField('symbol', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
