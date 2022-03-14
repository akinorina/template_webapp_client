<script setup>
import { reactive, computed, onMounted } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import { useImageStore } from "@/stores/ImageStore";

// components
import Breadcrumb from '@/components/Breadcrumb.vue'

// store
const imageStore = useImageStore()

// router & route
const router = useRouter()
const route = useRoute()

// パン屑リスト
const breadcrumbData = [
  { link_data: { name: 'managements-index' }, label: '管理' },
  { link_data: { name: 'managements-images-index' }, label: '画像' },
  { link_data: null, label: '新規登録' }
]
// 対象エリア element
let uploadArea = null
// Input File element
let inputFiles = null
// 画像表示 element
let editElement = null
//
const data = reactive({
  editImage: {
    id: 0,
    fileName: '',
    fileMimetype: '',
    fileContent: ''
  }
})

// lifecycle hooks
onMounted(() => {
  // 対象エリア element
  uploadArea = document.getElementById('uploadArea')
  // Input File element
  inputFiles = document.getElementById('images')
  // 画像表示 element
  editElement = document.getElementById('image__image__image')
})

// data: image
const image = computed(() => {
  return imageStore.image
})

// data: imageId
const imageId = computed(() => {
  return imageStore.imageId
})

// // method: xxxxx
// const newImage = () => {
//   // router.push({ name: "managements-images-new" });
//   alert('not coded.')
// };

// method:
const fileDragover = (event) => {
  // 背景色設定
  event.target.classList.add('drag')
}
// method:
const fileDragleave = (event) => {
  // 背景色リセット
  event.target.classList.remove('drag')
}
// method:
const fileDrop = (event) => {
  // 背景色リセット
  event.target.classList.remove('drag')
  event.target.classList.add('dropped')

  // drag したファイルを設定
  inputFiles.files = event.dataTransfer.files
  console.log('--- inputFiles', inputFiles.files[0])
  console.log('--- inputFiles', inputFiles.files[0].name)

  // 画像読込、表示
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    data.editImage.fileUrl = reader.result
    //
    const contents = reader.result.match(/^data:(.*);base64,(.*)$/)
    data.editImage.fileName = inputFiles.files[0].name
    data.editImage.fileContent = contents[2]
    data.editImage.fileMimetype = contents[1]
  })
  reader.readAsDataURL(inputFiles.files[0])
}

// method:
const changeFile = (event) => {
  // 画像読込、表示
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    data.editImage.fileUrl = reader.result
    //
    const contents = reader.result.match(/^data:(.*);base64,(.*)$/)
    data.editImage.fileName = inputFiles.files[0].name
    data.editImage.fileContent = contents[2]
    data.editImage.fileMimetype = contents[1]
  })
  reader.readAsDataURL(this.inputFiles.files[0])
}

// method:
const submit = (event) => {
  // 送信用データ作成
  const sendImage = {
    file_name: data.editImage.fileName,
    file_mimetype: data.editImage.fileMimetype,
    file_content: data.editImage.fileContent
  }

  // DB保存
  imageStore.accessCreateImage({ image: sendImage }).then((res) => {
    console.log('imageStore - imageId', imageId)
    console.log('imageStore - imageId', imageId.value)
    // 詳細ページへ遷移
    router.push({
      name: 'managements-images-detail',
      params: { id: imageId.value }
    })
  })
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

    <section class="container">
      <breadcrumb :links="breadcrumbData"></breadcrumb>
    </section>

    <form @submit.prevent="submit">
      <section class="container">
        <div class="image">

          <div class="image__name">
            <label for="image__name__input">画像名: </label>
            <input class="image__name__input" id="image__name__input" type="text" name="filename" v-model="data.editImage.fileName" />
          </div>
          <div class="image__mimetype">
            <label for="image__mimetype__input">ファイル mimy タイプ: </label>
            <input class="image__mimetype__input" id="image__mimetype__input" type="text" name="fileMimetype" v-model="data.editImage.fileMimetype" />
          </div>
          <div class="image__fileContent">
            <label for="image__fileContent__input">ファイル データ (base64): </label>
            <input class="image__fileContent__input" id="image__fileContent__input" type="text" name="name" v-model="data.editImage.fileContent" />
          </div>

          <div class="image__image">
            <img class="image__image__image" id="image__image__image" :src="data.editImage.fileUrl" />
          </div>

          <div class="drag-area image__upload" id="uploadArea" @dragover.prevent="fileDragover" @dragleave.prevent="fileDragleave" @drop.prevent="fileDrop">
            ここに画像ファイルをドロップ!
          </div>
          <input type="file" id="images" name="images" accept="image/png, image/jpeg" style="visibility: hidden" @change="changeFile" />

        </div>
      </section>

      <section class="container">
        <div class="container">
          <button
            type="button"
            class="btn btn-secondary"
            @click="$router.push({ name: 'managements-images-index', params: {} })"
          >
            戻る
          </button>
          &nbsp;
          <button type="submit" class="btn btn-primary">保存</button>
        </div>
      </section>
    </form>

  </div>
</template>

<style lang="scss" scoped>

//
.image {
  margin: 0 auto 30px;

  &__id {
    width: auto;
    height: auto;
  }

  &__name {
    width: auto;
    height: auto;
  }

  &__image {
    margin: 0 auto;
    width: 350px;
    height: 350px;
    border: 10px #f0f0f0 solid;
    display: flex;
    justify-content: center;

    &__image {
      width: auto;
      height: auto;
      max-width: 350px;
      max-height: 350px;
    }
  }

  &__upload {
    margin: 0 auto;
    padding: 25px 0;
    width: 350px;
    height: 100px;
    border: 10px #f0f0f0 solid;
    background: #f0f0f0;
    display: flex;
  }
}

.drag-area{
  text-align: center;
}
.drag-area.drag{
  background: #f08080;
}
.drag-area.dropped{
  background: #f0c0c0;
}

.drag-area input {
   margin:0 auto;
}

</style>
