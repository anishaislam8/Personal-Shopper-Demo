import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate} from 'react-router-dom';
import "./shoppingList.css"

function ShoppingList() {

  const [inputArr, setInputArr] = useState([])
  const [inputData, setInputData] = useState({
    name: ""
  })
  const [selected, setSelected] = useState('default');

  const products = []
  for (let i = 0; i < 1000; i++) {
    products.push({
      _id: i,
      item_name: i
    })
  }

  function changeHandle(e) {
    if(e.target.name === "name"){
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

  function checkArrayInBackendConsole() {
    console.log("Objects stored in array: ", inputArr)
    fetch('/productList', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(inputArr)
     });
  }

  const navigate = useNavigate();
  
  function goBack(){
    navigate(-1);
  }

  //console.log(products[0])

  return (
    <div className='ShoppingList'>
      <h2>Enter Shopping List</h2>
      {/* <input type="text" name="name" autoComplete='off' value={inputData.name} onChange={changeHandle} placeholder="Enter product name" /> */}
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
      {/* <input type="text" name="quantity" autoComplete='off' value={inputData.quantity} onChange={changeHandle} placeholder="Enter the quantity" /> */}
      <button onClick={addToList}>Add Item</button><br /><br />

      <table border={1} width="30%" cellPadding={10}>
        <tbody>
          <tr>
            <td>Item</td>
          </tr>
          {
            inputArr.map(
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
      <br/><br/>
      <button onClick={checkArrayInBackendConsole}>Submit</button>
      <button onClick={goBack}>Back</button>
    </div>
  )
}

export default ShoppingList