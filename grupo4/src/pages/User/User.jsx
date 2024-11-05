import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUserById } from "../../api/Api";

export default function User() {
  const { id } = useContext(AuthContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    const handleUser = async () => {
      const response = await getUserById(id);
      setUser(response);
    };
    handleUser();
  }, []);

  return (
    <>
      <h1>Olá, {user.nome}</h1>
      <img src={user.foto}></img>
      <h3>Seu email é: {user.email}</h3>
      <h3>Seu endereço é: {user.endereco}</h3>
      <h3>Seu telefone é: {user.telefone}</h3>
    </>
  );
}
