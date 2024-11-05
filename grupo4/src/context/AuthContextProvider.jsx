import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useHistory } from "react-router-dom";
import { createSession } from "../api/Api";
import PropTypes from "prop-types";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const history = useHistory();

  const handleState = (response) => {
    if (response.data.length === 0) {
      return "Usuário não encontrado. Verifique suas credenciais.";
    }

    const { id } = response.data[0];

    localStorage.setItem("user", JSON.stringify(id));

    setId(id);

    setAuthenticated(true);

    history.goBack(-2);
  };

  const login = async (form) => {
    const response = await createSession(form);

    handleState(response);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setId(null);
    setAuthenticated(false);
    history.push("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setId(JSON.parse(storedUser));
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        id,
        authenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
