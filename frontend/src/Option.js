import React, { useState } from 'react';
import { useLocation} from 'react-router-dom';
import { MapContainer, TileLayer} from 'react-leaflet'
import './App.css';
import RoutingControl from './RoutingControl'


function Option() {
    const route = useLocation().state.route
    const [map, setMap] = useState(null);

    return (
        <MapContainer center={[52.3676, 4.9041]} zoom={13} scrollWheelZoom={true} whenCreated={map => setMap(map)}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {route ? <RoutingControl route={route} color={'#FF0000'} /> : null}
            
        </MapContainer>
    );
}

export default Option