import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { createSession, register } from "../api/Api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const handleState = (response) => {
    const { login, id } = response.data;

    localStorage.setItem("user", JSON.stringify(id));

    setUser(login);

    setAuthenticated(true);

    history.push("/account");
  };

  const login = async (form) => {
    const response = await createSession(form);
    console.log(response);

    handleState(response);
  };

  const createUser = async (form) => {
    const response = await register(form);
    if (response) {
      const loginUser = { login: form.login, password: form.password };
      login(loginUser);
    }
  };

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
