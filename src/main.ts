import 'lib-flexible';
import './assets/styles/index.css';
import 'vant/es/toast/style';
import 'vant/es/notify/style';
import 'vant/es/dialog/style';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "@/store"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(store).mount('#app');

