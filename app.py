from flask import Flask


from routes import (
    create_link, 
    get_redirect, 
    get_links, 
    login, 
    get_clicks, 
    sign_up
)



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
app.register_blueprint(get_links)
app.register_blueprint(login)
app.register_blueprint(get_clicks)
app.register_blueprint(sign_up)