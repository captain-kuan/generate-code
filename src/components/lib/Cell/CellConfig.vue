<template>
    <div>
        <van-field v-model="config.title" label="标题" placeholder="请输入标题" />
        <van-field v-model="config.value" label="内容" placeholder="请输入内容" />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { ComInsConfig } from "@/types"
const props = defineProps<{ config: ComInsConfig & { title: string, value: string } }>()
</script>

<style scoped></style>