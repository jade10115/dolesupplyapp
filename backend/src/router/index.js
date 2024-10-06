import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Inventory from "../views/Inventory.vue";
import Employee from "../views/Employee.vue";
import Ris from "../views/Ris.vue";

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/inventory', component: Inventory, meta: { title: 'Invetory' } },
  { path: '/employee', component: Employee, meta: { title: 'Employee' } },
  { path: '/ris', component: Ris, meta: { title: 'RIS' } },
];
 
const router = createRouter({
  history: createWebHistory(),
  routes,


});

router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Home';

  next();
})

export default router;
