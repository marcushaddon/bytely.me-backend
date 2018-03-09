from flask import Blueprint, request, abort, jsonify
from db import db
from helpers.authentication import get_user_id
from helpers.bsonparsing import BSONEncoder

get_user_stats = Blueprint('get_user_stats', __name__)

@get_user_stats.route('/api/users/<user_id>/stats')
def user_stats(user_id):
    print "hello"
    actual_user_id = get_user_id(request)
    
    if user_id != actual_user_id:
        abort(403)
    
    results = {}
    
    statsquery = db.userstats.find({ "user_id": actual_user_id })
    stats = [stat for stat in statsquery]

    for stat in stats:
        results[stat['type']] = clean(stat)

    return BSONEncoder().encode(results)



def clean(stat):
    cleaned = {}
    for key in stat:
        if key not in ('_id', 'user_id', 'type'):
            cleaned[key] = stat[key]
    return cleaned