import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Cambia esto al puerto de tu Backend
});

export default api;