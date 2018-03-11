import hashlib
from flask import Blueprint, request, abort, jsonify
from db import db
from config import PASSWORD_SALT, JWT_SECRET
from helpers.errors import error_response

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
        return error_response(400, 'Please fill out all required fields.')
    
    # TODO: Make sure email address is valid
    # Make sure username isnt taken
    try:
        existingusername = db.users.find_one({ 'username': username })
    except Exception, e:
        print e

    if existingusername is not None:
        return error_response(409, 'That username is already taken ;(')
    
    try:
        existingemail = db.users.find_one({ 'email': email })
    except Exception, e:
        print e

    if existingemail is not None:
        return error_response(409, "An account is aleady registered for this email address. Contact the Dev to ask him to reset your password or build a 'Forgot password feature'.")
    
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
        print "there was an error"
        print e
        return error_response(500, 'Uh oh, something went wrong on our end... @_@')
    
    return jsonify({"result": "success"})