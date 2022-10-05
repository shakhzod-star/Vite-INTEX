import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import pinia from './pinia';
import {createPinia} from 'pinia';
import { VueMaskDirective } from 'v-mask'
import AOS from 'aos'
import './assets/style/app.scss'
import "./assets/style/aos.css";
import i18n from './i18n'


const app =   createApp(App)

app.config.productionTip = false

// USE 

app.use(router)
// app.use(pinia)
app.use(createPinia())
app.use(AOS.init())
app.use(i18n)

// directive

app.directive('mask',VueMaskDirective)

.mount('#app')
