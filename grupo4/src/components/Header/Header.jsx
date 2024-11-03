import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Carousel from "./Carousel";
import logo from "../../assets/logo.jpeg";
import "./Header.css";

export default function Header() {
  const { authenticated } = useContext(AuthContext);

  return (
    <div className="header-container">
      <header className="header">
        <img className="logo-img" src={logo} alt="Logo" />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Produtos</Link>
            </li>
            <li>
              {authenticated ? (
                <Link to="/account">Conta</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              <Link to="/cart">Carrinho</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Carousel />
    </div>
  );
}
