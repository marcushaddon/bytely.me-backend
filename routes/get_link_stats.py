from flask import Blueprint, request, abort, jsonify
from bson import ObjectId
from db import db
from helpers.authentication import get_user_id
from helpers.bsonparsing import BSONEncoder

get_link_stats = Blueprint('get_link_stats', __name__)

@get_link_stats.route('/api/links/<link_id>/stats')
def link_stats(link_id):
    user_id = get_user_id(request)
    link = db.shortened_urls.find_one({ "_id": ObjectId(link_id) })

    if link is None:
        abort(404)
    
    if link["user_id"] != user_id:
        abort(403)
    
    results = {}
    
    statsquery = db.linkstats.find({ "link_id": link_id })
    stats = [stat for stat in statsquery]

    for stat in stats:
        results[stat['type']] = stat

    return BSONEncoder().encode(results)