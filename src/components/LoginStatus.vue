<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

// Store
const authStore = useAuthStore()

// auth: login status
const auth = computed(() => {
  return authStore.loginStatus
})

</script>

<template>
  <div class="login-status">
    <template v-if="auth.isAuthenticated">
      <div class="login-status__item">{{ auth.name }}</div>
      <router-link class="login-status__item" :to="{ name: 'auth-logout' }">ログアウト</router-link>
    </template>
    <template v-else>
      <router-link class="login-status__item" :to="{ name: 'auth-login' }">ログイン</router-link>
      <router-link class="login-status__item" :to="{ name: 'auth-regist' }">新規登録</router-link>
    </template>
  </div>
</template>

<style lang="scss" scoped>

.login-status {
  width: 100%;
  margin: 0;
  padding: 5px;

  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;

  &__item {
    border-right: 1px blue solid;
    padding: 0 10px;
  }
  &__item:last-child {
    border-right: 0;
  }
}

// /*
//  * パンクズリスト
//  */
// ol.breadcrumb {
//   margin-bottom: 0;
// }

// div.breadcrumb {
//   background-color: #f8f8f8;
//   border-radius: 5px;
//   padding: 10px;
//   margin: 20px auto;
// }

</style>
