from flask import jsonify

def error_response(code, message):
    response = jsonify({'message': message})
    response.status_code = code
    return response