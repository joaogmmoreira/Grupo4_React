import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Carousel from "./Carousel";
import logo from "../../assets/logo.jpeg";
import "./Header.css";

export default function Header() {
  const { authenticated, id } = useContext(AuthContext);
  const endPoint = useLocation().pathname;

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="header-container">
      <header className="header">
        <img className="logo-img" src={logo} alt="Logo" />
        <nav>
          <ul>
            <li>
              <Link to="/" className="button">Home</Link>
            </li>
            <li>
              <Link to="/products" className="button">Produtos</Link>
            </li>
            <li>
              {authenticated ? (
                <Link to={`/user/${id}`}>Conta</Link>
              ) : (
                <Link to="/login" className="button">Login</Link>
              )}
            </li>
            {!authenticated && (
              <li>
                <Link to="/signup">Registrar</Link>
              </li>
            )}
            {endPoint !== "/login" && endPoint !== "/signup" && (
              <li>
                <Link to="/cart" className="button">Carrinho</Link>
              </li>
            )}
            <li>
              {authenticated && (
                <button to="/home" onClick={() => handleLogout()}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <Carousel />
      <div className="black">
        <span className="blackTexto">🔥BLACK NOVEMBER 11.11🔥</span>
      </div>
    </div>
  );
}
