<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useImageStore } from "@/stores/ImageStore";

// components
import Breadcrumb from '@/components/Breadcrumb.vue'

// store
const imageStore = useImageStore();

// router
const router = useRouter();

// パン屑リスト
const breadcrumbData = [
  { link_data: { name: "managements-index" }, label: "管理" },
  { link_data: null, label: "画像" },
];

// lifecycle hooks
onMounted(() => {
  // access to server.
  imageStore.accessGetImageList();
});

// data: userList
const imageList = computed(() => {
  return imageStore.imageList;
});

// method: to [new User] page.
const newImage = () => {
  router.push({ name: "managements-images-new" });
};
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
      <div class="row">
        <div class="col text-start">
          <button type="button" class="btn btn-primary" @click="newImage">新規</button>
        </div>
        <div class="col text-end">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary" @click="imageStore.accessGetImageListPrev">
              prev
            </button>
            <button type="button" class="btn btn-primary" @click="imageStore.accessGetImageListNext">
              next
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">画像</th>
            <th scope="col" class="d-none d-lg-table-cell">UserID</th>
            <th scope="col" class="">ファイル名</th>
            <th scope="col" class="d-none d-sm-table-cell">ファイル mimetype</th>
            <th scope="col" class="d-none d-md-table-cell">ファイル url</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in imageList" :key="item.id">
            <th scope="row">{{ item.id }}</th>
            <td><img :src="item.fileUrl" style="max-height: 70px" /></td>
            <td class="d-none d-lg-table-cell">{{ item.userId }}</td>
            <td>{{ item.fileName }}</td>
            <td class="d-none d-sm-table-cell">{{ item.fileMimetype }}</td>
            <td class="d-none d-md-table-cell">{{ item.fileUrl }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="router.push({ name: 'managements-images-detail', params: { id: item.id } })"
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
</style>
