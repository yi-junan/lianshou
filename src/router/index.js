import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/app/HelloWorld'
import Index from '@/app/Index'

const Search = () => import('../views/search/Search.vue');
const Register = () => import('../views/register/Register.vue');
const Login = () => import('../views/login/Login.vue');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/',
      name: 'Search',
      component: Search,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    }
  ]
})
