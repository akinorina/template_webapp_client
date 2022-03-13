/**
 * UserStore
 *
 */
import { defineStore } from 'pinia'
import axiosC from '../lib/libAxios'

// useUserStore
export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    // user list.
    userList: () => { [] },

    // current user.
    user: { id: 0, name: '', nameKana: '', email: '', password: '', userType: '' },
    // current user id.
    userId: 0,

    // pager
    pager: { total: 0, start: 0, limit: 10 },
    // sample
    count: 0
  }),
  getters: {
    // ユーザー一覧データ
    getUserList: (state) => { state.userList },
    // ユーザーデータ
    getUser: (state) => { state.user },
    // ユーザーID
    getUserId: (state) => { state.userId }
  },
  actions: {
    // [users]: get user list.
    async accessGetUserList () {
      //
      const url = '/api/users'
      const params = this.pager
      const config = {}

      //
      try {
        //
        const response = await axiosC.get(url, { params: params }, config)
        // setUserList
        this.userList = response.data.data
        this.pager.total = response.data.total
      } catch (err) {
        if (err.response.status === 401) {
          // clearUserList
          this.userList = []
          this.pager.total = 0
          // commit('loginFailure')
        } else {
          throw err
        }
      }
    },
    // [users]: get user list prev.
    async accessGetUserListPrev ({ commit }) {
      // setUserListPrev
      this.pager.start -= this.pager.limit
      if (this.pager.start < 0) {
        this.pager.start = 0
      }
      // api access
      await this.accessGetUserList()
    },
    // [users]: get user list.
    async accessGetUserListNext ({ commit }) {
      // setUserListNext
      const newstart = this.pager.start + this.pager.limit
      if (newstart < this.pager.total) {
        this.pager.start = newstart
      }
      // api access
      await this.accessGetUserList()
    },

    // [users]: get User.
    async accessGetUser (payload) {
      //
      const url = '/api/users/' + payload.userId
      const config = {}

      // api access
      try {
        const response = await axiosC.get(url, config)
        // setUser
        this.user = response.data.data[0]
        this.userId = response.data.data[0].id
      } catch (err) {
        if (err.response.status === 401) {
          // commit('loginFailure')
        } else {
          throw err
        }
      }
    },

    // [users]: create User.
    async accessCreateUser (payload) {
      //
      const url = '/api/users/'
      const userData = {
        name: payload.name,
        nameKana: payload.nameKana,
        email: payload.email,
        password: payload.password,
        userType: payload.userType
      }
      const config = {}

      // api access
      try {
        await axiosC.post(url, userData, config).then((response) => {
          // setUserId
          this.userId = response.data.data.id
        })
      } catch (err) {
        if (err.response.status === 401) {
          // commit('loginFailure')
        } else {
          throw err
        }
      }
    },

    // [users]: update User.
    async accessUpdateUser (payload) {
      //
      const url = '/api/users/' + payload.id
      const userData = {
        name: payload.name,
        nameKana: payload.nameKana,
        email: payload.email,
        password: payload.password,
        userType: payload.userType
      }
      const config = {}

      // api access
      try {
        await axiosC.put(url, userData, config)
      } catch (err) {
        if (err.response.status === 401) {
          // commit('loginFailure')
        } else {
          throw err
        }
      }
    },

    // [users]: delete user.
    async accessDeleteUser (payload) {
      //
      const url = '/api/users/' + payload.userId
      const userData = {}
      const config = {}

      // api access
      try {
        await axiosC.delete(url, userData, config)
      } catch (err) {
        if (err.response.status === 401) {
          // commit('loginFailure')
        } else {
          throw err
        }
      }
    }
  }
})
