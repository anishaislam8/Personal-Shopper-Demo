import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./option.css"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
// import * as L from "leaflet";
// import { MapContainer } from 'react-leaflet';

const RoutingOption = () => {
    const route1 = useLocation().state.route1
    const route2 = useLocation().state.route2
    const route1TotalCost = useLocation().state.route1TotalCost
    const route2TotalCost = useLocation().state.route2TotalCost
    const route1Costs = useLocation().state.route1Costs
    const route2Costs = useLocation().state.route2Costs
    

    // const setWaypoints = (route) => {
    //     const waypoints = []
    //     for (let i = 0; i < route.length; i++) {
    //         waypoints.push(L.latLng(route1[i][0], route1[i][1]))
    //     }
    //     return waypoints
    // }

    // const getTimeAndDistance = (waypoints) => {
    //     var map = L.map('map');
    //     var routeControl = L.Routing.control({
    //         waypoints: waypoints
    //     }).addTo(map);

    //     let distance = routeControl.getPlan().getTotalDistance();
    //     let time= routeControl.getPlan().getTotalTime();

    //    // get the distance and time from the routeControl
    //     return [distance, time]
        
    // }


    // const waypoints1 = setWaypoints(route1)
    // const waypoints2 = setWaypoints(route2)
    // const [distance1, time1] = getTimeAndDistance(waypoints1)
    // const [distance2, time2] = getTimeAndDistance(waypoints2)





    const navigate = useNavigate();

    const chooseFirstOption = () => {
        navigate('/option', {
            state: {
                route: route1,
                route1TotalCost: route1TotalCost,
                route1Costs: route1Costs
            }
        })
    }

    const chooseSecondOption = () => {
        navigate('/option', {
            state: {
                route: route2,
                route2TotalCost: route2TotalCost,
                route2Costs: route2Costs
            }
        })
    }
    return (
        <div>
            <p></p>
            <p></p>
            <center>
                <h1>Routing Options</h1>
                <p></p>
                <p></p>
                <table>
                    <tbody>
                        <tr>
                            <th>Options</th>
                            <th>Total Cost</th>
                            <th>Costs of each product</th>
                            {/* <th>Time</th>
                            <th>Distance</th> */}
                        </tr>
                        <tr>
                            <td><Button variant="success" onClick={chooseFirstOption}>First Option</Button></td>
                            <td><h4>{route1TotalCost.toFixed(2)}</h4></td>
                            <td>{route1Costs.map(cost => <b>{cost.toFixed(2)} </b>)}</td>
                            {/* <td>{time1}</td>
                            <td>{distance1}</td> */}
                        </tr>
                        <tr>
                            <td><Button variant="success" onClick={chooseSecondOption}>Second Option</Button></td>
                            <td><h4>{route2TotalCost.toFixed(2)}</h4></td>
                            <td>{route2Costs.map(cost => <b>{cost.toFixed(2)} </b>)}</td>
                            {/* <td>{time2}</td>
                            <td>{distance2}</td> */}
                        </tr>
                    </tbody>
                </table>

            </center>

        </div>
    )
}

export default RoutingOption