import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/event/List.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventEdit from '@/views/event/Edit.vue'
import EventRegister from '@/views/event/Register.vue'
import About from '@/views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'List',
      props: (route) => ({ page: +route.query.page || 1 }),
      component: EventList,
    },
    {
      path: '/event/:id',
      name: 'Layout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'Details',
          component: EventDetails,
        },
        {
          path: 'edit',
          name: 'Edit',
          component: EventEdit,
        },
        {
          path: 'register',
          name: 'Register',
          component: EventRegister,
        },
      ],
    },
    {
      path: '/about-us',
      name: 'About',
      component: About,
      alias: '/about',
    },
  ],
})

export default router
