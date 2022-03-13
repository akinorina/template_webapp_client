<script setup>
import { RouterLink } from "vue-router";
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
      <div class="cardlist">
        <div class="card">
          <div
            class="card-body"
            @click="$router.push({ name: 'managements-users-index' })"
          >
            <h5 class="card-title">ユーザー管理</h5>
            <h6 class="card-subtitle mb-2 text-muted">User</h6>
          </div>
        </div>

<!--
        <div class="card">
          <div
            class="card-body"
            @click="$router.push({ name: 'admin-images-index' })"
          >
            <h5 class="card-title">画像管理</h5>
            <h6 class="card-subtitle mb-2 text-muted">Image</h6>
          </div>
        </div>
-->
      </div>
    </div>

    <div class="container">
      <router-link :to="{ name: 'index' }">top pageへ</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.cardlist {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}

.card {
  margin: 10px;
  width: 200px;
  cursor: pointer;
}

</style>
