import { createRouter, createWebHashHistory } from "vue-router";
import Page from '../views/Page.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Page
  },
  // {
  //   path: '/:id',
  //   name: 'homeId',
  //   component: Page
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
