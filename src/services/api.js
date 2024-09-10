import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL do seu back-end Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
