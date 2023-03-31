from flask import Flask, Response, request
import pymongo
import json
from Main import *
import numpy as np

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


@app.route("/locations", methods=["GET"])
def get_locations():
    try:
        # data = list(db.shops.find())
        # for shop in data:
        #     shop["_id"] = str(shop["_id"])
        # read the data from the ./datasets/Amsterdam/poi/originals/PoiAMS50.txt and convert it to json
        data = []
        with open('./datasets/Amsterdam/roadnetwork/RoadVerticesAMS.txt', 'r') as f:
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
                {"message": "cannot find road vertices"}
            ),
            status=500,
            mimetype="application/json"
        )


@app.route("/productList", methods=["POST"])
def receive_product_list():
    try:
        shopping_list = request.get_json()

        startingLat = float(shopping_list[0]["name"])
        startingLong = float(shopping_list[1]["name"])
        endingLat = float(shopping_list[2]["name"])
        endingLong = float(shopping_list[3]["name"])
        itemsToBuy = []
        for item in shopping_list[4:]:
            itemsToBuy.append(int(item["name"]))

        route1, route2, startNode, endNode = routing_algo(
            itemsToBuy, startingLat, startingLong, endingLat, endingLong)

        shoppersPosition = []
        customersPosition = []
        startNodeArr = []
        endNodeArr = []

        startNodeArr.append(startNode["lat"])
        startNodeArr.append(startNode["long"])
        endNodeArr.append(endNode["lat"])
        endNodeArr.append(endNode["long"])
        shoppersPosition.append(startingLat)
        shoppersPosition.append(startingLong)
        customersPosition.append(endingLat)
        customersPosition.append(endingLong)

        route1POILatLong = []
        route1POILatLong.append(shoppersPosition)
        route1POILatLong.append(startNodeArr)
        route2POILatLong = []
        route2POILatLong.append(shoppersPosition)
        route2POILatLong.append(startNodeArr)
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
        route1_pois = np.unique(route1.getPOIs())
        route2_pois = np.unique(route2.getPOIs())
        for item in route1_pois:
            lat_long = []
            lat_long.append(float(data[item]["latitude"]))
            lat_long.append(float(data[item]["longitude"]))
            route1POILatLong.append(lat_long)
        for item in route2_pois:
            lat_long = []
            lat_long.append(float(data[item]["latitude"]))
            lat_long.append(float(data[item]["longitude"]))
            route2POILatLong.append(lat_long)
        route1POILatLong.append(endNodeArr)
        route1POILatLong.append(customersPosition)
        route2POILatLong.append(endNodeArr)
        route2POILatLong.append(customersPosition)
        return Response(
            response=json.dumps(
                {"route1": route1POILatLong, "route2": route2POILatLong, "route1TotalCost": route1.getTotalCost(
                ), "route2TotalCost": route2.getTotalCost(), "route1Costs": route1.getCosts(), "route2Costs": route2.getCosts()}
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
