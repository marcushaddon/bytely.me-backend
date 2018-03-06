from flask import Blueprint, request, redirect, jsonify, abort
from bson.objectid import ObjectId
from db import db
from helpers.codes import next_code
from helpers.clean_url import clean_url
from helpers.authentication import authenticate, get_user_id

from config import BASE_URL

create_link = Blueprint('create_link', __name__)

# =================================
# CREATE LINK
# =================================
@create_link.route('/api/link', methods=['POST'])
def shortenurl():
    body = request.get_json()
    long_url = None
    brand = None
    cleaned_url = None

    # The URL we want to shorten
    try:
        long_url = body['long_url']
    except KeyError:
        abort(400)
    except:
        abort(500)
    
    # Optional custom branded link
    try:
        brand = body['brand']
    except:
        pass
    
    if brand is not None:
        maybe_existing_url = db.shortened_urls.find_one({ "short_code": brand})
        if maybe_existing_url is not None:
            # TODO: include explaination
            response = jsonify({'message': 'That brand is already taken!'})
            response.status_code = 409
            return response

    try:
        cleaned_url = clean_url(long_url)
    except ValueError, e:
        abort(400)
    except Exception, e:
        abort(500)
    
    latest_code_record = db.latest_short_code.find_one({ 'code': { '$exists': True } } )
    
    
    print latest_code_record
    last_code = latest_code_record["code"] if latest_code_record is not None else None
    next_short_code = next_code(last_code)

    # Make sure we havent generated a short code that
    # someone has already used as a custom brand
    while db.shortened_urls.find_one({"short_code": next_short_code}) is not None:
        next_short_code = next_code(next_short_code)

    try:
        user_id = get_user_id(request)
    except Exception, e:
        print e.message
        abort(403, {'message': 'You arent logged in!'})
    
    new_shorted_url = {
        "long_url": cleaned_url,
        "short_code": brand if brand is not None else next_short_code,
        "user_id": user_id
    }

    try:
        db.shortened_urls.insert_one(new_shorted_url)
    except:
        abort(500)

    # Only update latest shortcode if we used a generated shortcode
    if brand is None:
        if latest_code_record is None:
            print "CREATING"
            db.latest_short_code.insert_one({
                "code": next_short_code
            })
        else:
            print "UPDATING"
            db.latest_short_code.update(
                { "_id": latest_code_record["_id"] },
                { "$set": { "code": next_short_code } } )
    
    return jsonify({"short_url": BASE_URL + new_shorted_url['short_code'] })