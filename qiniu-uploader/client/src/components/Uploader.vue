<template>
  <div class="page">
    <h1 class="title">使用七牛云上传文件</h1>

    <div
      class="uploader-wrapper"
      @dragenter="onFileDragenter"
      @dragover="onFileDragover"
      @dragleave="onFileDragleave"
      @drop="onFileDrop"
      @paste="onFilePaste"
    >
      <div class="uploader-content">
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          style="display: none"
          @change="onFileChange"
        />
        <button class="uploader-btn" type="button" @click="upload">点击选择照片</button>
        <p class="uploader-tips">您可以点击上面的按钮，也可以将图片拖放或粘贴到这里</p>
      </div>
    </div>

    <Preview v-if="previewList && previewList.length" :preview-list="previewList" />
  </div>
</template>

<script>
import Preview from './Preview.vue'

export default {
  name: 'Uploader',
  components: {
    Preview,
  },
  data() {
    return {
      fileList: [],
      previewList: [],
    }
  },
  methods: {
    upload() {
      document.querySelector('#fileInput').click()
    },
    handelFiles(files) {
      this.fileList.push(...files)
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.addEventListener('load', (e) => {
          this.previewList.push({
            name: file.name,
            url: e.target.result,
          })
        })
      }
    },

    onFileChange(e) {
      this.handelFiles(e.target.files)
    },
    onFilePaste(e) {
      this.handelFiles(e.clipboardData.files)
    },
    onFileDragenter(e) {
      console.log('onFileDragenter')
      e.stopPropagation()
      e.preventDefault()
    },
    onFileDragover(e) {
      console.log('onFileDragover')
      e.stopPropagation()
      e.preventDefault()
      document.querySelector('.uploader-content').classList.add('active')
    },
    onFileDragleave(e) {
      console.log('onFileDragleave')
      e.stopPropagation()
      e.preventDefault()
      document.querySelector('.uploader-content').classList.remove('active')
    },
    onFileDrop(e) {
      console.log('onFileDrop')
      e.stopPropagation()
      e.preventDefault()
      this.handelFiles(e.dataTransfer.files)
      document.querySelector('.uploader-content').classList.remove('active')
    },
  },
}
</script>

<style scoped>
.page {
  width: 600px;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.uploader-wrapper {
  box-sizing: border-box;
  width: 600px;
  height: 300px;
  padding: 30px 20px;
  background-color: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-shadow: inset 0 3px 6px rgb(0 0 0 / 5%);
}

.uploader-content {
  height: 100%;
  text-align: center;
  background: url('../assets/image.png') no-repeat;
  background-position: center 40px;
  border: 3px dashed #e6e6e6;
  border-radius: 4px;
  transition: all 0.3s;
}

.uploader-content.active {
  border-color: #74b51c;
}

.uploader-input {
  display: none;
  margin-top: 130px;
}

.uploader-btn {
  margin-top: 130px;
  padding: 8px 16px;
  color: #fff;
  font-size: 16px;
  background: #00b7ee;
  border: 0;
  border-radius: 3px;
  outline: none;
  box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
  cursor: pointer;
}

.uploader-tips {
  text-align: center;
}
</style>
