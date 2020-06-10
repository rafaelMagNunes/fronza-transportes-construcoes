import axios from 'axios';

const api = axios.create({
  baseURL: 'http://161.35.118.203:3333',
});

export default api;
