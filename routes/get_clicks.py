from flask import Blueprint, request, abort
from db import db
from helpers.bsonparsing import BSONEncoder
from helpers.authentication import authenticate, get_user_id

get_clicks = Blueprint('get_clicks', __name__)

@get_clicks.route('/links/<link_id>/clicks')
def getclicks(link_id):
    user_id = get_user_id(request)
    

    # TODO: Make sure they belong to the user making the request!
    try:
        clicksquery = db.clicks.find({ "url_id": link_id })
        clicks = [click for click in clicksquery]
    except Exception, e:
        print e.message
        abort(500)

    
    return BSONEncoder().encode(clicks)