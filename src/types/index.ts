import { Component } from "vue";
export interface ComConfig {
  comTag: string;
  comType:"Layout";
  comIcon: string;
  comName: string;
  defaultConfig:Record<any,any>
}
export interface ComItem {
  type: string;
  getProps: () => Promise<ComConfig>;
  component: () => Promise<Component>;
  configComponent: () => Promise<Component>;
}
/**
 * @description 组件实例
 */
export interface ComInsConfig {
  uid?: string;
  comTag: string;
  comType?:"Layout";
  order: number;
  children?:ComInsConfig[];
}

export enum MessageEvent {
  addComponent = "addComponent",
  updateComponent = "updateComponent",
  selectComponent = "selectComponent",
}

export interface Message {
  messageType: MessageEvent;
  data: any;
}
