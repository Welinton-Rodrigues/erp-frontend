import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// --- INTERCEPTOR DE REQUISIÇÃO (O que já tínhamos) ---
// Adiciona o token em todas as chamadas
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// --- NOVO INTERCEPTOR DE RESPOSTA (O "Guarda-Costas") ---
// Verifica as respostas da API
api.interceptors.response.use(
    // Se a resposta for um sucesso (status 2xx), apenas a retorna
    (response) => {
        return response;
    },
    // Se a resposta for um erro...
    (error) => {
        // Verifica se o erro é de "Não Autorizado" (401) ou "Proibido" (403)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            
            console.log("Sessão expirada ou inválida. Limpando token e redirecionando para o login.");

            // Remove o token inválido do armazenamento
            localStorage.removeItem('authToken');
            
            // Redireciona o usuário para a página de login
            // (Isso força um recarregamento completo, limpando qualquer estado antigo)
            window.location.href = '/login';
        }

        // Para qualquer outro erro, apenas o repassa
        return Promise.reject(error);
    }
);

export default api;