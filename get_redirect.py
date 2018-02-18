import time
from flask import Blueprint, request, redirect
from db import db

get_redirect = Blueprint('get_redirect', __name__)

# =================================
# GET REDIRECT
# =================================
@get_redirect.route("/<short_code>")
def shorturls(short_code):
    shorturl = db.shortened_urls.find_one({ "short_code": short_code })
    if shorturl is None:
        abort(404)
    
    # Record data about this click
    linkid = shorturl['_id']
    headers = request.headers
    now = time.time()
    # TODO: Get geolocation!

    headerdict = {}
    for header in request.headers:
        headerdict[header[0]] = header[1]

    click = {
        "url_id": linkid,
        "headers": headerdict,
        "time": now
    }
    
    try:
        db.clicks.insert_one(click)
    except Exception, e:
        # Most important thing is to serve the redirect
        print e.message
        pass
    
    return redirect(shorturl["long_url"])