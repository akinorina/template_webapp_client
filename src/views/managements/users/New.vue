<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

// components
import Breadcrumb from '@/components/Breadcrumb.vue'

// store
const userStore = useUserStore();

// router
const router = useRouter();

// パン屑リスト
const breadcrumbData = [
  { link_data: { name: 'managements-index' }, label: '管理' },
  { link_data: { name: 'managements-users-index' }, label: 'ユーザー' },
  { link_data: null, label: '新規作成' }
]

// data
const data = reactive({
  newUser: {
    name: '',
    nameKana: '',
    email: '',
    password: '',
    userType: ''
  }
})

// method: submit
const submit = () => {
  // DB保存
  userStore.accessCreateUser(data.newUser).then(() => {
    // 詳細ページへ遷移
    router.push({ name: 'managements-users-index', params: {} })
  })
}

</script>

<template>
  <div>
    <section class="py-2 text-center container">
      <div class="row py-lg-5 border border-3 rounded">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">template_webapp</h1>
          <p class="lead text-muted">管理画面</p>
        </div>
      </div>
    </section>

    <div class="container">
      <breadcrumb :links="breadcrumbData"></breadcrumb>
    </div>

    <div class="container">
      <form @submit.prevent="submit">
        <div class="row mb-3">
          <label for="inputName" class="col-5 col-form-label">氏名</label>
          <div class="col-5">
            <input type="text" class="form-control" id="inputName" v-model="data.newUser.name" />
          </div>
        </div>

        <div class="row mb-3">
          <label for="inputNamekana" class="col-5 col-form-label"
            >氏名よみがな</label
          >
          <div class="col-5"> <input type="text" class="form-control" id="inputNamekana" v-model="data.newUser.nameKana" /></div>
        </div>

        <div class="row mb-3">
          <label for="inputEmail" class="col-5 col-form-label">Email</label>
          <div class="col-5"><input type="email" class="form-control" id="inputEmail" v-model="data.newUser.email" /></div>
        </div>

        <div class="row mb-3">
          <label for="inputPassword" class="col-5 col-form-label">パスワード</label>
          <div class="col-5"><input type="password" class="form-control" id="inputPassword" v-model="data.newUser.password" /></div>
        </div>

        <div class="row mb-3">
          <label for="inputUserType" class="col-5 col-form-label">ユーザータイプ</label>
          <div class="col-7">
            <select class="form-select" aria-label="Default select example" id="inputUserType" v-model="data.newUser.userType">
              <option value="" selected>--- 選択してください ---</option>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
        </div>

        <button type="submit" class="btn btn-secondary" @click="$router.push({ name: 'managements-users-index' })">戻る</button>
        &nbsp;
        <button type="submit" class="btn btn-primary">保存</button>
      </form>
    </div>

  </div>
</template>

<style lang="scss" scoped>
</style>
