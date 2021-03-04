<template>
  <div class="page">
    <h1 class="title">使用七牛云上传文件</h1>

    <div id="uploader" class="uploader-wrapper">
      <div class="uploader-content">
        <input class="uploader-input" type="file" />
        <button class="uploader-btn">点击选择照片</button>
        <p class="tips">您可以点击上面的按钮，也可以将图片拖放或粘贴到这里</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Uploader',
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
  box-shadow: inset 0 3px 6px rgb(0 0 0 / 5%);
}

.uploader-content {
  height: 100%;
  text-align: center;
  background: url('../assets/image.png') no-repeat;
  background-position: center 40px;
  border: 3px dashed #e6e6e6;
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

.tips {
  text-align: center;
}
</style>
