from flask import jsonify

def error_response(code, message):
    print "DOING ME"
    response = jsonify({'message': message})
    response.status_code = code
    return response