import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUserById } from "../../api/Api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./User.css";

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
      <Header />
      <div className="profile">
        <div className="avatar">
          <img src={user.foto}></img>
          <h1>{user.nome}</h1>
        </div>
        <div className="profile-info">
          <h3>{user.email}</h3>
          <h3>{user.endereco}</h3>
          <h3>{user.telefone}</h3>
        </div>
      </div>
      <Footer />
    </>
  );
}
