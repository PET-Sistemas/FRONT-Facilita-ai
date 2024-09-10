// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Importar seus componentes dinamicamente
const HomePage = () => import('../components/HomePage.vue');
const CadastroPage = () => import('../components/CadastroPage.vue');

// Obter a URL base a partir da variável de ambiente
const baseUrl = process.env.VUE_APP_BASE_URL || '/';

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: CadastroPage,
    },
  ],
});

export default router;
