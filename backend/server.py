from flask import Flask, Response, request
import pymongo
import json
from Main import *

try:
    mongo = pymongo.MongoClient(
        host="localhost", port=27017, serverSelectionTimeoutMS=1000)
    db = mongo.PersonalShopper
    mongo.server_info()  # trigger exception if not connected to the db
except:
    print("Error! cannot connect to db")

app = Flask(__name__)


@app.route("/shops", methods=["GET"])
def get_shop():
    try:
        # data = list(db.shops.find())
        # for shop in data:
        #     shop["_id"] = str(shop["_id"])
        # read the data from the ./datasets/Amsterdam/poi/originals/PoiAMS50.txt and convert it to json
        data = []
        with open('./datasets/Amsterdam/poi/originals/PoiAMS50.txt', 'r') as f:
            lines = f.readlines()
            for line in lines:
                line = line.split(' ')
                data.append({
                    "_id": line[0],
                    "longitude": line[1],
                    "latitude": line[2]
                })
        return Response(
            response=json.dumps(
                data
            ),
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps(
                {"message": "cannot find shops"}
            ),
            status=500,
            mimetype="application/json"
        )


@app.route("/shops", methods=["POST"])
def create_shop():
    try:
        shop = {"name": request.form["name"], "latitute": request.form["latitude"],
                "longitude": request.form["longitude"]}
        dbResponse = db.shops.insert_one(shop)
        return Response(
            response=json.dumps(
                {"message": "shop created", "id": f"{dbResponse.inserted_id}"}
            ),
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print(ex)


@app.route("/productList", methods=["POST"])
def receive_product_list():
    try:
        shopping_list = request.get_json()
        itemsToBuy = []
        for item in shopping_list:
            itemsToBuy.append(int(item["name"]))
        routing_algo(itemsToBuy)
        return Response(
            response=json.dumps(
                {"message": "product list received"}
            ),
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print(ex)


@app.route("/products", methods=["GET"])
def get_products():
    try:
        data = list(db.items_per_store.find())
        for item in data:
            item["_id"] = str(item["_id"])
        return Response(
            response=json.dumps(
                data
            ),
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps(
                {"message": "cannot find items"}
            ),
            status=500,
            mimetype="application/json"
        )



if __name__ == "__main__":
    app.run(debug=True)  # development mode

    
