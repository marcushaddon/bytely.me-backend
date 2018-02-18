from flask import Blueprint, request
from authentication import authenticate

get_clicks = Blueprint('get_clicks', __name__)

@get_clicks.route('/<user_id>/clicks')
def getclicks(user_id):
    authenticate(request, user_id)
    return "here are your clicks"