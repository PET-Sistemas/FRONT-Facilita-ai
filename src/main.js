// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importar o router

const app = createApp(App);

app.use(router); // Adicionar o router
app.mount('#app');
