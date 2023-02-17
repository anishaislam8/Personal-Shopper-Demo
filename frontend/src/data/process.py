import json
f = open("stores.txt", "r")
lines = f.readlines()
json_objects = []

for line in lines:
    arr = line.split(" ")
    json_obj = {}
    json_obj["name"] = arr[3]
    json_obj["latitude"] = float(arr[1])
    json_obj["longitude"] = float(arr[2])
    json_objects.append(json_obj)


with open("stores.json", "a") as outfile:
    for json_object in json_objects:
        json_data = json.dumps(json_object, indent=2)
        outfile.write(json_data)
        outfile.write("\n")

    