<template>
  <div id="app">
    <AdminLayout v-if="isAuthenticated" />
    <router-view v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AdminLayout from './layouts/AdminLayout.vue';

export default {
  name: 'App',
  components: {
    AdminLayout,
  },
  computed: {
    // Mapeia o getter `isAuthenticated` do módulo Vuex 'auth'
    ...mapGetters('auth', ['isAuthenticated']),
  },
  created() {
    // Opcional: Tentar buscar dados do usuário ao carregar a aplicação, se houver um token
    // if (this.isAuthenticated) {
    //   this.$store.dispatch('auth/fetchUser');
    // }
  }
};
</script>

<style>
/* Estilos globais para a aplicação podem ser adicionados aqui */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh; /* Garante que o app ocupe a altura total da viewport */
}
</style>