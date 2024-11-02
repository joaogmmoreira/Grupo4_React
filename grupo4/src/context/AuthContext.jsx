import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { setToken, createSession, register } from "../Services/Api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
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
    const { login, token, id } = response.data;

    localStorage.setItem("user", JSON.stringify(id));
    localStorage.setItem("token", token);

    setToken(token);

    setUser(login);

    setAuthenticated(true);

    navigate("/account");
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
    setToken(null);
    setUser(null);
    setId(null);
    setAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
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
