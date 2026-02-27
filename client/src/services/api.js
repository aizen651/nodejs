import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getProducts = () => API.get('/products');
export const createProduct = (data) => 
  API.post('/products', data, { headers: {'Content-Type': 'multipart/form-data'}
  });
export const updateProduct = (id, data) => API.put(`/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteProduct = (id) => 
  API.delete(`/products/${id}`);
