from flask import Blueprint, request, abort
from db import db
from bson import ObjectId
from helpers.bsonparsing import BSONEncoder
from helpers.authentication import authenticate, get_user_id
from helpers.errors import error_response

get_clicks = Blueprint('get_clicks', __name__)

@get_clicks.route('/api/links/<link_id>/clicks')
def getclicks(link_id):
    user_id = get_user_id(request)
    
    # Make sure they own this link
    link = db.shortened_urls.find_one({ "_id": ObjectId(link_id) })
    if link is None:
        return error_response(404, "That link could not be found.")
    elif link["user_id"] != user_id:
        return error_response(403, "You are not allowed to access that link.")

    
    # TODO: Make sure they belong to the user making the request!
    try:
        clicksquery = db.clicks.find({ "url_id": link_id })
        clicks = [click for click in clicksquery]
    except Exception, e:
        return error_response(500, "We encountered a problem.")
    
    return BSONEncoder().encode(clicks)