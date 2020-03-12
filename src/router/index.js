import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    alias:'/'
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/Article.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/Personal.vue'),
    redirect: { name: 'mytips' },
    children: [
      {
        path: 'mytips',
        name:'mytips',
        component: () => import('../components/Mytips.vue')
      },
      {
        path: 'mycomments',
        name:'mycomments',
        component: () => import('../components/Mycomments.vue')
      },
    ]
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/Sign_in.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Sign_up.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/visitor',
    name: 'visitor',
    component: () => import('../views/Visitor.vue')
  },
  {
    path: '/secret',
    name: 'secret',
    component: () => import('../views/Newsecret.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
