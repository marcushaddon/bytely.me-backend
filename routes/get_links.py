from flask import Blueprint, request, abort, jsonify
from db import db
from helpers.authentication import authenticate
from helpers.bsonparsing import BSONEncoder

get_links = Blueprint('get_links', __name__)

@get_links.route('/users/<user_id>/links')
def getlinks(user_id):
    authenticate(request, user_id)
    # TODO: Actaully get clicks for this user, implement pagination
    try:
        query = db.shortened_urls.find({"user_id": user_id})
        clicks = [click for click in query]
    except Exception, e:
        print e.message
        abort(500)

    
    return BSONEncoder().encode(clicks)