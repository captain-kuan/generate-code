<template>
    <van-field :model-value="modelValue" is-link readonly label="城市" placeholder="选择城市" @click="showPicker = true" />
    <van-popup v-model:show="showPicker" round position="right">
        <van-picker class="w-20" :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: any, columns: { text: any, value: any }[] }>()
const emits = defineEmits<{ (event: "update:modelValue", value: any): void }>()
const showPicker = ref(false)

function onConfirm(e) {
    emits("update:modelValue", e)
}
</script>

<style scoped></style>