from flask import Blueprint, request, abort
from db import db
from helpers.bsonparsing import BSONEncoder
from helpers.authentication import authenticate

get_clicks = Blueprint('get_clicks', __name__)

@get_clicks.route('/users/<user_id>/clicks')
def getclicks(user_id):
    authenticate(request, user_id)

    # TODO: We will denormalize this later
    try:
        linksquery = db.shortened_urls.find({"user_id": user_id})
        linkids = [link["_id"] for link in linksquery]
    except Exception, e:
        print e.message
        abort(500)
        
    try:
        clicksquery = db.clicks.find({"url_id": { "$in": linkids } })
        clicks = [click for click in clicksquery]
    except Exception, e:
        print e.message
        abort(500)

    
    return BSONEncoder().encode(clicks)