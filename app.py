import json
import time
from flask import Flask, request, redirect, jsonify, abort
from db import db
from codegen import next_code
from clean_url import clean_url

BASE_URL = "http://127.0.0.1:5000/"

app = Flask(__name__)

# =================================
# ROOT
# =================================
@app.route("/")
def hello():
    # TODO: Return UI
    return "Hello World!"

# =================================
# GET REDIRECT
# =================================
@app.route("/<short_code>")
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

# =================================
# CREATE LINK
# =================================
@app.route('/short_url', methods=['POST'])
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
            abort(409)

    try:
        cleaned_url = clean_url(long_url)
    except ValueError, e:
        abort(400)
    except Exception, e:
        abort(500)
    
    latest_short_code = None
    try:
        with open('latestshortcode.txt', 'rb') as infile:
            latest_short_code = infile.readline()
    except:
        pass
    
    next_short_code = next_code(latest_short_code)

    # Make sure we havent generated a short code that
    # someone has already used as a custom brand
    while db.shortened_urls.find_one({"short_code": next_short_code}) is not None:
        next_short_code = next_code(next_short_code)

    new_shorted_url = {
        "long_url": cleaned_url,
        "short_code": brand if brand is not None else next_short_code
    }

    try:
        db.shortened_urls.insert_one(new_shorted_url)
    except:
        abort(500)

    # Only update latest shortcode if we used a generated shortcode
    if brand is None:
        with open('latestshortcode.txt', 'wb') as outfile:
            outfile.write(next_short_code)
    
    return jsonify(BASE_URL + new_shorted_url['short_code'])