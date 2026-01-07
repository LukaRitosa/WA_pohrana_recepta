import { createRouter, createWebHistory } from 'vue-router'
import ReceptiView from '@/components/Recepti.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'recepti',
      component: ReceptiView,
    },
  ],
})

export default router
