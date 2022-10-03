import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './pinia'
import VueMask from 'v-mask'
import i18n from  './i18n';
import AOS from 'aos'
import './assets/style/app.scss'
import "./assets/style/aos.css";

const app =   createApp(App)

app.config.productionTip = false
app.use(VueMask);
app.use(AOS.init())
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(AOS)
.mount('#app')
