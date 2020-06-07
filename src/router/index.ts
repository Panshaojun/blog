import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import { User } from '@/api'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    alias: '/Home',
    component: Home
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/Essay',
    name: 'Essay',
    component: () => import('../views/Essay.vue')
  },
  {
    path: '/User',
    name: 'User',
    component: () => import('../views/User.vue'),
    redirect:'/User/Info',
    children:[
      {
        path: 'Comment',
        component: () => import('@/components/Manage/Comment.vue')
      },
      {
        path: 'Info',
        component: () => import('@/components/User/User.vue')
      }
    ]
  },
  {
    path: '/Manage',
    name: 'Manage',
    component: () => import('@/views/Manage.vue'),
    redirect:'/Manage/Overview',
    children: [
      {
        path: 'Overview',
        component: () => import('@/components/Manage/Overview.vue')
      },
      {
        path: 'Edit',
        component: () => import('@/components/Manage/Edit.vue')
      },
      {
        path: 'Essay',
        component: () => import('@/components/Manage/Essay.vue')
      },
      {
        path: 'Comment',
        component: () => import('@/components/Manage/Comment.vue')
      },
      {
        path: 'Category',
        component: () => import('@/components/Manage/Category.vue')
      },
      {
        path: 'Tag',
        component: () => import('@/components/Manage/Tag.vue')
      },
      {
        path: 'File',
        component: () => import('@/components/Manage/File.vue')
      },
      {
        path: 'Subscriber',
        component: () => import('@/components/Manage/Subscriber.vue')
      },
      {
        path: 'Info',
        component: () => import('@/components/User/User.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/home'
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path.search(/manage/i) !== -1) {
    if (User.__user.group !== 'admin') return next({name:'Home'});
  }
  if (to.path.search(/user/i) !== -1) {
    if (User.__user.group !== 'subscriber') return next({name:'Home'});
  }
  next();
})

export default router
