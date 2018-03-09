import hashlib
from flask import Blueprint, request, abort, jsonify
from db import db
from config import PASSWORD_SALT, JWT_SECRET

sign_up = Blueprint('sign_up', __name__)

@sign_up.route('/api/signup', methods=['POST'])
def signup():
    body = request.get_json()
    username = None
    password = None
    email = None

    try:
        username = body['username']
        password = body['password']
        email = body['email']
    except:
        abort(400)
    
    # TODO: Make sure email address is valid
    # Make sure username isnt taken
    existingusername = db.users.find_one({ 'username': username })

    if existingusername is not None:
        abort(409, "That username is already taken.")
    
    existingemail = db.users.find_one({ 'email': email })

    if existingemail is not None:
        abort(409, "An account is aleady registered for this email address.")
    
    # TODO: create user as pending and send confirmation email
    pwhash = hashlib.sha512(password + PASSWORD_SALT).hexdigest()

    user = {
        "username": username,
        "email": email,
        "pwhash": pwhash,
        "status": "active"
    }

    try:
        db.users.insert_one(user)
    except Exception, e:
        print str(e)
        abort(500)
    
    return jsonify({"result": "success"})