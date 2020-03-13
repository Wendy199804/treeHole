import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from '@/utils/utils.js'

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
    component: () => import('../views/Article.vue'),
    // beforeEnter: (to, from, next) => {
    //   if(!utils.getCookie('user')){
    //     this.$alert('请先登录', '提示', {
    //       confirmButtonText: '确定',
    //     });
    //   }else{
    //     console.log("已登录")
    //     next()
    //   }
    // }
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
  {
    path:'*',
    name:'error',
    component:() => import('../views/error.vue')
  }
]

const router = new VueRouter({
  routes
})
//导航守卫
router.beforeEach((to, from, next) => {
  console.log(Vue)
  if(to.name == 'home' || to.name == 'signup' || to.name == 'signin'){
    next()
  }else{
    if(!utils.getCookie('user')){
      alert('请先登录')
    }else{
      next()
    }
  }
  
})
export default router
