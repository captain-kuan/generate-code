<template>
    <el-form label-position="top">
        <el-form-item label="添加图片">
            <el-upload v-model:file-list="config.images" list-type="picture-card" :http-request="upload"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
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

const props = defineProps<{ config: ComInsConfig & SwipeProps & { images: UploadUserFile[] } }>()
import { resolve } from "path";
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
}
function upload(e) {
    return Promise.resolve({})
}
const handleSuccess: UploadProps['onSuccess'] = (response,
    uploadFile) => {
    props.config.images.push({ url: URL.createObjectURL(uploadFile.raw!) })
}
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
</script>

<style scoped></style>