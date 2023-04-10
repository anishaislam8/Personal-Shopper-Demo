import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Option from './Option';

const RoutingOption = () => {
    const route1 = useLocation().state.route1
    const route2 = useLocation().state.route2
    const route1TotalCost = useLocation().state.route1TotalCost
    const route2TotalCost = useLocation().state.route2TotalCost
    const route1Costs = useLocation().state.route1Costs
    const route2Costs = useLocation().state.route2Costs
    const route1POIs = useLocation().state.route1POIs
    const route2POIs = useLocation().state.route2POIs
    const itemsToBuy = useLocation().state.itemsToBuy
    const [selectedRoute, setSelectedRoute] = useState('route1');

    return (

        <div className='rowC'>

            <div className='box'>
                <p></p>
                <p></p>
                <h2>Choose route to display</h2>
                <p></p>
                <p></p>
                <Button variant="success" onClick={() => setSelectedRoute('route1')}>First Option</Button>
                <Button variant="success" onClick={() => setSelectedRoute('route2')}>Second Option</Button>
                <p></p>
                <p></p>
                <h4>Currently displaying: <b>{selectedRoute}</b></h4>
                <p></p>
                <p></p>
                {selectedRoute === 'route1' &&
                    <div>
                        <h5><b>Total Cost: </b> {route1TotalCost.toFixed(2)}</h5>
                        <h5><b>Items selected: </b> {itemsToBuy.map((item, index) => ((index ? ', ' : '') + item))}</h5>
                        <h5><b>Item Cost: </b> {route1Costs.map((item, index) => ((index ? ', ' : '') + item.toFixed(4)))}</h5>
                        <h5><b>Shops to visit: </b> {route1POIs.map((item, index) => ((index ? ' -> ' : '') + item))}</h5>
                    </div>
                }

                {selectedRoute === 'route2' &&
                    <div>
                        <h5><b>Total Cost: </b> {route2TotalCost.toFixed(2)}</h5>
                        <h5><b>Items selected: </b> {itemsToBuy.map((item, index) => ((index ? ', ' : '') + item))}</h5>
                        <h5><b>Item Cost: </b>{route2Costs.map((item, index) => ((index ? ', ' : '') + item.toFixed(4)))}</h5>
                        <h5><b>Shops to visit: </b>{route2POIs.map((item, index) => ((index ? ' -> ' : '') + item))}</h5>
                    </div>
                }

            </div>


            <div>
                {selectedRoute === 'route1' && <Option
                    route={route1}
                    route1TotalCost={route1TotalCost}
                    route1Costs={route1Costs}
                />}

                {selectedRoute === 'route2' && <Option
                    route={route2}
                    route1TotalCost={route2TotalCost}
                    route1Costs={route2Costs}
                />}

            </div>
        </div>

    )
}

export default RoutingOption