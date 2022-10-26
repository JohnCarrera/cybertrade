from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload


from app.models import db, Note
from app.forms.note_form import NoteForm
from app.api.auth_routes import validation_errors_to_error_messages

note_routes = Blueprint('note', __name__)
