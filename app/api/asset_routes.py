from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload


from app.models import db, Asset
from app.forms.asset_form import AssetForm
from app.forms.asset_update_cash_form import AssetUpdateCashForm
from app.api.auth_routes import validation_errors_to_error_messages

asset_routes = Blueprint('asset', __name__)


@asset_routes.route('', methods=['GET'])
@login_required
def get_assets():

        assets = Asset.query.filter_by(user_id=current_user.id)

        return {ass.symbol:ass.to_dict() for ass in assets}


@asset_routes.route('', methods=['POST'])
@login_required
def create_asset():

    form = AssetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form_data = form.data
        asset = Asset(
            user_id=current_user.id,
            symbol=form_data['symbol'],
            type=form_data['type'],
            value=form_data['value'],
            quantity=form_data['quantity'],
        )

        db.session.add(asset)
        db.session.commit()
        return asset.to_dict()
    return {'msg': 'failed'}, 400

@asset_routes.route('/_CASH', methods=['PATCH'])
@login_required
def update_cash():

    asset = Asset.query.filter_by(
                                    symbol='_CASH',
                                    user_id=current_user.id
                                ).first()

    if asset is None:
        return {
                    "message": "Asset not found",
                    "statusCode": 404}, 404


    form = AssetUpdateCashForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('pppppppppppppppppppppppp - validated')
        form_data = form.data
        asset.quantity = form_data['quantity']

        db.session.commit()

        return asset.to_dict()

    return {'msg': 'failed'}, 400

@asset_routes.route('/<int:ass_id>', methods=['PUT'])
@login_required
def update_asset(ass_id):

    asset = Asset.query.get(ass_id)

    if asset is None:
        return {
                    "message": "Asset not found",
                    "statusCode": 404}, 404

    if asset.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    form = AssetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form_data = form.data
        print('form validated')

        asset.symbol = form_data['symbol']
        asset.type = form_data['type']
        asset.value = form_data['value']
        asset.quantity = form_data['quantity']

        db.session.commit()

        return asset.to_dict()
    return {'error': 'operation failed'}, 400


@asset_routes.route('/<int:ass_id>', methods=['DELETE'])
@login_required
def remove_asset(ass_id):

    asset = Asset.query.get(ass_id)

    if asset is None:
        return {
                    "message": "Asset not found",
                    "statusCode": 404}, 404

    if asset.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    db.session.delete(asset)
    db.session.commit()

    return {
        "message": "Successfully deleted",
        "symbol": asset.symbol,
        "statusCode": 200}
