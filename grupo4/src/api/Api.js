import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API,
});

export const getAllProducts = async () => {
  const response = await api.get("/produtos");
  return response.data;
};
