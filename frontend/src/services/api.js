import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const registerUser = (data) => axios.post(`${API_URL}/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/login`, data);
export const getGifts = () => axios.get(`${API_URL}/gifts`);
export const createOrder = (data) => axios.post(`${API_URL}/orders`, data);
export const getUserOrders = (userId) => axios.get(`${API_URL}/orders/${userId}`);
