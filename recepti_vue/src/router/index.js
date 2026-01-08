import { createRouter, createWebHistory } from 'vue-router'
import ReceptiView from '@/components/Recepti.vue'
import Recept from '@/components/Recept.vue'
import Korisnici from '@/components/Korisnici.vue'
import Korisnik from '@/components/Korisnik.vue'

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
    {
      path: '/korisnici',
      name: 'Korisnici',
      component: Korisnici
    },
    {
      path: '/korisnik/:id',
      name: 'Korisnik',
      component: Korisnik
    },
  ],
})

export default router
