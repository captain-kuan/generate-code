<template>
  <div class="w-full h-screen flex flex-col">
    <header class="py-1 px-2 shadow flex items-center justify-between">
      <div class="">正在编辑</div>
      <div>
        <el-button type="info">预览</el-button>
        <el-button type="success">发布</el-button>
      </div>
    </header>
    <main class="flex-1 flex">
      <div class="w-20 grid grid-cols-3 grid-rows-8">
        <div
          class="flex flex-col content-center items-center p-1 hover:bg-blue-500 hover:text-white cursor-pointer"
          v-for="com in comList"
          draggable="true"
          :key="com.comTag"
          @drag="handleDrag"
          @click="addComponent(com)"
        >
          <van-icon size="30" :name="com.comIcon" />
          <span style="font-size: 12px; margin-top: 10px">{{
            com.comName
          }}</span>
        </div>
      </div>
      <div class="flex-1" @dragover="handleDragover">
        <iframe class="w-full h-full" title="预览" ref="preview" src="/preview"></iframe>
      </div>
      <div class="w-20 p-1">
        <component
          v-if="curComponent"
          :is="curConfigCom"
          :config="curComponent"
        ></component>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { MessageEvent, ComInsConfig, ComConfig, Message } from "@/types";
import { getComLibs } from "@/components/lib";
import { nanoid } from "nanoid";

const comLibs = getComLibs();
const loading = ref(false);
const comList = ref<ComConfig[]>([]);
function init() {
  loading.value = true;
  return Promise.all(
    Array.from(comLibs.keys()).map((key) => comLibs.get(key).getProps())
  )
    .then((coms) => {
      comList.value = coms.map((com) => ({ ...com }));
    })
    .finally(() => {
      loading.value = false;
    });
}
init();
const preview = ref();

function addComponent(com: ComConfig) {
  const data: ComInsConfig = {
    ...(com.defaultConfig || {}),
    comTag: com.comTag,
    comType: com.comType,
    order: -1,
  };
  data.uid = nanoid();
  preview.value.contentWindow.postMessage({
    messageType: MessageEvent.addComponent,
    data,
  });
}
function updateComponent(data: ComInsConfig) {
  preview.value.contentWindow.postMessage({
    messageType: MessageEvent.updateComponent,
    data,
  });
}
const curComponent = ref<ComInsConfig>();
const curConfigCom = computed(() => {
  return comLibs.get(curComponent.value.comTag).configComponent;
});

function handleDrag(e) {
}
function handleDragover(e) {
  console.log(e);

  e.preventDefault();
}
watch(
  curComponent,
  (curData, preDate) => {
    updateComponent(toRaw(curData));
  },
  { deep: true }
);

window.addEventListener("message", (event: any) => {
  const message: Message = event.data;
  if (event.origin !== window.origin) return;
  switch (message.messageType) {
    case MessageEvent.selectComponent: {
      curComponent.value = message.data;
      break;
    }
  }
});
</script>

<style lang="scss" scoped></style>
