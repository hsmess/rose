import { createRouter, createWebHistory } from 'vue-router'
import ComingSoon from './pages/ComingSoon.vue'
import Season2026 from './pages/Season2026.vue'
import EventPage from './pages/EventPage.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      window.scroll({ top: 0 })
    } else {
      document.querySelector('html').style.scrollBehavior = 'auto'
      window.scroll({ top: 0 })
      document.querySelector('html').style.scrollBehavior = ''
    }
  },
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: ComingSoon
    },
    {
      path: '/2026',
      component: Season2026
    },
    {
      path: '/events/:slug',
      component: EventPage
    },
    {
      // Short vanity links, e.g. /ripley-26 -> /events/ripley-26
      path: '/:slug([^/]+)',
      redirect: (to) => ({ path: `/events/${to.params.slug}` })
    },
    {
      path: '/:catchAll(.*)*',
      redirect: '/'
    }
  ]
})

export default router
