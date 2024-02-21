<template>
  <div class="preview flex justify-center items-center w-full">
    <div class="bg-white h-48 w-24 shadow-lg">
      <preview-tool v-for="component in components" :key="component.uid" @click="selectComponent(component)"
        :isSelected="curComponent === component.uid" :component="component">
        <component :is="getComponent(component)" v-bind="component">
        </component>
      </preview-tool>
    </div>

  </div>
</template>

<script setup lang="ts">
import PreviewTool from "@/components/common/PreviewTool.vue";
import { ComInsConfig, MessageEvent, Message } from "@/types"
import { getComLibs } from '@/components/lib';

const components = reactive<ComInsConfig[]>([]);

function addComponent(component: ComInsConfig) {
  component.order = components.length
  components.push(component)
  selectComponent(component)
}

function updateComponent(component: ComInsConfig) {
  const com = components.find(item => item.uid === component.uid)
  Object.assign(com, component)
}

const eventHandler = {
  addComponent,
  updateComponent
}

window.addEventListener("message", (event: any) => {
  const message: Message = event.data
  eventHandler[message.messageType](message.data)
})

const comLibs = getComLibs()
function getComponent(component: ComInsConfig) {
  return comLibs.get(component.comType).component
}

const curComponent = ref("")
function selectComponent(component: ComInsConfig) {
  curComponent.value = component.uid
  const message: Message = { messageType: MessageEvent.selectComponent, data: toRaw(component) }
  window.parent.postMessage(message)
}
</script>

<style scoped>
.preview {
  height: 100vh;
  background: #f7f8fa;
}
</style>