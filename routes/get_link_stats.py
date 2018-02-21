from flask import Blueprint, request, abort, jsonify
from bson import ObjectId
from db import db
from helpers.authentication import get_user_id
from helpers.bsonparsing import BSONEncoder

get_link_stats = Blueprint('get_link_stats', __name__)

@get_link_stats.route('/links/<link_id>/stats')
def user_stats(link_id):
    user_id = get_user_id(request)
    print link_id
    link = db.shortened_urls.find_one({ "_id": ObjectId(link_id) })

    if link is None:
        abort(404)
    
    if link["user_id"] != user_id:
        abort(403)
    
    stats = db.linkstats.find_one({ "link_id": link_id })

    return BSONEncoder().encode(stats)