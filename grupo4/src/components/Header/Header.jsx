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

  return (
    <div className="header-container">
      <header className="header">
        <img className="logo-img" src={logo} alt="Logo" />
        <nav>
          <ul>
            <li>
              <Link to="/" className="button">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="button">
                Produtos
              </Link>
            </li>
            {authenticated && (
              <li>
                <Link to={`/user/${id}`} className="button">
                  Conta
                </Link>
              </li>
            )}
            {!authenticated &&
              endPoint !== "/login" &&
              endPoint !== "/signup" && (
                <>
                  <li>
                    <Link className="button" to="/signup">
                      Registrar
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="button">
                      Login
                    </Link>
                  </li>
                </>
              )}
            {endPoint !== "/login" && endPoint !== "/signup" && (
              <li>
                <Link to="/cart" className="button">
                  Carrinho
                </Link>
              </li>
            )}
            <li>
              {authenticated && (
                <button className="button" onClick={() => logout()}>
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
