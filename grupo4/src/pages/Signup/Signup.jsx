import { useState } from "react";
// import { register } from "../../api/Api";
import "./Signup.css";

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const registerUser = await register(formData);

  //   if (registerUser.status === 201) {
  //     alert("Cadastro realizado com sucesso!");
  //   } else {
  //     alert("Erro ao cadastrar. Tente novamente.");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/posts",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Usuário cadastrado com sucesso:", data);
  //       alert("Cadastro realizado com sucesso!");
  //     } else {
  //       console.error("Erro ao cadastrar o usuário:", response.statusText);
  //       alert("Erro ao cadastrar. Tente novamente.");
  //     }
  //   } catch (error) {
  //     console.error("Erro na requisição:", error);
  //     alert("Erro ao cadastrar. Tente novamente.");
  //   }
  // };

  return (
    <div className="signup-container">
      <h2>Cadastro de Usuário</h2>
      {/* <form onSubmit={(e) => handleSubmit(e)}> */}
      <form onSubmit={() => {}}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
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
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Signup;
