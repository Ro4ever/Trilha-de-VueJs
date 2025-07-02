import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import products from './modules/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Estado para o Snackbar global de feedback
    snackbar: {
      show: false,
      message: '',
      color: '',
    },
  },
  mutations: {
    setSnackbar(state, payload) {
      state.snackbar.show = payload.show;
      state.snackbar.message = payload.message;
      state.snackbar.color = payload.color;
    },
  },
  actions: {
    // Ações para mostrar e esconder o Snackbar
    showSnackbar({ commit }, payload) {
      commit('setSnackbar', { show: true, message: payload.message, color: payload.color || 'success' });
    },
    hideSnackbar({ commit }) {
      commit('setSnackbar', { show: false, message: '', color: '' });
    },
  },
  modules: {
    // Módulos Vuex para Auth e Products
    auth,
    products,
  },
});