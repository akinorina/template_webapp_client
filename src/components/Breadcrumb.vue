<script setup>
import { RouterLink } from 'vue-router'

// Props
const props = defineProps(['links'])

</script>

<template>
  <div class="breadcrumb">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <template v-for="item in props.links" :key="item.label">
          <li class="breadcrumb-item">
            <template v-if="item.link_data === null">
              {{ item.label }}
            </template>
            <template v-else>
              <router-link :to="item.link_data">
                {{ item.label }}
              </router-link>
            </template>
          </li>
        </template>
      </ol>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
/*
 * パンクズリスト
 */
ol.breadcrumb {
  margin-bottom: 0;
}

div.breadcrumb {
  background-color: #c0e8f0;
  border-radius: 5px;
  padding: 10px;
  margin: 10px auto;
}

</style>
