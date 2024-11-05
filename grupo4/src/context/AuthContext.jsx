import { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { createSession, register } from "../api/Api";

export const AuthContext = createContext();

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

    setAuthenticated(true);

    history.push("/account");
  };

  const login = async (form) => {
    const response = await createSession(form);

    handleState(response);

    return response.status;
  };

  const createUser = async (form) => {
    const response = await register(form);
    if (response) {
      const loginUser = { login: form.login, password: form.password };
      login(loginUser);
    }
  };

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    setId(null);
    setAuthenticated(false);
    localStorage.removeItem("user");
    history.push("/");
  };

  const value = {
    authenticated,
    user,
    loading,
    id,
    login,
    createUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
