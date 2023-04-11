// Resources used for writing the Map class: https://react-leaflet.js.org/docs/start-setup/
// Resources used for writing the AddMarkerToClick class: https://www.appsloveworld.com/reactjs/200/438/get-latitude-and-longitude-on-click-on-map  

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function AddMarkerToClick(props) {

  const [markers, setMarkers] = useState([]);

  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng
      if (markers.length < 2) {
        setMarkers([...markers, newMarker]);
      }
      else {
        setMarkers([])
      }
    },
  })


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
      {markers.length === 2 ? props.setEntityFunc("customer") : props.setEntityFunc("")}
      {markers.length === 2 ? props.setShopperLatFunc(markers[0].lat) : null}
      {markers.length === 2 ? props.setShopperLngFunc(markers[0].lng) : null}
      {markers.length === 2 ? props.setCustomerLatFunc(markers[1].lat) : null}
      {markers.length === 2 ? props.setCustomerLngFunc(markers[1].lng) : null}



    </>
  )
}

function Map() {

  const [map, setMap] = useState(null);
  const [entity, setEntity] = useState("");
  const [customerLat, setCustomerLat] = useState(0);
  const [customerLng, setCustomerLng] = useState(0);
  const [shopperLat, setShopperLat] = useState(0);
  const [shopperLng, setShopperLng] = useState(0);

  const navigate = useNavigate();

  const createShoppingList = () => {
    const markers = [
      {
        "lat": shopperLat,
        "lng": shopperLng
      },
      {
        "lat": customerLat,
        "lng": customerLng
      }
    ]
    navigate("/createShoppingList", { state: { markers: markers } })
  }

  return (
    <div className='rowC'>

      <div className='box'>
        <p></p>
        <h3>Select Shopper and Customer locations</h3>
        <Button variant="success" size="lg" disabled={entity === "customer" ? false : true} onClick={createShoppingList}>Create shopping list</Button>
      </div>

      <MapContainer center={[52.3676, 4.9041]} zoom={13} scrollWheelZoom={true} whenCreated={map => setMap(map)}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarkerToClick setEntityFunc={setEntity} setCustomerLatFunc={setCustomerLat} setCustomerLngFunc={setCustomerLng} setShopperLatFunc={setShopperLat} setShopperLngFunc={setShopperLng} />
      </MapContainer>

    </div>

  );
}

export default Map;
