import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // promeni ako tvoj backend radi na drugom portu
  withCredentials: true // bitno zbog sesija
});

export default api;
