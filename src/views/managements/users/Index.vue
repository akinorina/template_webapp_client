<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from "@/stores/UserStore"

// components
import Breadcrumb from '@/components/Breadcrumb.vue'

// store
const userStore = useUserStore()

// router
const router = useRouter();

 // パン屑リスト
const breadcrumbData = [
   { link_data: { name: 'managements-index' }, label: '管理' },
   { link_data: null, label: 'ユーザー' }
]

// lifecycle hooks
onMounted(() => {
  // access to server.
  userStore.accessGetUserList()
})

// data: userList
const userList = computed(() => {
  return userStore.userList
})

// method: to [new User] page.
const newUser = () => {
  router.push({ name: 'managements-users-new' })
}

</script>

<template>
  <div>
    <section class="py-2 text-center container">
      <div class="row py-lg-5 border border-3 rounded">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">template_webapp_client</h1>
          <p class="lead text-muted">管理画面</p>
        </div>
      </div>
    </section>

    <div class="container">
      <breadcrumb :links="breadcrumbData"></breadcrumb>
    </div>

    <div class="container">
      <div class="row">
        <div class="col text-start">
          <button type="button" class="btn btn-primary" @click="newUser">新規</button>
        </div>
        <div class="col text-end">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary" @click="accessGetUserListPrev">prev</button>
            <button type="button" class="btn btn-primary" @click="accessGetUserListNext">next</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">氏名</th>
            <th scope="col" class="d-none d-md-table-cell">よみがな</th>
            <th scope="col" class="d-none d-sm-table-cell">e-mail</th>
            <th scope="col" class="d-none d-md-table-cell">ユーザータイプ</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userList" :key="item.id">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.name }}</td>
            <td class="d-none d-md-table-cell">{{ item.nameKana }}</td>
            <td class="d-none d-sm-table-cell">{{ item.email }}</td>
            <td class="d-none d-md-table-cell">{{ item.userType }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="$router.push({ name: 'managements-users-detail', params: { id: item.id } })"
              >
                詳細
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style lang="scss" scoped>
</style>>
