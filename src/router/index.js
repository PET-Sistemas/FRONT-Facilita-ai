// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Importar seus componentes
import HomePage from '../components/HomePage.vue';
import AboutPage from '../components/AboutPage.vue';
import ContactPage from '../components/ContactPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
