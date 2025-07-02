import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import api from './plugins/axios'; // Importa a instância do Axios configurada

Vue.config.productionTip = false;

// Torna a instância do Axios globalmente disponível como $api
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');