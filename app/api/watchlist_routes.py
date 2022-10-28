from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from app.models import db
from app.models.watchlist_stock import Watchlist, Stock
from app.forms.watchlist_form import WatchlistForm
from app.api.auth_routes import validation_errors_to_error_messages

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('', methods=['GET'])
@login_required
def get_watchlists():

    watchlists = Watchlist.query \
    .filter(Watchlist.user_id == current_user.id) \
    .options(joinedload(Watchlist.stocks)).all()
    if watchlists is None:
        return {
            'msg': 'no watchlists found',
            'status_code': 404
        }, 404
    return {wl.id: wl.to_dict() for wl in watchlists}


@watchlist_routes.route('', methods=['POST'])
@login_required
def create_watchlist():
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form_data = form.data
        new_wl = Watchlist(
                            user_id=current_user.id,
                            name=form_data['name']
                          )
        db.session.add(new_wl)
        db.session.commit()
        return new_wl.to_dict()
    return {'msg': 'bad'}, 400

@watchlist_routes.route('<int:wl_id>', methods=['PUT'])
@login_required
def update_watchlist(wl_id):

    wl = Watchlist.query.get(wl_id)

    if wl is None:
        return {
            "message": "Watchlist not found",
            "statusCode": 404
        }, 404

    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form_data = form.data

        wl.name = form_data['name']
        db.session.commit()
        return wl.to_dict()
    return {'msg': 'bad'}, 400

@watchlist_routes.route('<int:wl_id>', methods=['DELETE'])
@login_required
def delete_watchlist(wl_id):

    wl = Watchlist.query.get(wl_id)

    if wl is None:
        return {
            "message": "Watchlist not found",
            "statusCode": 404
        }, 404

    db.session.delete(wl)
    db.session.commit()

    return {'msg': 'watchlist deleted'}


@watchlist_routes.route('/<int:wl_id>/<string:sym>', methods=['POST','DELETE'])
@login_required
def add_stock(wl_id, sym):
    """
    adds a stock to a watchlist
    """

    wl = Watchlist.query.get(wl_id)
    stock = Stock.query.filter_by(symbol=sym.upper()).first()

    if wl is None:
        return {
            "message": "Watchlist not found",
            "statusCode": 404}, 404


    if stock is None:
        return {
            "message": "Stock not found",
            "statusCode": 404}, 404

    if wl.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    if request.method == 'POST':
        wl.stocks.append(stock)
    elif request.method == 'DELETE':
        wl.stocks.remove(stock)

    db.session.commit()

    return wl.to_dict()


























# @task_routes.route('/<int:id>')
# @login_required
# def get_task_by_id(id):
#     """
#     returns a single task's details as a dict
#     """

#     task = Task.query.get(id)

#     # task does not exist
#     if task is None:
#         return {
#             "message": "Task couldn't be found",
#             "statusCode": 404}, 404

#     # user does not own the task
#     if task.user_id != current_user.id:
#         return {
#             "message": "Forbidden",
#             "statusCode": 403}, 403

#     return task.to_dict()


# user_tasks = Task.query.filter_by(user_id=current_user.id)

# return {task.id: task.to_dict() for task in user_tasks}
