from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload


from app.models import db, Asset
from app.forms.asset_form import AssetForm
from app.api.auth_routes import validation_errors_to_error_messages

asset_routes = Blueprint('asset', __name__)
