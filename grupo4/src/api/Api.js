import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API,
});

export const createSession = async (form) => {
  const { email, password } = form;

  const response = await api.get(`/users?email=${email}&senha=${password}`);

  return response;
};

export const register = async (form) => {
  const response = await api.post("/register", form);
  return response;
};

export const getAllProducts = async () => {
  const response = await api.get("/produtos");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

export const putInvoice = async (form) => {
  const response = await api.post("/pedidos", form);
  return response;
};

// export const getProductsByCategory = async (category) => {};
