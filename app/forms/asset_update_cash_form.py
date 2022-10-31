from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired

class AssetUpdateCashForm(FlaskForm):
    quantity = FloatField('quantity', validators=[DataRequired()])
