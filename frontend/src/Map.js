import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import * as L from 'leaflet';
import './App.css';

function AddMarkerToClick() {

  const [markers, setMarkers] = useState([]);

  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng
      if (markers.length < 2) {
        setMarkers([...markers, newMarker]);
      }
      else {
        //call backend
        setMarkers([])
      }
    },
  })

  const navigate = useNavigate();


  return (
    <>
      {markers.map((marker, index) =>
        <Marker key={(new Date().getTime()).str} position={marker}>
          <Popup position={marker}>
            <div>
              {index === 0 ? <h2>Shopper: </h2> : <h2>Customer</h2>}
              <h2>Latitude: {marker.lat}</h2>
              <h2>Longitude: {marker.lng}</h2>
            </div>
          </Popup>
        </Marker>
      )}

      {markers.length === 2 ? navigate("/createShoppingList", { state: { markers: markers } }) : null}


    </>
  )
}

function Map() {
  // change the names of the variables
  const [locations, setLocations] = useState([]);
  const [map, setMap] = useState(null);
  const { route } = useLocation();
  const [entity, setEntity] = useState("");
  const LeafIcon = L.Icon.extend({
    options: {}
  });


  // const filteredStations = teslaData.filter(tesla => tesla.address.country === "Canada")
  return (
    <MapContainer center={[52.3676, 4.9041]} zoom={13} scrollWheelZoom={true} whenCreated={map => setMap(map)}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <AddMarkerToClick />
    </MapContainer>
  );
}

export default Map;
