import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Signup.css";
import { register } from "../../api/Api";

const Signup = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(formData);
      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        history.push("/login");
      }
    } catch (error) {
      console.error("Erro ao cadastrar o usuário:", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Senha"
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Cadastrar
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
