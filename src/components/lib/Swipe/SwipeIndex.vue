<template>
    <van-swipe v-bind="$attrs">
        <van-swipe-item v-for="image in images" :key="image.url">
            <img :src="image.url" alt="" />
        </van-swipe-item>
    </van-swipe>
</template>

<script setup lang="ts">
import type { UploadProps, UploadUserFile } from 'element-plus'
const props = defineProps<{ images: UploadUserFile[] }>()
</script>

<style scoped></style>