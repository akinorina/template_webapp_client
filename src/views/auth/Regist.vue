<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

// store
const userStore = useUserStore()

// router & route
const router = useRouter()

// data
const data = reactive({
  user: {
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
  userStore.accessRegistUser(data.user).then(() => {
    // Loginページへ遷移
    router.push({ name: 'auth-regist-complete' })
  })
}

</script>

<template>
  <div>
    <section class="py-2 text-center container">
      <div class="row py-lg-5 border border-3 rounded">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">template_webapp</h1>
          <h2 class="fw-light">Registration</h2>
          <p class="lead text-muted">ユーザー情報を入力してご登録ください。</p>
        </div>
      </div>
    </section>

    <div class="container">
      <form @submit.prevent="submit">
        <div class="row mb-3">
          <label for="inputName" class="col-5 col-form-label">氏名</label>
          <div class="col-5">
            <input type="text" class="form-control" id="inputName" v-model="data.user.name" />
          </div>
        </div>

        <div class="row mb-3">
          <label for="inputNamekana" class="col-5 col-form-label"
            >氏名よみがな</label
          >
          <div class="col-5"> <input type="text" class="form-control" id="inputNamekana" v-model="data.user.nameKana" /></div>
        </div>

        <div class="row mb-3">
          <label for="inputEmail" class="col-5 col-form-label">Email</label>
          <div class="col-5"><input type="email" class="form-control" id="inputEmail" v-model="data.user.email" /></div>
        </div>

        <div class="row mb-3">
          <label for="inputPassword" class="col-5 col-form-label">パスワード</label>
          <div class="col-5"><input type="password" class="form-control" id="inputPassword" v-model="data.user.password" /></div>
        </div>

        <div class="row mb-3">
          <label for="inputUserType" class="col-5 col-form-label">ユーザータイプ</label>
          <div class="col-7">
            <select class="form-select" aria-label="Default select example" id="inputUserType" v-model="data.user.userType">
              <option value="" selected>--- 選択してください ---</option>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
        </div>

        <button type="submit" class="btn btn-secondary" @click="$router.push({ name: 'index' })">戻る</button>
        &nbsp;
        <button type="submit" class="btn btn-primary">保存</button>
      </form>
    </div>

  </div>
</template>

<style lang="scss" scoped>
</style>>
