import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
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


  return (
    <>
      {markers.map((marker, index) =>
        <Marker key={(new Date().getTime()).str} position={marker}>
          <Popup position={marker}>
            <div>
              {index === 0 ? <h2>Customer: </h2> : <h2>Shopper</h2>}
              <h2>Latitude: {marker.lat}</h2>
              <h2>Longitude: {marker.lng}</h2>
            </div>
          </Popup>
        </Marker>
      )}
      {/* {markers.length == 2?  <RoutingControl 
          start={[markers[0].lat, markers[0].lng]}
          end={[markers[1].lat, markers[1].lng]} 
          color={'#FF0000'} 
        /> : null } */}
      {markers.length === 2 ? <Navigate to="/createShoppingList" /> : null}


    </>
  )
}

function Map() {
  const [shops, setShops] = useState([]);
  const [map, setMap] = useState(null);
  const { route } = useLocation();
  useEffect(() => {
    fetch('/shops').then(response =>
      response.json().then(data => {
        setShops(data);
      }))
  }, []);


  // const filteredStations = teslaData.filter(tesla => tesla.address.country === "Canada")
  return (
    <MapContainer center={[52.3676, 4.9041]} zoom={13} scrollWheelZoom={true} whenCreated={map => setMap(map)}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {shops.map(shop => (
        <Marker key={(shop._id).str} position={[shop.latitude, shop.longitude]}>
          <Popup position={[shop.latitude, shop.longitude]}>
            <div>
              <h2>{"ID: " + shop._id}</h2>
              {/* <p>{"Status: " + shop.status}</p>
              <p>{"Number of options: " + shop.stallCount}</p> */}
            </div>
          </Popup>
        </Marker>
      ))}
      <AddMarkerToClick />
    </MapContainer>
  );
}

export default Map;
