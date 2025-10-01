
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3005/api',
  withCredentials: true,
});

export default API;
