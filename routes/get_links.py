from flask import Blueprint, request, abort, jsonify
from db import db
from helpers.authentication import authenticate, get_user_id
from helpers.bsonparsing import BSONEncoder

get_links = Blueprint('get_links', __name__)

@get_links.route('/api/users/<user_id>/links')
def getlinks(user_id):
    if get_user_id(request) != user_id:
        abort(403)
    
    # TODO: 
    try:
        query = db.shortened_urls.find({"user_id": user_id})
        clicks = [click for click in query]
    except Exception, e:
        print e.message
        abort(500)

    
    return BSONEncoder().encode(clicks)