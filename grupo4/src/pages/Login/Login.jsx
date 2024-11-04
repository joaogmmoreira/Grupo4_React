import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useHistory } from 'react-router-dom';
import { createSession } from '../../api/Api';
import "./Login.css"
import  { Link } from 'react-router-dom';




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = { email, password }
      await createSession(form);
      history.push('/dashboard');
    } catch (err) {
      setError('Usuário não encontrado. Verifique suas credenciais.');
    }
  };

  return (
    <>
      <Header />
      <div className="login-form">

        <h2>Login</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p><Link to="../User/User.jsx" className="register">Não está cadastrado? Crie sua conta</Link></p> 
      </div>
    
      <Footer />
    </>

  );
};

export default Login;
