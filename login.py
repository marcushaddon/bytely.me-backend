import hashlib
import time
from flask import Blueprint, request, jsonify, abort
from db import db
from config import PASSWORD_SALT, JWT_SECRET
import jwt

login = Blueprint('login', __name__)

@login.route('/login', methods=['POST'])
def get_token():
    body = request.get_json()

    try:
        username = body['username']
        password = body['password']
    except:
        abort(403)

    pwhash = hashlib.sha512(password + PASSWORD_SALT).hexdigest()
    
    user = db.users.find_one({"username": username, "pwhash": pwhash})

    if user is None:
        abort(403)
    
    payload = {
        "typ": "jwt",
        "alg": "HS256",
        "iat": time.time(),
        "user_id": str(user["_id"])
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")

    return jsonify({"token": token})