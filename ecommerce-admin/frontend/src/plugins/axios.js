import axios from 'axios';
import router from '@/router'; // Importe o router para redirecionar em caso de token inválido

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // **IMPORTANTE**: URL do seu backend Node.js
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição: Adiciona o token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta: Trata erros de autenticação (401/403)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Se o token for inválido ou expirado, limpa o token e redireciona para o login
      localStorage.removeItem('token');
      router.push('/login'); // Redireciona via Vue Router
      // Opcional: Mostre uma mensagem de erro global via snackbar Vuex
      // store.dispatch('showSnackbar', { message: 'Sua sessão expirou. Por favor, faça login novamente.', color: 'error' }, { root: true });
    }
    return Promise.reject(error);
  }
);

export default api;