import { defineStore } from 'pinia'
import axiosC from '@/lib/libAxios'

// useAuthStore
export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    loginStatus: {
      isAuthenticated: false,
      id: null,
      name: null,
      needLogin: true
    }
  }),
  getters: {
    // login status
    getloginStatus: (state) => { state.loginStatus }
  },
  actions: {
    // [auth]: login.
    async accessLogin(input) {
      console.log('--- accessLogin() ---')
      //
      const url = '/api/auth/login'
      const params = {
        email: input.email,
        password: input.password
      }
      const config = {}
      // api access
      await axiosC.post(url, params, config).then((res) => {
        // login success
        console.log('--- login success ---')
        this.loginStatus.isAuthenticated = true
        this.loginStatus.id = res.data.user.id
        this.loginStatus.name = res.data.user.name
        this.loginStatus.needLogin = false
      }).catch((e) => {
        // login failure
        console.log('--- login failure ---')
        this.loginStatus.isAuthenticated = false
        this.loginStatus.id = null
        this.loginStatus.name = null
        this.loginStatus.needLogin = true
        throw e
      })
    },
    // [auth]: get login status
    async accessLoginStatus() {
      //
      const url = '/api/auth/status'
      const params = {}
      const config = {}
      // api access
      await axiosC.get(url, params, config).then((res) => {
        if (res.data.user.name !== null) {
          console.log('--- status: logined already ---')
          this.loginStatus.isAuthenticated = true
          this.loginStatus.id = res.data.user.id
          this.loginStatus.name = res.data.user.name
          this.loginStatus.needLogin = false
        } else {
          console.log('--- status: not login ---')
          this.loginStatus.isAuthenticated = false
          this.loginStatus.id = null
          this.loginStatus.name = null
          this.loginStatus.needLogin = true
        }
      }).catch((e) => {
        this.loginStatus.isAuthenticated = false
        this.loginStatus.id = null
        this.loginStatus.name = null
        this.loginStatus.needLogin = true
        throw e
      })
    },
    // [auth]: logout.
    async accessLogout() {
      //
      const url = '/api/auth/logout'
      const params = {}
      const config = {}
      // api access
      await axiosC.get(url, params, config)
      // logoutSuccess
      this.loginStatus.isAuthenticated = false
      this.loginStatus.id = null
      this.loginStatus.name = null
      this.loginStatus.needLogin = true
    }
  }
})

// export const useCounterStore = defineStore({
//   id: 'counter',
//   state: () => ({
//     counter: 0
//   }),
//   getters: {
//     doubleCount: (state) => state.counter * 2
//   },
//   actions: {
//     increment() {
//       this.counter++
//     }
//   }
// })
