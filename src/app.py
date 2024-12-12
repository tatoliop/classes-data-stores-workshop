import json
import os

from flask import Flask, jsonify, request, Response
from flask_pymongo import MongoClient
from flask_swagger_ui import get_swaggerui_blueprint
from neo4j import GraphDatabase

# Init flask app
app = Flask(__name__)
# Init swagger
SWAGGER_URL = "/swagger"
API_URL = "/static/swagger.json"
swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'SQLite API'
    }
)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)
MONGODB_HOST = os.getenv("MONGODB_HOST", 'localhost')
MONGODB_PORT = os.getenv("MONGODB_PORT", 27017)
MONGODB_USER = os.getenv("MONGODB_USER", 'root')
MONGODB_PASS = os.getenv("MONGODB_PASS", 'example')
client = MongoClient(MONGODB_HOST, MONGODB_PORT, username=MONGODB_USER, password=MONGODB_PASS)
db = client.movies_db
movies = db.movies

# Read data
@app.route("/movie/get/", methods=["GET"])
def movie_get():
    results = {}
    res = movies.find()
    counter = 0
    for x in res:
        x.pop("_id")
        json_data = json.dumps(x)
        results[counter] = json_data
        counter += 1
    return results

# Write data
@app.route("/movie/put/", methods=["POST"])
def movie_put():
    in_data = request.get_json()
    if "title" not in in_data or "year" not in in_data or "score" not in in_data:
        return Response(json.dumps({"error": "Missing 1 or more keys 'year', 'year', 'score'"}), 500)
    movies.insert_one(in_data)
    return jsonify({"Message": "OK"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
