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
  const response = await api.post("/users", form);
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

export const getProductsByCategory = async (category) => {
  const response = await api.get(`/produtos?categoria=${category}`);
  return response.data;
};

export const updateProductQuantityById = async (id, quantidade) => {
  const response = await api.get(`/produtos/${id}`);
  response.data.quantidade -= quantidade;
  await api.put(`/produtos/${id}`, response.data);
};

export const postInvoice = async (form) => {
  const response = await api.post("/pedidos", form);
  return response;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const getInvoiceByUserId = async (id) => {
  // const response = await api.get(`/pedidos?idUser=${id}`);
  const response = await api.get(`/pedidos`, {
    params: {
      idUser: id,
    },
  });
  return response.data.filter((invoice) => invoice.idUser === id);
};

// export const getProductsByCategory = async (category) => {};
