import os
from pymongo import MongoClient


try:
    mongo_conn_str = os.environ["MONGODB_URI"]
except KeyError:
    mongo_conn_str = None

client = MongoClient(mongo_conn_str) if mongo_conn_str is not None else MongoClient()

db = client.urldb if mongo_conn_str is None else client.heroku_s4vn6w74