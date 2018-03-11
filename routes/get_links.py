from flask import Blueprint, request, abort, jsonify
from db import db
from helpers.authentication import authenticate, get_user_id
from helpers.bsonparsing import BSONEncoder
from helpers.errors import error_response

get_links = Blueprint('get_links', __name__)

@get_links.route('/api/users/<user_id>/links')
def getlinks(user_id):
    if get_user_id(request) != user_id:
        return error_response(403, "You aren't allowed to access that link!")
    
    # TODO: 
    try:
        query = db.shortened_urls.find({"user_id": user_id})
        clicks = [click for click in query]
    except Exception, e:
        print e.message
        return error_response(500, "We encountered an problem!")

    
    return BSONEncoder().encode(clicks)