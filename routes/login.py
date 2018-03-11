import hashlib
import time
from flask import Blueprint, request, jsonify, abort
from db import db
from config import PASSWORD_SALT, JWT_SECRET
import jwt
from helpers.errors import error_response

login = Blueprint('login', __name__)

@login.route('/api/login', methods=['POST'])
def get_token():
    body = request.get_json()
    print body
    try:
        username_or_email = body['username_or_email']
        password = body['password']
    except:
        return error_response(400, "Please submit a username/email and password.")

    pwhash = hashlib.sha512(password + PASSWORD_SALT).hexdigest()
    
    query = {
        "pwhash": pwhash, 
        "$or": [
            { "username": username_or_email }, 
            { "email": username_or_email }
            ]}
    user = db.users.find_one(query)

    if user is None:
        return error_response(403, "The password and/or username/email were incorrect.")
    
    payload = {
        "typ": "jwt",
        "alg": "HS256",
        "iat": time.time(),
        "user_id": str(user["_id"])
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    response = {
        "token": token, 
        "user": {
            "username": user["username"],
            "_id": str(user["_id"]),
            "email": user["email"]
        }
        }
    return jsonify(response)