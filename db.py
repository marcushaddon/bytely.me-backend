import os
from pymongo import MongoClient


try:
    mongo_conn_str = os.environ["MONGODB_URI"]
except KeyError:
    mongo_conn_str = None

print "MONGO URI: " + mongo_conn_str

client = MongoClient(mongo_conn_str) if mongo_conn_str is not None else MongoClient()

db = client.urldb