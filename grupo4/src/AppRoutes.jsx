import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import Products from "./pages/Products/Products";
import ProductView from "./pages/ProductView/ProductView";
import Cart from "./pages/Cart/Cart";
import Signup from "./pages/Signup/Signup";

export default function AppRoutes() {
  return (
    <Routers>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/*Vinicius*/}
        <Route exact path="/login" element={<Login />} />
        {/*Éber*/}
        <Route exact path="signup" elemente={<Signup />} />
        {/*Geovane*/}
        <Route exact path="/user/:id" element={<User />} />
        {/*Toledo*/}
        <Route exact path="/products" element={<Products />} />
        {/*Moreira*/}
        <Route exact path="/products/:id" element={<ProductView />} />
        {/*Weliton -> VER CORES E DESIGN*/}
        <Route exact path="/cart?:customerId" element={<Cart />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </Routers>
  );
}
