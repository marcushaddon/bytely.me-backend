from collections import defaultdict as dd

def _toten(num):
    if num < 0:
        neg = True
    else:
        neg = False
    absval = abs(num) - (abs(num) % 10)
    return -absval if neg else absval


def default_stats_obj(obj):
    return dd(lambda: dd(int), obj)

def unfreeze_stats_obj(stats_obj):
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
                val = _toten(geo_data[key])
            else:
                val = geo_data[key]
            stats_obj[key][val] += 1
    
    # Record time of day
    hour = str(click['time'].hour)
    print type(stats_obj['hour_utc'])
    stats_obj['hour_utc'][hour] += 1

    return stats_obj

def freeze_stats_obj(stats_obj):
    return dict(stats_obj)