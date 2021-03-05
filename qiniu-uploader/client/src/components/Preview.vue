<template>
  <div class="preview-wrapper">
    <img
      v-for="(item, index) in previewList"
      :key="index"
      class="pic"
      :src="item.url"
      :alt="item.name"
    />
  </div>
</template>

<script>
export default {
  name: 'Preview',
  props: {
    previewList: {
      type: Array,
    },
  },
}
</script>

<style scoped>
.preview-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.preview-wrapper .pic {
  box-sizing: border-box;
  width: 112px;
  height: 112px;
  margin-top: 10px;
  margin-right: 10px;
  object-fit: contain;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}

.preview-wrapper .pic:nth-child(5n) {
  margin-right: 0;
}
</style>
