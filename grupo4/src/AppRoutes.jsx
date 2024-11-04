import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import Products from "./pages/Products/Products";
import ProductView from "./pages/ProductView/ProductView";
import Cart from "./pages/Cart/Cart";
import Signup from "./pages/Signup/Signup";
import { AuthProvider } from "./context/AuthContext";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          {/*Vinicius*/}
          <Route exact path="/login" component={Login} />
          {/*Éber*/}
          <Route exact path="/signup" componente={Signup} />
          {/*Geovane*/}
          <Route exact path="/user/:id" component={User} />
          {/*Toledo*/}
          <Route exact path="/products" component={Products} />
          {/*Moreira*/}
          <Route exact path="/products/:id" component={ProductView} />
          {/*Weliton -> VER CORES E DESIGN*/}
          <Route exact path="/cart/:customerId" component={Cart} />
          <Route path="*" component={<h1>404: Not Found</h1>} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}
