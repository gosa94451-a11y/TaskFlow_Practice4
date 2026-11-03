import { createApp } from 'vue';
import Framework7 from '../node_modules/framework7/framework7-lite-bundle.esm.js';
import Framework7Vue, { registerComponents } from '../node_modules/framework7-vue/framework7-vue-bundle.js';
import '../node_modules/framework7/framework7-bundle.css';
import './css/app.css';
import App from './App.vue';

Framework7.use(Framework7Vue);
const app = createApp(App);
registerComponents(app);
app.mount('#app');
