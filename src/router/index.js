import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores/AuthStore"

// pages
import Index from '../views/Index.vue'
import NotFound from '../views/NotFound.vue'

// Auth
import AuthRegist from '../views/auth/Regist.vue'
import AuthRegistComplete from '../views/auth/RegistComplete.vue'
import AuthLogin from '../views/auth/Login.vue'
import AuthLogout from '../views/auth/Logout.vue'

// Managements
import ManagementsIndex from '../views/managements/Index.vue'

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
    },

    // Auth
    {
      path: '/auth/regist',
      name: 'auth-regist',
      component: AuthRegist
    },
    {
      path: '/auth/regist-complete',
      name: 'auth-regist-complete',
      component: AuthRegistComplete
    },
    {
      path: '/auth/login',
      name: 'auth-login',
      component: AuthLogin
    },
    {
      path: '/auth/logout',
      name: 'auth-logout',
      component: AuthLogout
    },

    // managements
    {
      path: '/managements',
      name: 'managements-index',
      component: ManagementsIndex
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not_found',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // stores
  const authStore = useAuthStore();

  //
  if (
    to.name !== 'auth-login' &&
    to.name.match(/(^managements-.*)/) !== null &&
    !authStore.loginStatus.isAuthenticated
  ) {
    authStore.accessLoginStatus().then(() => {
      if (
        to.name !== 'auth-login' &&
        to.name.match(/(^managements-.*)/) !== null &&
        !authStore.loginStatus.isAuthenticated
      ) {
        next({ name: 'auth-login' })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router
