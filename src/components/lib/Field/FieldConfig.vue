<template>
    <el-form label-position="top">
        <el-form-item label="左侧文本">
            <el-input v-model="config.label"></el-input>
        </el-form-item>
        <el-form-item label="类型">
            <el-select v-model="config.type">
                <el-option v-for="opt in fieldTypeOptions" :key="opt.value" :label="opt.text" :value="opt.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="输入框占位提示文字">
            <el-input v-model="config.placeholder"> </el-input>
        </el-form-item>
        <el-form-item label="是否必填">
            <el-switch v-model="config.required"> </el-switch>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ComInsConfig } from "@/types"
import { FieldType, FieldProps } from 'vant';

const props = defineProps<{ config: ComInsConfig & FieldProps }>()
const fieldTypeOptions: { text: FieldType, value: FieldType }[] = [
    { text: "tel", value: "tel" },
    { text: 'url', value: 'url' },
    { text: 'date', value: 'date' },
    { text: 'file', value: 'file' },
    { text: 'text', value: 'text' },
    { text: 'time', value: 'time' },
    { text: 'week', value: 'week' },
    { text: 'color', value: 'color' },
    { text: 'digit', value: 'digit' },
    { text: 'email', value: 'email' },
    { text: 'image', value: 'image' },
    { text: 'month', value: 'month' },
    { text: 'radio', value: 'radio' },
    { text: 'range', value: 'range' },
    { text: 'reset', value: 'reset' },
    { text: 'button', value: 'button' },
    { text: 'hidden', value: 'hidden' },
    { text: 'number', value: 'number' },
    { text: 'search', value: 'search' },
    { text: 'submit', value: 'submit' },
    { text: 'checkbox', value: 'checkbox' },
    { text: 'password', value: 'password' },
    { text: 'textarea', value: 'textarea' },
    { text: 'datetime-local', value: 'datetime-local' }
]
</script>

<style scoped></style>