import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import  Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../../api/Api';  
import "./Login.css"



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = {email, password}
      await createSession(form);
      navigate('/dashboard'); //vai direcionar pra onde?
    } catch (err) {
      setError('Usuário não encontrado. Verifique suas credenciais.');
    }
  };

  return (
    <>
        <Header />
    <div  className="login-form">

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
    </div>
    <Footer/>
    </>

  );
};

export default  Login;
