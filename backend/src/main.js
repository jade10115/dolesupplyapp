import { createApp } from 'vue'
import './style.css'
import store from './store'
import router from './router'
import App from './App.vue'
import axios from 'axios'
// import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/css/all.css';
import { TailwindPagination } from 'laravel-vue-pagination';

axios.defaults.baseURL = 'http://localhost:8000/';




createApp(App)
.use(store)
.use(router)
.mount('#app')
