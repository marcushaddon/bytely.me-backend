from collections import defaultdict as dd
from helpers import toten 
from db import db

def default_stats_obj(obj):
    return dd(lambda: dd(int), obj)

def unfreeze_stats_obj(stats_obj):
    for key in stats_obj:
        stats_obj[key] = dd(int, stats_obj[key])
    return dd(lambda: dd(int), stats_obj)

def update_stats_obj(stats_obj, click):
    headerdict = click['headers']
    geo_data = click['geo_data']

    for header in ['Accept-Language', 'User-Agent']:
            if header in headerdict:
                # To distinguish between what was a period and what
                # was actually and underscore
                val = headerdict[header].replace(".", "__")
                stats_obj[header][val] += 1
        
    # Record geodata
    if geo_data is not None:
        for key in geo_data:
            if key in ('latitude', 'longitude'):
                val = toten(geo_data[key])
            else:
                val = geo_data[key]
            stats_obj[key][val] += 1
    
    # Record time of day
    hour = str(click['time'].hour)
    stats_obj['hour_utc'][hour] += 1

    return stats_obj

def freeze_stats_obj(stats_obj):
    return dict(stats_obj)


def update_user_stats(user_id, click):
    # Record header stats
    if 'headers' in click:
        query = { "user_id": click["user_id"], "type": "headers" }
        userheaderstats = db.userstats.find_one(query)

        if userheaderstats is None:
            new = True
            userheaderstats = dd(lambda: dd(int), query)
        else:
            new = False
            userheaderstats = dd(lambda: dd(int), userheaderstats)
        
        ofinterest = ['Accept-Language', 'User-Agent']
        for header in ofinterest:
            if header not in click['headers']:
                continue
            value = click['headers'][header].replace(".", "__")
            userheaderstats[header][value] += 1
        
        if new:
            db.userstats.insert(userheaderstats)
        else:
            db.userstats.update({
                "_id": userheaderstats["_id"]
            }, { "$set": userheaderstats })

    # Record hour_utc
    if 'time' in click:
        query = { "user_id": click["user_id"], "type": "hours_utc" }
        userhoursstats = db.userstats.find_one(query)

        if userhoursstats is None:
            new = True
            userhoursstats = dd(int, query)
        else:
            new = False
            userhoursstats = dd(int, userhoursstats)
        
        userhoursstats[str(click['time'].hour)] += 1
        
        if new:
            db.userstats.insert(userhoursstats)
        else:
            db.userstats.update({
                "_id": userhoursstats["_id"]
            }, { "$set": userhoursstats })
    
    # Record geodata
    if click['geo_data'] is not None:
        print click['geo_data']
        query = { "user_id": click["user_id"], "type": "geo_data" }
        usergeostats = db.userstats.find_one(query)

        if usergeostats is None:
            new = True
            usergeostats = dd(lambda: dd(int), query)
        else:
            new = False
            usergeostats = dd(lambda: dd(int), usergeostats)
        
        for key, val in click['geo_data'].iteritems():
            
            if key in ('latitude', 'longitude'):
                usergeostats[key][str(toten(val))] += 1
            else:
                usergeostats[key][str(val)] += 1
        
        if new:
            db.userstats.insert(usergeostats)
        else:
            db.userstats.update({
                "_id": usergeostats["_id"]
            }, { "$set": usergeostats })