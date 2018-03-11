from flask import Flask, send_from_directory, redirect
from flask_cors import CORS



from routes import (
    create_link, 
    get_redirect, 
    get_links, 
    login, 
    get_clicks, 
    sign_up,
    get_user_stats,
    get_link_stats
)



app = Flask(__name__)
CORS(app)

# =================================
# ROOT
# =================================
@app.route("/")
def hello():
    # TODO: Return UI
    return redirect('http://app.bytely.me')



app.register_blueprint(create_link)
app.register_blueprint(get_redirect)
app.register_blueprint(get_links)
app.register_blueprint(login)
app.register_blueprint(get_clicks)
app.register_blueprint(sign_up)
app.register_blueprint(get_user_stats)
app.register_blueprint(get_link_stats)

