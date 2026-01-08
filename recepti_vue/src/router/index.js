import { createRouter, createWebHistory } from 'vue-router'
import ReceptiView from '@/components/Recepti.vue'
import Recept from '@/components/Recept.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'recepti',
      component: ReceptiView,
    },
    {
      path: '/:id',
      name: 'Recept',
      component: Recept
    },
  ],
})

export default router
