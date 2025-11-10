import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Components from "./pages/Components";
import Home from "./pages/Home";
import Animation from "./pages/Animation";
import Calculator from "./pages/Calculator";
import ForwardToHome from "./pages/Forwardtohome";
import AppLayout from "./layouts/AppLayout";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import Todo from "./pages/Todo";
import Products from "./pages/Products";
import Carts from "./pages/Carts";
import Login from "./pages/Login";
import { fetchProducts } from "./data/products";

function App() {
const [token , setToken] = useState('')
const [role, setRole] = useState('')

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);

if(token === ''){
  return (<Login setToken={setToken} setRole={setRole}/>)
}else{

  return (
    <div>
      <BrowserRouter basename="/csi205/">
       

        <Routes>
          <Route element={<AppLayout products={products} carts={carts} setToken={setToken}/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/components" element={<Components />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/todo" element={<Todo />} />
            <Route
              path="/products"
              element={
                <Products
                  products={products}
                  carts={carts}
                  setCarts={setCarts}
                />
              }
            />
            <Route
              path="/carts"
              element={<Carts carts={carts} setCarts={setCarts} />}
            />
            <Route path="*" element={<ForwardToHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}
}

export default App;
