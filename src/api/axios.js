import axios from 'axios';

const api = axios.create({
  baseURL: 'https://job-backend-2-pgh7.onrender.com/', // Your json-server URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;