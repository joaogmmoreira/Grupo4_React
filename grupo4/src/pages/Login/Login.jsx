import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const form = { email, password };
    const response = await login(form);

    console.log(response);

    if (response.status !== 200) {
      return setError("Usuário não encontrado. Verifique suas credenciais.");
    }
    } catch (error) {
      setError("Erro ao  realizar login.");
      console.error(error);
    }

    return;
  };

  return (
    <>
      <Header />
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            aria-label="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            aria-label="Senha"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          <Link to="/signup" className="register">
            Não está cadastrado? Crie sua conta
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Login;
