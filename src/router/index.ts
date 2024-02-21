import { createRouter, createWebHistory } from "vue-router";
import ContentVue from "@/views/Content.vue";
import PreviewVue from "@/views/Preview.vue";
const router = createRouter({
  routes: [
    {
      path: "/",
      component: ContentVue,
    },
    {
      path:"/preview",
      component:PreviewVue
    }
  ],
  history: createWebHistory(),
});


export default router;
