import api from '@/plugins/axios';

const state = {
  products: [],
  loading: false, // Indicador de carregamento
  error: null,    // Armazena mensagens de erro
};

const getters = {
  allProducts: (state) => state.products,
  isLoading: (state) => state.loading,
  productError: (state) => state.error,
};

const actions = {
  async fetchProducts({ commit }) {
    commit('setLoading', true);
    commit('setError', null); // Limpa erros anteriores
    try {
      const response = await api.get('/products');
      commit('setProducts', response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Erro ao carregar produtos.';
      console.error('Erro ao buscar produtos:', errorMessage);
      commit('setError', errorMessage);
      this.dispatch('showSnackbar', { message: errorMessage, color: 'error' }, { root: true });
    } finally {
      commit('setLoading', false);
    }
  },

  async addProduct({ commit, dispatch }, productData) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const response = await api.post('/products', productData);
      // Opcional: Adicionar o novo produto à lista existente ou recarregar tudo
      dispatch('fetchProducts'); // Recarrega a lista para garantir que os dados estão atualizados
      this.dispatch('showSnackbar', { message: 'Produto adicionado com sucesso!', color: 'success' }, { root: true });
      return { success: true, product: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Erro ao adicionar produto.';
      console.error('Erro ao adicionar produto:', errorMessage);
      commit('setError', errorMessage);
      this.dispatch('showSnackbar', { message: errorMessage, color: 'error' }, { root: true });
      return { success: false, message: errorMessage };
    } finally {
      commit('setLoading', false);
    }
  },

  async updateProduct({ commit, dispatch }, { id, productData }) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const response = await api.put(`/products/${id}`, productData);
      dispatch('fetchProducts'); // Recarrega a lista
      this.dispatch('showSnackbar', { message: 'Produto atualizado com sucesso!', color: 'success' }, { root: true });
      return { success: true, product: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Erro ao atualizar produto.';
      console.error('Erro ao atualizar produto:', errorMessage);
      commit('setError', errorMessage);
      this.dispatch('showSnackbar', { message: errorMessage, color: 'error' }, { root: true });
      return { success: false, message: errorMessage };
    } finally {
      commit('setLoading', false);
    }
  },

  async deleteProduct({ commit, dispatch }, id) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      await api.delete(`/products/${id}`);
      dispatch('fetchProducts'); // Recarrega a lista
      this.dispatch('showSnackbar', { message: 'Produto excluído com sucesso!', color: 'success' }, { root: true });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Erro ao excluir produto.';
      console.error('Erro ao excluir produto:', errorMessage);
      commit('setError', errorMessage);
      this.dispatch('showSnackbar', { message: errorMessage, color: 'error' }, { root: true });
      return { success: false, message: errorMessage };
    } finally {
      commit('setLoading', false);
    }
  },
};

const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setLoading(state, status) {
    state.loading = status;
  },
  setError(state, error) {
    state.error = error;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};