import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ route, color, weight, id }) => {

  const instance = L.Routing.control({

    waypoints: route,
    fitSelectedRoutes: false,
    collapsible: true,
    lineOptions: {
      styles: [
        {
          color,
          weight
        }
      ]
    },
    createMarker: function (i, wp, nWps) {
    
      if (id === 1) {
        return L.marker(wp.latLng, {
          draggable: false,
          icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/128/727/727606.png',
            iconSize: [35,35],

          })
        });
      } 

    }
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;