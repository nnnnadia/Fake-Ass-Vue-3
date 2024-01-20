import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/event/List.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventEdit from '@/views/event/Edit.vue'
import EventRegister from '@/views/event/Register.vue'
import About from '@/views/About.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      props: (route) => ({ page: +route.query.page || 1 }),
      component: EventList,
    },
    {
      path: '/event/:id',
      name: 'EventActions',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'EventDetails',
          component: EventDetails,
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: EventEdit,
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: EventRegister,
        },
      ],
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true,
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError,
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
