import { defineStore } from 'pinia'
import axiosC from '@/lib/libAxios'

// useAuthStore
export const useImageStore = defineStore({
  id: 'imageStore',
  state: () => ({
    // image list.
    imageList: [],

    // current image.
    image: { id: 0, fileName: '', fileMimetype: '', filePath: '', fileUrl: '' },
    // current image id.
    imageId: 0,

    // pager
    pager: { total: 0, start: 0, limit: 5 },
    // sample
    count: 0
  }),

  getters: {
    // 画像一覧データ
    getImageList: (state) => { return state.imageList },
    // 画像データ
    getImage: (state) => { return state.image },
    // 画像ID
    getImageId: (state) => { return state.imageId }
  },

  actions: {
    // [images]: get image list.
    async accessGetImageList () {
      //
      const url = '/api/images'
      const params = this.pager
      const config = {}

      try {
        //
        const response = await axiosC.get(url, { params: params }, config)
        // console.log('response', response)

        // setImageList
        this.imageList = response.data.data
        this.pager.total = response.data.total
      } catch (err) {
        // clearImageList
        this.imageList = []
        this.pager.total = 0
        // console.warn(err.response)
        if (err.response.status === 401) {
          // commit('loginFailure')
        } else {
          throw err
        }
      }
    },

    // [images]: get image list prev.
    async accessGetImageListPrev () {
      // setImageListPrev
      this.pager.start -= this.pager.limit
      if (this.pager.start < 0) {
        this.pager.start = 0
      }
      // api access
      await this.accessGetImageList()
    },
    // [images]: get image list.
    async accessGetImageListNext () {
      // setImageListNext
      const newstart = this.pager.start + this.pager.limit
      if (newstart < this.pager.total) {
        this.pager.start = newstart
      }
      // api access
      await this.accessGetImageList()
    },

    // [images]: get Image.
    async accessGetImage (payload) {
      //
      const url = '/api/images/' + payload.imageId
      const config = {}

      // api access
      try {
        const response = await axiosC.get(url, config)
        // console.log('response', response)

        // setImage
        this.image = response.data.data
        this.imageId = response.data.data.id
      } catch (err) {
        console.error('err: ', err)
        if (err.response.status === 401) {
          // commit('loginFailure')
        } else {
          throw err
        }
      }
    },

    // [images]: create Image.
    async accessCreateImage (payload) {
      //
      const url = '/api/images/'
      const imageData = {
        file_name: payload.image.file_name,
        file_mimetype: payload.image.file_mimetype,
        file_content: payload.image.file_content
      }

      const config = {}

      // api access
      try {
        await axiosC.post(url, imageData, config).then((response) => {
          // setImageId
          this.imageId = response.data.data.id
        })
      } catch (err) {
        if (err.response.status === 401) {
          // commit('loginFailure')
        } else {
          throw err
        }
      }
    },

    // [images]: update Image.
    async accessUpdateImage (payload) {
      //
      const url = '/api/images/' + payload.image.id
      const imageData = {
        file_name: payload.image.file_name,
        file_mimetype: payload.image.file_mimetype,
        file_content: payload.image.file_content
      }
      const config = {}

      // api access
      try {
        await axiosC.put(url, imageData, config)
      } catch (err) {
        if (err.response.status === 401) {
          // commit('loginFailure')
        } else {
          throw err
        }
      }
    },

    // [images]: delete image.
    async accessDeleteImage (payload) {
      //
      const url = '/api/images/' + payload.imageId
      const imageData = {}
      const config = {}

      // api access
      try {
        await axiosC.delete(url, imageData, config)
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
