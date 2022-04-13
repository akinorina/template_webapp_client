<script setup>
import { computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

// components
import Breadcrumb from '@/components/Breadcrumb.vue'

// store
const userStore = useUserStore();

// router & route
const router = useRouter();
const route = useRoute();

// パン屑リスト
const breadcrumbData = [
  { link_data: { name: "managements-index" }, label: "管理" },
  { link_data: { name: "managements-users-index" }, label: "ユーザー" },
  { link_data: null, label: "詳細" },
];

// lifecycle hooks
onMounted(() => {
  // access to server.
  userStore.accessGetUser({ userId: userId.value });
});

// target user id.
const userId = computed(() => {
  return route.params.id;
})

// data: user
const user = computed(() => {
  return userStore.user;
})

// method: delete this data.
const deleteThis = () => {
  // access to server.
  userStore.accessDeleteUser({ userId: userId.value }).then(() => {
    router.push({ name: 'managements-users-index' })
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

    <section class="container">
      <breadcrumb :links="breadcrumbData"></breadcrumb>
    </section>

    <section class="container">
      <div class="row mb-3">
        <label for="inputId" class="col-5 col-form-label">ID</label>
        <div class="col-7">
          <input
            type="text"
            class="form-control-plaintext"
            id="inputId"
            v-model="user.id"
            readonly
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputFamilyName" class="col-5 col-form-label">氏名</label>
        <div class="col-3">
          <input
            type="text"
            class="form-control-plaintext"
            id="inputFamilyName"
            v-model="user.familyName"
          />
        </div>
        <div class="col-3">
          <input
            type="text"
            class="form-control-plaintext"
            id="inputFirstName"
            v-model="user.firstName"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputFamilyNamekana" class="col-5 col-form-label">氏名よみがな</label>
        <div class="col-3">
          <input
            type="text"
            class="form-control-plaintext"
            id="inputFamilyNamekana"
            v-model="user.familyNameKana"
          />
        </div>
        <div class="col-3">
          <input
            type="text"
            class="form-control-plaintext"
            id="inputFirstNamekana"
            v-model="user.firstNameKana"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputEmail" class="col-5 col-form-label">Email</label>
        <div class="col-7">
          <input
            type="email"
            class="form-control-plaintext"
            id="inputEmail"
            v-model="user.email"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword" class="col-5 col-form-label">パスワード</label>
        <div class="col-7">
          <input
            type="password"
            class="form-control-plaintext"
            id="inputPassword"
            v-model="user.password"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputUserType" class="col-5 col-form-label">ユーザータイプ</label>
        <div class="col-7">
          <input
            type="email"
            class="form-control-plaintext"
            id="inputUserType"
            v-model="user.userType"
          />
        </div>
      </div>
    </section>

    <section class="container">
      <div class="container">
        <button
          type="button"
          class="btn btn-secondary"
          @click="$router.push({ name: 'managements-users-index' })"
        >
          一覧へ戻る
        </button>
        &nbsp;
        <button
          type="button"
          class="btn btn-primary"
          @click="
            $router.push({ name: 'managements-users-edit', params: { id: user.id } })
          "
        >
          編集
        </button>
        &nbsp;
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          削除
        </button>
      </div>
    </section>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">template_webapp</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">削除しますか？</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              キャンセル
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="deleteThis"
            >
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
