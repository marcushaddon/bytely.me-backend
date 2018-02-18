import json
import time
from flask import Flask, request, redirect, jsonify, abort
from db import db


from create_link import create_link
from get_redirect import get_redirect
from get_clicks import get_clicks



app = Flask(__name__)

# =================================
# ROOT
# =================================
@app.route("/")
def hello():
    # TODO: Return UI
    return "Hello World!"

app.register_blueprint(create_link)
app.register_blueprint(get_redirect)
app.register_blueprint(get_clicks)