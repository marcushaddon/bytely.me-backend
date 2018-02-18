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
        username_or_email = body['username_or_email']
        password = body['password']
    except:
        abort(403)

    pwhash = hashlib.sha512(password + PASSWORD_SALT).hexdigest()
    
    query = {
        "pwhash": pwhash, 
        "$or": [
            { "username": username_or_email }, 
            { "email": username_or_email }
            ]}
    user = db.users.find_one(query)

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