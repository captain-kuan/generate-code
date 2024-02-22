<template>
  <div class="preview py-2 flex justify-center items-center w-full">
    <div class="bg-white min-h-48 w-24 shadow-lg">
      <vue-draggable ref="el" v-model="components" @update="updateOrder">
        <preview-tool v-for="component in components" :key="component.uid" @up="upComponent" @down="downComponent"
          @delete="deleteComponent" @select="selectComponent(component)" :isSelected="curComponentUid === component.uid"
          :component="component">
          <component :is="getComponent(component)" v-bind="component" />
        </preview-tool>
      </vue-draggable>
    </div>

  </div>
</template>

<script setup lang="ts">
import PreviewTool from "@/components/common/PreviewTool.vue";
import { ComInsConfig, MessageEvent, Message } from "@/types"
import { getComLibs } from '@/components/lib';
import { VueDraggable } from 'vue-draggable-plus'

const components = ref<ComInsConfig[]>([]);
const curComponentUid = ref("")

function selectComponent(component?: ComInsConfig) {
  curComponentUid.value = component?.uid
  const message: Message = { messageType: MessageEvent.selectComponent, data: toRaw(component) }
  window.parent.postMessage(message)
}

function addComponent(component: ComInsConfig) {
  component.order = components.value.length
  components.value.push(component)
  selectComponent(component)
}

function updateComponent(component: ComInsConfig) {
  if (component == null) return
  const com = components.value.find(item => item.uid === component?.uid)
  Object.assign(com, component)
}
function deleteComponent(component: ComInsConfig) {
  const index = components.value.findIndex(item => item.uid === component.uid)
  components.value.splice(index, 1)
  updateOrder()
  selectComponent(toRaw(components.value[index - 1]))
}

function upComponent(com: ComInsConfig) {
  if (com.order === 0) return
  const last = components.value[com.order - 1]
  components.value[com.order - 1] = com
  components.value[com.order] = last
  last.order = com.order
  com.order = com.order - 1
}
function downComponent(com: ComInsConfig) {
  if (com.order === components.value.length - 1) return
  const next = components.value[com.order + 1]
  components.value[com.order + 1] = com
  components.value[com.order] = next
  next.order = com.order
  com.order = com.order + 1
}

function updateOrder() {
  components.value.forEach((com, index) => { com.order = index })
}

const eventHandler = {
  addComponent,
  updateComponent,
  deleteComponent
}

window.addEventListener("message", (event: any) => {
  const message: Message = event.data
  eventHandler[message.messageType](message.data)
})

const comLibs = getComLibs()
function getComponent(component: ComInsConfig) {
  return comLibs.get(component.comType).component
}


</script>

<style scoped>
.preview {
  background: #f7f8fa;
  min-height: 100vh;
}
</style>