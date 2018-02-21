from flask import request, abort
from bson.objectid import ObjectId
import jwt
from config import JWT_SECRET
from db import db

def authenticate(request, resource_owner_id):
    tokenheader = request.headers.get('Authentication')
    if tokenheader is None:
        abort(403)
    
    token = tokenheader.split(' ')[1]

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithm='HS256')
    except jwt.DecodeError:
        abort(403)
    except:
        abort(500)

    if not payload:
        abort(403)
    
    # TODO: make sure the token isnt expired

    try:
        user_id = payload['user_id']
    except:
        abort(403)
    
    if user_id != resource_owner_id:
        abort(403) 

    return True

def get_user_id(request):
    tokenheader = request.headers.get('Authentication')
    if tokenheader is None:
        return None
    
    token = tokenheader.split(' ')[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithm='HS256')
    except:
        # TODO: Implement custom error class for bad tokens
        raise Exception

    if "user_id" in payload:
        return payload["user_id"]
