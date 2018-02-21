from flask import Blueprint, request, abort, jsonify
from db import db
from helpers.authentication import get_user_id
from helpers.bsonparsing import BSONEncoder

get_user_stats = Blueprint('get_user_stats', __name__)

@get_user_stats.route('/users/<user_id>/stats')
def user_stats(user_id):
    actual_user_id = get_user_id(request)
    if actual_user_id != user_id:
        abort(403)
    
    stats = db.userstats.find_one({ "user_id": user_id })

    return BSONEncoder().encode(stats)