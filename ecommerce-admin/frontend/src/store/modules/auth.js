import api from '@/plugins/axios';
import router from '@/router';

const state = {
  token: localStorage.getItem('token') || null, // Carrega o token se existir
  user: null, // Informações do usuário logado
  isAuthenticated: !!localStorage.getItem('token'), // Verifica se o token existe para determinar a autenticação
};

const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  token: (state) => state.token,
  user: (state) => state.user,
};

const actions = {
  async register({ commit, dispatch }, userData) {
    try {
      const response = await api.post('/auth/register', userData);
      commit('setToken', response.data.token);
      dispatch('showSnackbar', { message: 'Registro realizado com sucesso!', color: 'success' }, { root: true });
      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Erro ao registrar.';
      console.error('Erro no registro:', errorMessage);
      dispatch('showSnackbar', { message: errorMessage, color: 'error' }, { root: true });
      return { success: false, message: errorMessage };
    }
  },
  async login({ commit, dispatch }, userData) {
    try {
      const response = await api.post('/auth/login', userData);
      commit('setToken', response.data.token);
      dispatch('showSnackbar', { message: 'Login realizado com sucesso!', color: 'success' }, { root: true });
      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Credenciais inválidas.';
      console.error('Erro no login:', errorMessage);
      dispatch('showSnackbar', { message: errorMessage, color: 'error' }, { root: true });
      return { success: false, message: errorMessage };
    }
  },
  logout({ commit, dispatch }) {
    commit('clearAuth');
    dispatch('showSnackbar', { message: 'Você foi desconectado.', color: 'info' }, { root: true });
    router.push('/login');
  },
  // Opcional: Ação para buscar os dados do usuário a partir do token (se necessário)
  // async fetchUser({ commit }) {
  //   try {
  //     const response = await api.get('/auth/me'); // Exemplo de rota no backend para obter dados do usuário logado
  //     commit('setUser', response.data);
  //   } catch (error) {
  //     console.error('Erro ao buscar usuário logado:', error);
  //     commit('clearAuth'); // Deslogar se houver erro ao buscar os dados do usuário
  //   }
  // }
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    state.isAuthenticated = true;
    localStorage.setItem('token', token);
  },
  setUser(state, user) {
    state.user = user;
  },
  clearAuth(state) {
    state.token = null;
    state.user = null;
    state.isAuthenticated = false;
    localStorage.removeItem('token');
  },
};

export default {
  namespaced: true, // Garante que este módulo tenha seu próprio namespace
  state,
  getters,
  actions,
  mutations,
};