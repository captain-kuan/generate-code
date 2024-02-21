import { Component } from "vue";
export interface ComConfig {
  comType: string;
  comIcon: string;
  comName: string;
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
  comType: string;
  order: number;
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
