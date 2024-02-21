import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
const pinia = createPinia();
// loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(pinia)
  .use(Toast, {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
  })
  .mount('#app')
