const fs = require('fs')

let teslaData = require('./tesla-sites.json');

const filteredStations = teslaData.filter(tesla => tesla.address.country === "Canada")


const fields = ["name", "gps"]
// get the keys in the object
var keys = Object.keys(filteredStations[0]);

// loop over all the keys
for(var j = 0; j < filteredStations.length; j++){
    for(var i = 0; i < keys.length; i++){
        // check if it's in the array of fields to keep 
        if (fields.indexOf(keys[i]) < 0)
            // delete the property because it isnt in fields
            delete filteredStations[j][keys[i]];
    }
}
fs.writeFileSync("./canada.json", JSON.stringify(filteredStations, null, 4));

