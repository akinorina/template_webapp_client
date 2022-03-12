import { createRouter, createWebHistory } from 'vue-router'

// pages
import Index from '../views/Index.vue'

// Samples
import SamplesIndex from '../views/Samples/Index.vue'
import SamplesPage001 from '../views/Samples/Page001.vue'
import SamplesPage002 from '../views/Samples/Page002.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/samples',
      name: 'samples-index',
      component: SamplesIndex
    },
    {
      path: '/samples/page001',
      name: 'samples-page001',
      component: SamplesPage001
    },
    {
      path: '/samples/page002',
      name: 'samples-page002',
      component: SamplesPage002
    }
  ]
})

export default router
