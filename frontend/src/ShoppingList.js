import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate} from 'react-router-dom';
import "./shoppingList.css"

function ShoppingList() {

  const [inputArr, setInputArr] = useState([])
  const [inputData, setInputData] = useState({
    name: "",
    quantity: ""
  })
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState('default');

  useEffect(() => {
    fetch('/products').then(response =>
      response.json().then(data => {
        setProducts(data);
      }))
  }, []);

  function changeHandle(e) {
    if(e.target.name === "name"){
      setSelected(e.target.value)
    }
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  let { name, quantity } = inputData;

  function addToList() {
    setInputArr([...inputArr, { name, quantity }])
    console.log("What we entered: ", inputData)
    setInputData({ name: "", quantity: "" })
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
      <input type="text" name="quantity" autoComplete='off' value={inputData.quantity} onChange={changeHandle} placeholder="Enter the quantity" />
      <button onClick={addToList}>Add Item</button><br /><br />

      <table border={1} width="30%" cellPadding={10}>
        <tbody>
          <tr>
            <td>Item</td>
            <td>Quantity</td>
          </tr>
          {
            inputArr.map(
              (info, ind) => {
                return (
                  <tr key={ind}>
                    <td>{info.name}</td>
                    <td>{info.quantity}</td>
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