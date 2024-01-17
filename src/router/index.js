import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue'
import EventDetail from '@/views/EventDetail.vue'
import AboutSection from '@/views/AboutSection.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventList,
    },
    {
      path: '/event/:id',
      name: 'EventDetail',
      props: true,
      component: EventDetail,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutSection,
    },
  ],
})

export default router
