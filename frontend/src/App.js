import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Map from "./Map"
import ShoppingList from "./ShoppingList"
import RoutingOption from "./RoutingOption"
import Option from "./Option"
import RoutingControl from "./RoutingControl"





function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />}></Route>
        <Route path="/createShoppingList" element={<ShoppingList />}></Route>
        <Route path="/chooseRoutingOption" element={<RoutingOption />}></Route>
        <Route path="/option" element={<Option />}></Route>
        <Route path="/routingControl" element={<RoutingControl />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
