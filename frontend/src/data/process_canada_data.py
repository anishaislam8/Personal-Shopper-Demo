import json

# Opening JSON file
f = open('tesla-sites.json')
dicts = []
  
# returns JSON object as 
# a dictionary
data = json.load(f)
print(data)

# for d in data:
#     if d["address"]["country"] == "Canada":
#         dict = {}
#         dict["name"] = d["name"]
#         dict["latitude"] = d["gps"]["latitude"]
#         dict["longitude"] = d["gps"]["longitude"]
#         dicts.append(dict)


# final = json.dumps(dicts, indent=2)
# print(final)


