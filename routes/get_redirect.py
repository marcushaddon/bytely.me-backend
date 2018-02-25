import datetime
from flask import Blueprint, request, redirect, abort
from db import db
import pygeoip
from helpers import stats

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
        now = datetime.datetime.utcnow()

        # Create click record
        headerdict = {}
        for header in request.headers:
            headerdict[header[0]] = header[1]
        
        # TODO: This database throws an exception for IPv6 addrs
        gi = pygeoip.GeoIP('GeoLiteCity.dat', pygeoip.MEMORY_CACHE)
        # geo_data = gi.record_by_addr(request.remote_addr)
        geo_data = gi.record_by_addr("67.198.96.200")


        click = {
            "link_id": str(linkid),
            "user_id": shorturl["user_id"],
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

        
        try:
            # Update the user's overall stats
            stats.update_stats(
                shorturl["user_id"], 
                click, 
                stat_level=stats.StatLevel.USER)

            # Update the link's overall stats
            stats.update_stats(
                str(shorturl["_id"]),
                click,
                stat_level=stats.StatLevel.LINK)

        except Exception, e:
            print type(e)
            print e.message
            pass

    return redirect(shorturl["long_url"])