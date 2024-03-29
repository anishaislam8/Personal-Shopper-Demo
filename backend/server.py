from flask import Flask, Response, request
import json
from Main import *
import numpy as np

app = Flask(__name__)


@app.route("/productList", methods=["POST"])
def receive_product_list():
    try:
        info_from_frontend = request.get_json()

        # get the customer and shopper's location
        startingLat = float(info_from_frontend[0]["name"])
        startingLong = float(info_from_frontend[1]["name"])
        endingLat = float(info_from_frontend[2]["name"])
        endingLong = float(info_from_frontend[3]["name"])

        # get the items to buy
        itemsToBuy = []
        for item in info_from_frontend[4:]:
            itemsToBuy.append(int(item["name"]))

        # get the routes and the start and end nodes for the routes
        route1, route2, startNode, endNode = routing_algo(
            itemsToBuy, startingLat, startingLong, endingLat, endingLong)

        # shoppersPosition contains the lat and long of the shopper, customersPosition contains the lat and long of the customer
        shoppersPosition = []
        customersPosition = []
        shoppersPosition.append(startingLat)
        shoppersPosition.append(startingLong)
        customersPosition.append(endingLat)
        customersPosition.append(endingLong)

        # startNodeArr and endNodeArr contain the lat and long of the start and end nodes
        startNodeArr = []
        endNodeArr = []
        startNodeArr.append(startNode["lat"])
        startNodeArr.append(startNode["long"])
        endNodeArr.append(endNode["lat"])
        endNodeArr.append(endNode["long"])

        # route1POILatLong and route2POILatLong contain the lat and long of the POIs for each route
        # starting from the shopper's location -> start node -> poi -> end node -> customer's location
        # the shopper's location and the start node are added to the array first
        route1POILatLong = []
        route1POILatLong.append(shoppersPosition)
        route1POILatLong.append(startNodeArr)
        route2POILatLong = []
        route2POILatLong.append(shoppersPosition)
        route2POILatLong.append(startNodeArr)

        # get the lat and long of the POIs from the POIAMS50.txt file
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

        # get the POIs generated by the routing algorithm for each route
        route1_pois = np.unique(route1.getPOIs())
        route2_pois = np.unique(route2.getPOIs())

        # append the lat and long of the POIs to the route1POILatLong and route2POILatLong arrays
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

        # append the lat and long of the end node and customer's location to the route1POILatLong and route2POILatLong arrays
        route1POILatLong.append(endNodeArr)
        route1POILatLong.append(customersPosition)
        route2POILatLong.append(endNodeArr)
        route2POILatLong.append(customersPosition)

        # return the routes, the total costs, the costs for each POI, the POIs and the items to buy to the frontend
        return Response(
            response=json.dumps(
                {"route1": route1POILatLong, "route2": route2POILatLong, "route1TotalCost": route1.getTotalCost(
                ), "route2TotalCost": route2.getTotalCost(), "route1Costs": route1.getCosts(),
                    "route2Costs": route2.getCosts(), "route1POIs": route1.getPOIs(), "route2POIs": route2.getPOIs(), "itemsToBuy": itemsToBuy}
            ),
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print(ex)


if __name__ == "__main__":
    app.run(debug=True)  # development mode
