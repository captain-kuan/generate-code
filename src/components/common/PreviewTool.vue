<template>
    <div class="relative" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <div v-show="showTool" class=" absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-1">
            <div class="tip-tag from-stone-500 bg-white rounded-sm">
                {{ component.order + 1 }} {{ comProps?.comName }}
            </div>
        </div>
        <div class="border-2" @click="handleEvent('select', component)" :class="[componentStyle]">
            <slot></slot>
        </div>
        <div v-if="isSelected" class=" absolute right-0 top-0  translate-y-1/2 translate-x-full">
            <div class="flex flex-col tool-list">
                <div v-for="tool in tools" :key="tool.event" class="bg-white tool-item"
                    @click="handleEvent(tool.event, component)">
                    <van-icon :name="tool.icon"></van-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ComInsConfig, ComConfig } from '@/types';
import { getComLibs } from "@/components/lib"
type EventName = 'up' | 'down' | "delete" | 'select'
type Emit = {
    (event: EventName, com: ComInsConfig): void
}
const emits = defineEmits<Emit>()

const tools: { event: EventName, icon: string }[] = [
    {
        event: 'up',
        icon: "arrow-up"
    },
    {
        event: "down",
        icon: "arrow-down"
    },
    {
        event: "delete",
        icon: "delete-o"
    },
]

function handleEvent(event: EventName, com: ComInsConfig) {
    emits(event, com)
}

const props = defineProps<{ isSelected: boolean, component: ComInsConfig }>()

const comLibs = getComLibs()
const comProps = ref<ComConfig>()

onMounted(async () => {
    comProps.value = await comLibs.get(props.component.comTag).getProps()
})

const componentStyle = computed(() => {
    return props.isSelected
        ? 'border-blue-600 border-solid  hover:border-solid'
        : 'border-transparent hover:border-dashed hover:border-blue-600 '
})
const isHovered = ref(false)
const showTool = computed(() => {
    return props.isSelected || isHovered.value
})

</script>

<style scoped>
.tip-tag {
    padding: 2px 10px;
    font-size: 12px;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        border: transparent solid 5px;
        border-left-color: white;
        right: 0;
        top: 50%;
        transform: translate(100%, -50%);
    }
}

.tool-list {
    margin-left: 10px;
    border-radius: 10px;
    overflow: hidden;

    .tool-item {
        padding: 2px 5px;
        border-bottom: solid #eee .5px;

        &:last-child {
            border: none;
        }
    }
}
</style>