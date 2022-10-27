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

    watchlists = Watchlist.query.filter_by(user_id=current_user.id)
    if watchlists is None:
        return {
            'msg': 'no watchlists found',
            'status_code': 404
        }, 404
    return {wl.id: wl.to_dict() for wl in watchlists}


@watchlist_routes.route('', methods=['POST'])
@login_required
def create_watchlist():
    print('what the actual fuck')
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
        print(f' what the fuck: { new_wl.to_dict()}')
        return new_wl.to_dict()
    return {'msg': 'bad'}
























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
