import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
