import { ComItem } from "@/types";
import { Component, defineAsyncComponent } from "vue";
export function getComLibs(): Map<string, ComItem> {
  // @ts-ignore
  const modulesFiles = import.meta.glob("./**");
  const comLibs: Map<string, ComItem> = new Map();

  Object.keys(modulesFiles).forEach((key) => {
    const execArr = /([^\/]*)\/([^\/]*)\..*/.exec(key);
    if (execArr) {
      const [, type, comName] = execArr;
      if (!comLibs.has(type)) {
        comLibs.set(type, { type } as ComItem);
      }
      const comItem = comLibs.get(type);
      if (/Index/.test(comName)) {
        comItem.component = defineAsyncComponent(modulesFiles[key]);
      } else if (/Config/.test(comName)) {
        comItem.configComponent = defineAsyncComponent(modulesFiles[key]);
      } else if (/Props/.test(comName)) {
        comItem.getProps =  modulesFiles[key]
      }
    }
  });

  return comLibs;
}
