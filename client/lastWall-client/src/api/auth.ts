import axios from 'axios';
axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:8081';

export const getUserData = () => {
  return axios.get(`${API_URL}`);
};

export const registerUser = (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (userData: { email: string; password: string }) => {
  return axios.post(`${API_URL}/login`, userData);
};

export const logoutUser = () => {
  return axios.get(`${API_URL}/logout`);
};
