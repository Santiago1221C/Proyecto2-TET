import axios from "axios";

const API_BASE_URL = "http://localhost:8081/cart";

export const createCart = (userId: number) => {
  return axios.post(`${API_BASE_URL}/create/${userId}`).then(res => res.data);
};

export const addItemToCart = (userId: number, item: any) => {
  return axios.post(`${API_BASE_URL}/${userId}/add`, item).then(res => res.data);
};

export const getCartByUserId = (userId: number) => {
  return axios.get(`${API_BASE_URL}/${userId}`).then(res => res.data);
};

export const removeItemFromCart = (userId: number, bookId: number) => {
  return axios.delete(`${API_BASE_URL}/${userId}/remove/${bookId}`).then(res => res.data);
};

export const clearCart = (userId: number) => {
  return axios.delete(`${API_BASE_URL}/${userId}`).then(res => res.data);
};

export const deleteCart = (userId: number) => {
  return axios.delete(`${API_BASE_URL}/${userId}/delete`).then(res => res.data);
};