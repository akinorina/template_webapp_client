<script setup>
import { reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";

// stores
const authStore = useAuthStore();
// router
const router = useRouter()
// ユーザー情報
let editUser = reactive({ email: "", password: "" });
// エラーメッセージ表示フラグ
let showLoginFailureMessage = false;

//
const submit = () => {
  // 送信用データ作成
  const params = {
    email: editUser.email,
    password: editUser.password,
  };
  // DB保存
  authStore
    .accessLogin(params)
    .then(() => {
      // 詳細ページへ遷移
      router.push({ name: "managements-index" });
    })
    .catch((e) => {
      if (e.message === "Request failed with status code 401") {
        this.showLoginFailureMessage = true;
        setTimeout(() => {
          this.showLoginFailureMessage = false;
        }, 5000);
      } else {
        throw e;
      }
    });
};
</script>

<template>
  <div>
    <section class="py-2 text-center container">
      <div class="row py-lg-5 border border-3 rounded">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">template_webapp</h1>
          <h2 class="fw-light">Login</h2>
          <p class="lead text-muted">
            ユーザーID（e-mail）とパスワードを入力してログインください。
          </p>
        </div>
      </div>
    </section>

    <div class="container">
      <div
        class="login-error alert alert-danger alert-dismissible d-flex align-items-center"
        role="alert"
        v-if="showLoginFailureMessage"
      >
        <div>ログインに失敗、IDまたはパスワードに誤りがあります。</div>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>

      <form @submit.prevent="submit">
        <div class="row mb-3 justify-content-center">
          <label for="inputEmail" class="col-4 col-form-label">Email</label>
          <div class="col-6">
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              v-model="editUser.email"
            />
          </div>
        </div>

        <div class="row mb-3 justify-content-center">
          <label for="inputPassword" class="col-4 col-form-label">パスワード</label>
          <div class="col-6">
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              v-model="editUser.password"
            />
          </div>
        </div>
        <div class="row mb-3 justify-content-center">
          <div class="col-12 text-center">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </div>
      </form>
    </div>

    <div class="container mt-5">
      <router-link :to="{ name: 'index' }">Topページへ戻る</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
>
