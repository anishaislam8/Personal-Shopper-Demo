import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Map from "./Map"
import ShoppingList from "./ShoppingList"





function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />}></Route>
        <Route path="/createShoppingList" element={<ShoppingList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
