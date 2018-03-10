from collections import defaultdict as dd
from helpers import toten 
from db import db
from bson import ObjectId

class StatLevel(object):
    USER = "user"
    LINK = "link"



def update_stats(user_id, click, stat_level):
    # Record header stats
    _id = stat_level + '_id'
    print "updating stats for " + stat_level + " with id " + _id
    print str(click)
    collection = stat_level + 'stats'

    if 'headers' in click:
        query = { _id: click[_id], "type": "headers" }
        print "QUERY:"
        print query
        headerstats = db[collection].find_one(query)

        if headerstats is None:
            new = True
            headerstats = dd(lambda: dd(int), query)
        else:
            new = False
            headerstats['devicetype'] = dd(int, headerstats['devicetype'])

        print "headerstats"
        print headerstats
        
        

        if 'User-Agent' in click['headers']:
            ismobile = 'Mobi' in click['headers']['User-Agent']
            if ismobile:
                headerstats['devicetype']['mobile'] += 1
            else:
                headerstats['devicetype']['desktop'] += 1
        
        if new:
            db[collection].insert(headerstats)
        else:
            db[collection].update({
                "_id": headerstats["_id"]
            }, { "$set": headerstats })

    # Record hour_utc
    if 'time' in click:
        query = { _id: click[_id], "type": "hours_utc" }
        hoursstats = db[collection].find_one(query)

        if hoursstats is None:
            new = True
            hoursstats = dd(int, query)
        else:
            new = False
            hoursstats = dd(int, hoursstats)
        
        hoursstats[str(click['time'].hour)] += 1
        
        if new:
            db[collection].insert(hoursstats)
        else:
            db[collection].update({
                "_id": hoursstats["_id"]
            }, { "$set": hoursstats })
    
    # Record geodata
    if click['geo_data'] is not None:
        query = { _id: click[_id], "type": "geo_data" }
        geostats = db[collection].find_one(query)

        if geostats is None:
            new = True
            geostats = dd(lambda: dd(int), query)
        else:
            new = False
            geostats = dd(lambda: dd(int), geostats)
        
        for key, val in click['geo_data'].iteritems():
            if key in ('latitude', 'longitude'):
                cleanval = str(toten(val))
                geostats[key][cleanval] += 1
            else:
                geostats[key][str(val)] += 1
        
        if new:
            db[collection].insert(geostats)
        else:
            db[collection].update({
                "_id": geostats["_id"]
            }, { "$set": geostats })