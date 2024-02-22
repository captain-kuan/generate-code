<template>
    <el-form label-position="top">
        <el-form-item label="左侧标题">
            <el-input v-model="config.title" placeholder="请输入左侧标题" />
        </el-form-item>
        <el-form-item label="右侧内容">
            <el-input v-model="config.value" placeholder="请输入右侧内容" />
        </el-form-item>
        <el-form-item label="描述信息">
            <el-input v-model="config.label" placeholder="请输入描述信息" />
        </el-form-item>
        <el-form-item label="开启点击反馈">
            <el-switch v-model="config.isLink"  />
        </el-form-item>
        <el-form-item label="跳转链接">
            <el-input v-model="config.url" placeholder="请输入跳转链接"   />
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ComInsConfig } from "@/types"
import { CellProps } from "vant"
const props = defineProps<{ config: ComInsConfig & CellProps }>()
</script>

<style scoped></style>