import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia';
import AOS from 'aos'
import './assets/style/app.scss'
import "./assets/style/aos.css";
import i18n from './i18n'
import { VMaskDirective } from 'v-slim-mask'


const app =   createApp(App)
app.config.productionTip = false
// USE 
app.use(router)
app.use(createPinia()) 
app.use(AOS.init())
app.use(i18n)



app.directive('mask', VMaskDirective)



.mount('#app')
