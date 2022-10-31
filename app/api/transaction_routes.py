from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload


from app.models import db, Transaction
from app.forms.transaction_form import TransactionForm
from app.api.auth_routes import validation_errors_to_error_messages

transaction_routes = Blueprint('transaction', __name__)


@transaction_routes.route('', methods=['GET'])
@login_required
def get_transactions():

        trs = Transaction.query.filter_by(user_id=current_user.id)

        return {tr.id:tr.to_dict() for tr in trs}

@transaction_routes.route('', methods=['POST'])
@login_required
def create_transaction():

    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form_data = form.data

        tr = Transaction(
                        user_id=current_user.id,
                        symbol=form_data['symbol'],
                        price=form_data['price'],
                        quantity=form_data['quantity'],
                        balance=form_data['balance'],
        )

        db.session.add(tr)
        db.session.commit()

        return tr.to_dict()
