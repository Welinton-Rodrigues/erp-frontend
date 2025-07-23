import axios from 'axios';

// Cria uma instância do axios com configurações pré-definidas
const api = axios.create({
    baseURL: 'http://localhost:8080/api' // URL base da nossa API
});

// Isso é um "interceptor". É uma função que será executada ANTES de cada requisição.
api.interceptors.request.use(
    (config) => {
        // Pega o token do localStorage
        const token = localStorage.getItem('authToken');
        
        // Se o token existir, adiciona o cabeçalho de autorização
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config; // Retorna a configuração modificada para o axios continuar a requisição
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;