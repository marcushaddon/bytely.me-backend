import time
from flask import Blueprint, request, redirect
from db import db
import pygeoip

get_redirect = Blueprint('get_redirect', __name__)

# =================================
# GET REDIRECT
# =================================
@get_redirect.route("/<short_code>")
def shorturls(short_code):
    shorturl = db.shortened_urls.find_one({ "short_code": short_code })
    if shorturl is None:
        abort(404)
    
    # Don't record info for links created by anons
    if shorturl['user_id'] is not None:
        # Record data about this click
        linkid = shorturl['_id']
        headers = request.headers
        now = time.time()


        headerdict = {}
        for header in request.headers:
            headerdict[header[0]] = header[1]
        
        gi = pygeoip.GeoIP('GeoLiteCity.dat', pygeoip.MEMORY_CACHE)
        geo_data = gi.record_by_addr(request.remote_addr)

        click = {
            "url_id": linkid,
            "headers": headerdict,
            "time": now,
            "geo_data": geo_data
        }
        
        try:
            db.clicks.insert_one(click)
        except Exception, e:
            # Most important thing is to serve the redirect
            print e.message
            pass
    
    return redirect(shorturl["long_url"])