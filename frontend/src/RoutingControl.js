import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ route, color }) => {
  console.log("inside routing control: ")
  console.log(route)
  const instance = L.Routing.control({
    
    waypoints: route,
    lineOptions: {
      styles: [
        {
          color,
          weight: 4
        }
      ]
    }
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;