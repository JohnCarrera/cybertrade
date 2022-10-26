from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from app.models import db
from app.models.watchlist_stock import Watchlist, Stock
from app.forms.watchlist_form import WatchlistForm
from app.api.auth_routes import validation_errors_to_error_messages

watchlist_routes = Blueprint('watchlist', __name__)
