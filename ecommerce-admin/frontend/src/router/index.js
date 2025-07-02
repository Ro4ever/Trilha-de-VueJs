import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import ProductManagement from '../views/ProductManagement.vue';
import store from '../store'; // Importa o Vuex store para os guards de rota

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }, // Não requer autenticação
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false }, // Não requer autenticação
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Requer autenticação
  },
  {
    path: '/products',
    name: 'ProductManagement',
    component: ProductManagement,
    meta: { requiresAuth: true }, // Requer autenticação
  },
  {
    path: '/', // Rota inicial, redireciona para dashboard se autenticado, senão para login
    redirect: () => {
      return store.getters['auth/isAuthenticated'] ? '/dashboard' : '/login';
    },
  },
  {
    path: '*', // Catch-all para rotas não encontradas
    redirect: '/login',
  },
];

const router = new VueRouter({
  mode: 'history', // Usa o modo de histórico para URLs limpas (sem #)
  base: process.env.BASE_URL,
  routes,
});

// Guarda de navegação global: Executado antes de cada rota
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Se a rota requer autenticação e o usuário NÃO está autenticado
    next('/login'); // Redireciona para a página de login
  } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    // Se o usuário já está autenticado e tenta acessar Login ou Register
    next('/dashboard'); // Redireciona para o dashboard
  } else {
    // Permite a navegação
    next();
  }
});

export default router;