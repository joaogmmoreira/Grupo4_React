import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import Products from "./pages/Products/Products";
import ProductView from "./pages/ProductView/ProductView";
import Cart from "./pages/Cart/Cart";
import Signup from "./pages/Signup/Signup";
import { AuthProvider } from "./context/AuthContextProvider";
import { CartProvider } from "./context/CartContext";
import Payment from "./pages/Payment/Payment";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/user/:id" component={User} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:id" component={ProductView} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/payment" component={Payment} />
          </Switch>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

// botão voltar no productview
// avaliação nmo productview
// Pagamento quebra o carrinho
// products bug na categoria
