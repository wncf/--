import { ifToekn } from '@/utils/core/utils'
import { createRouter, createWebHistory } from 'vue-router'
import defaultLayout from '../layout/defaultLayout.vue'
import home from '../views/home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: defaultLayout,
      redirect: '/news',
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
        },
        {
          path: '/friends',
          name: 'friends',
          component: () => import('../views/friends/friends.vue'),
        },
        {
          path: '/chat',
          name: 'chat',
          component: () => import('../views/chat/chat.vue'),
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/user/user.vue'),
        },
      ],
    },
    {
      path: '/userSettings',
      name: 'userSettings',
      component: () => import('../views/user/updateUser.vue'),
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: () => import('@/views/friends/userInfo.vue'),
    },
    {
      path: '/sendMessage',
      name: 'sendMessage',
      component: () => import('@/views/chat/sendMessage.vue'),
    },
  ],
})
const whileRouterList = ['home', 'friends', 'chat', 'user'] as string[]
router.beforeEach((to, from) => {
  if (ifToekn()) {
    return true
  } else {
    if (whileRouterList.includes(to.name as string)) return true
    router.replace('/chat')
  }
})
export default router
   