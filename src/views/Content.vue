<template>
    <div class="flex w-full h-screen">
        <div class="w-20 grid grid-cols-3 grid-rows-9">
            <div class="flex flex-col content-center items-center p-1 hover:bg-blue-500 hover:text-white"
                v-for="com in comList" :key="com.comType" @click="addComponent(com)">
                <van-icon size="30" :name="com.comIcon" />
                <span style="font-size: 12px;margin-top: 10px;">{{ com.comName }}</span>
            </div>
        </div>
        <iframe ref="preview" class="flex-1" src="/preview"></iframe>
        <div class="w-20">
            <component v-if="curComponent" :is="curConfigCom" :config="curComponent"></component>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { MessageEvent, ComInsConfig, ComConfig, Message } from "@/types"
import { getComLibs } from "@/components/lib"
import { nanoid } from 'nanoid'

const comLibs = getComLibs()
const loading = ref(false)
const comList = ref<ComConfig[]>([])
function init() {
    loading.value = true
    return Promise.all(
        Array.from(comLibs.keys()).map(key => comLibs.get(key).getProps())
    )
        .then(coms => {
            comList.value = coms.map(com => ({ ...com }))
        }).finally(() => {
            loading.value = false
        })
}
init()
const preview = ref()

function addComponent(com: ComConfig) {
    const data: ComInsConfig = {
        ...com,
        comType: com.comType,
        order: -1
    }
    data.uid = nanoid()
    preview.value.contentWindow.postMessage({ messageType: MessageEvent.addComponent, data },)
}
function updateComponent(data: ComInsConfig) {
    preview.value.contentWindow.postMessage({ messageType: MessageEvent.updateComponent, data },)
}
const curComponent = ref<ComInsConfig>()
const curConfigCom = computed(() => {
    return comLibs.get(curComponent.value.comType).configComponent
})
watch(curComponent, (comData) => {
    updateComponent(toRaw(comData))
}, { deep: true })

window.addEventListener("message", (event: any) => {
    const message: Message = event.data
    if (event.origin !== window.origin) return
    switch (message.messageType) {
        case MessageEvent.selectComponent: {
            curComponent.value = message.data
            break;
        }

    }
})
</script>

<style lang="scss" scoped></style>