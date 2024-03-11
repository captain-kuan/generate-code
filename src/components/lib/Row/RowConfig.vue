
<template>
    <el-form label-position="top">
        <el-form-item label="间距">
            <el-input v-model="config.gutter" placeholder="请输入左侧标题" />
        </el-form-item>
        <el-form-item label="主轴对齐方式">
            <el-input v-model="config.justify" placeholder="请输入右侧内容" />
        </el-form-item>
        <el-form-item label="交叉轴对齐方式">
            <el-input v-model="config.align" placeholder="请输入描述信息" />
        </el-form-item>
        <el-form-item label="是否自动换行">
            <el-switch v-model="config.wrap"  />
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ComInsConfig } from "@/types"
import { RowProps } from "vant"
const props = defineProps<{ config: ComInsConfig & RowProps&{gutter:number} }>()
</script>

<style scoped></style>