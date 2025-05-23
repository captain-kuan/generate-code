<template>
  <van-swipe :autoplay="1000" v-bind="$attrs">
    <van-swipe-item v-for="image in imagesList" :key="image">
      <div
        class="flex justify-center items-center"
        style="height: 100px"
        :style="{ backgroundColor: image }"
      >
        {{ image }}
      </div>
    </van-swipe-item>
  </van-swipe>
</template>

<script setup lang="ts">
import type { UploadProps, UploadUserFile } from "element-plus";
const props = defineProps<{ images: string }>();
const imagesList = computed(() => {
  return props.images?.split(",");
});
</script>

<style scoped>
.van-swipe-item {
  background-color: #f5f5f5;
  min-height: 100px;
}
</style>
