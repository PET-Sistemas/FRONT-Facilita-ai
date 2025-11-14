import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import VueTheMask from 'vue-the-mask';
import money from 'v-money3';


const app = createApp(App).use(router);

app.use(router);
app.use(VueTheMask);
app.use(money);

app.mount('#app');

