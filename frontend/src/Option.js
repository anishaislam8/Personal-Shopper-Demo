import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';
import RoutingControl from './RoutingControl'


function Option() {
    let route = useLocation().state.route
    const shopper_customer_locations = []
    shopper_customer_locations.push(route[0])
    shopper_customer_locations.push(route[route.length - 1])
    const initialRoute = []
    initialRoute.push(route[0])
    initialRoute.push(route[1])
    const endRoute = []
    endRoute.push(route[route.length - 1])
    endRoute.push(route[route.length - 2])
    route = route.slice(1, route.length - 1)


    const [map, setMap] = useState(null);

    return (
        <MapContainer center={[52.3676, 4.9041]} zoom={13} scrollWheelZoom={true} whenCreated={map => setMap(map)}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {shopper_customer_locations.map((location, index) => (
                <Marker position={[location[0], location[1]]}>
                    <Popup position={[location[0], location[1]]}>
                        <div>

                            <h2>{index === 0 ? "Shopper" : "Customer"}</h2>

                        </div>
                    </Popup>
                </Marker>
            ))}
            {initialRoute ? <RoutingControl route={initialRoute} color={'#0000FF'} weight={2} id={0} /> : null}
            {route ? <RoutingControl route={route} color={'#FF0000'} weight = {4} id={1}/> : null}
            {endRoute ? <RoutingControl route={endRoute} color={'#0000FF'} weight = {2} id={2} /> : null}

        </MapContainer>
    );
}

export default Option