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
        geo_data = gi.record_by_addr(request.remote_addr)

        click = {
            "url_id": str(linkid),
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

        # Update the user's overall stats
        userstats = db.userstats.find_one({ "user_id": shorturl["user_id"] })
        if userstats is None:
            userstatsexisted = False
            userstats = stats.default_stats_obj({"user_id": shorturl["user_id"] })
        else:
            userstatsexisted = True
            userstats = stats.unfreeze_stats_obj(userstats)

        userstats = stats.update_stats_obj(userstats, click)
        
        userstats = stats.freeze_stats_obj(userstats)
        
        try:
            if userstatsexisted:
                db.userstats.update({ "user_id": userstats["user_id"] }, { "$set": userstats }, check_keys=False)
            else:
                db.userstats.insert(userstats, check_keys=False)
        except Exception, e:
            print e.message
            pass
        
        # TODO: Update stats object for click record
        linkstats = db.clickstats.find_one({ "link_id": str(click["url_id"]) })
        if linkstats is None:
            linkstatsexisted = False
            linkstats = stats.default_stats_obj({"link_id": str(click["url_id"]) })
        else:
            linkstatsexisted = True
            linkstats = stats.unfreeze_stats_obj(linkstats)

        linkstats = stats.update_stats_obj(linkstats, click)
        
        linkstats = stats.freeze_stats_obj(linkstats)
        
        try:
            if linkstatsexisted:
                db.linkstats.update({ "link_id": linkstats["link_id"] }, { "$set": linkstats }, check_keys=False)
            else:
                db.linkstats.insert(linkstats, check_keys=False)
        except Exception, e:
            print e.message
            pass

    return redirect(shorturl["long_url"])