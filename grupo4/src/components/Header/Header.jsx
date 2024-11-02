import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>Header</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
