<template>
    <el-form label-position="top">
        <el-form-item label="添加图片">
            <el-button @click="add">add</el-button>
        </el-form-item>
        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </el-form>
</template>

<script setup lang="ts">
import { ComInsConfig } from "@/types"
import { SwipeProps } from 'vant';
import type { UploadProps, UploadUserFile } from 'element-plus'

const props = defineProps<{ config: ComInsConfig & SwipeProps & { images: string } }>()
import { resolve } from "path";
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
}
function upload(e) {
    return Promise.resolve({})
}
function add(){
    const images =props.config.images? props.config.images.split(","):[]
    images.push("#"+(~~(Math.random()*(2<<23))).toString(16))
    props.config.images= images.join(",")
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
</script>

<style scoped></style>