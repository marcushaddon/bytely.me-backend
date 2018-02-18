from flask import Blueprint, request, abort
from authentication import authenticate

get_clicks = Blueprint('get_clicks', __name__)

@get_clicks.route('/users/<user_id>/clicks')
def getclicks(user_id):
    authenticate(request, user_id)
    # TODO: Actaully get clicks for this user, implement pagination
    return "here are your clicks"