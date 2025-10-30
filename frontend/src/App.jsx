import Product from './Product'

import './App.css'
import Cart from './Cart'
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";

function App() {


  return (
    <Router>
      <Link to="/">Products</Link>
      <br></br>
      <Link to="/cart">Cart</Link>
      <Routes>
        <Route path="/" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </Router>

      
    
  )
}

export default App
