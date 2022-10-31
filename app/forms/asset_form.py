from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired

class AssetForm(FlaskForm):
    symbol = StringField('symbol', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    value = FloatField('value', validators=[DataRequired()])
    quantity = FloatField('quantity', validators=[DataRequired()])
