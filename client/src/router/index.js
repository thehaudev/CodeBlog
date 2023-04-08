import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        layout:'home'
      }
      ,
      component: () => import('../views/HomeView.vue')
    },{
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },{
      path: '/auth/account-recovery',
      name: 'account-recovery',
      component: () => import('../views/AccountRecoveryView.vue')
    },{
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },{
      path: '/auth/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    },{
      path:'/tags',
      name:'tags',
      meta:{
        layout:'home'
      },
      component:()=> import('../views/TagView.vue')
    },{
      path:'/users',
      name:'users',
      meta:{
        layout:'home'
      },
      component:()=> import('../views/UsersView.vue')
    }
    ,{
      path: '/publish/post',
      name: 'post',
      component: () => import('../views/PostView.vue')
    },{
      path: '/post/:id',
      name: 'postDetail',
      component: () => import('../views/PostDetailView.vue')
    },{
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFound.vue"),
    },
  ]
})

export default router
