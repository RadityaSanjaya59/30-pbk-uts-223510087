import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import { Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import 'quasar/src/css/index.sass';


const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Quasar, { plugins: {} });

app.mount('#app');
