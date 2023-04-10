import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./shoppingList.css"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShoppingList() {

  const [spinner, setSpinner] = useState(false);    
  const [inputData, setInputData] = useState({
    name: ""
  })
  const [selected, setSelected] = useState('default');
  const markers = useLocation().state.markers
  const startNode = {
    lat: markers[0].lat,
    lng: markers[0].lng
  }
  const endNode = {
    lat: markers[1].lat,
    lng: markers[1].lng
  }
  const [inputArr, setInputArr] = useState([{ name: startNode.lat }, { name: startNode.lng}, { name: endNode.lat }, { name: endNode.lng }])

  const products = []
  for (let i = 0; i < 1000; i++) {
    products.push({
      _id: i,
      item_name: i
    })
  }



  function changeHandle(e) {
    if (e.target.name === "name") {
      setSelected(e.target.value)
    }
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  let { name } = inputData;

  function addToList() {
    setInputArr([...inputArr, { name }])
    console.log("What we entered: ", inputData)
    setInputData({ name: "" })
  }

  const navigate = useNavigate();

  function checkArrayInBackendConsole() {
    console.log("Objects stored in array: ", inputArr)
    
    setSpinner(true);
    fetch('/productList', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputArr)
    })
      .then(response => response.json())
      .then(data => {
        setSpinner(false);
        console.log("Data received from backend: ", data)
        navigate('/chooseRoutingOption', {
          state: {
            route1: data.route1,
            route2: data.route2,
            route1TotalCost: data.route1TotalCost,
            route2TotalCost: data.route2TotalCost,
            route1Costs: data.route1Costs,
            route2Costs: data.route2Costs,
            route1POIs: data.route1POIs,
            route2POIs: data.route2POIs,
            itemsToBuy: data.itemsToBuy
          }
        })

      })
  }

  return (
    <div className='ShoppingList'>
      <p></p><p></p><p></p>
      <h2>Enter Shopping List</h2>
      <p></p><p></p><p></p>
      <form>
        <select name="name" value={selected} onChange={changeHandle}>
          <option value='default' disabled>Select an item</option>
          {products.map((product) => (
            <option value={product.item_name} key={product._id}>
              {product.item_name}
            </option>
          ))}
        </select>
      </form>
      <p></p>
      <p></p>
      <Button variant="success"  onClick={addToList}>Add Item</Button><br /><br />

      <table border={1} width="30%" cellPadding={10}>
        <tbody>
          <tr>
            <td>Item</td>
          </tr>
          {
            inputArr.slice(4,inputArr.length).map(
              (info, ind) => {
                return (
                  <tr key={ind}>
                    <td>{info.name}</td>
                  </tr>
                )
              }
            )
          }
        </tbody>
      </table>
      <br /><br />
      <Button variant="success"  onClick={checkArrayInBackendConsole}>Submit</Button>
      {spinner && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  )
}

export default ShoppingList