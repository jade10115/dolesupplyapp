import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from "../views/Dashboard.vue";
import Home from './views/Home.vue';
import About from './views/About.vue';
import Services from './views/Services.vue';
import Contact from './views/Contact.vue';

Vue.use(VueRouter);

const routes = [
  {
      path: "/dashboard",
      name: 'dashboard',
      component: Dashboard
  },
  
  {
      path: "/login",
      name: 'login',
      component: Login
  },  
  
  ];

const router = createRouter({
  history: createWebHistory(),
 routes
})

export default router;
