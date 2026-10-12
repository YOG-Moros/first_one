// 跨组件共享的响应式数据：多个组件 import 到的是同一个 ref，
// 一个组件改动，另一个组件的界面跟着更新
import { ref } from "vue";
import { initialPosts } from "./data.js";

// 深拷贝一份初始数据，避免组件里的增删改污染 data.js 里的原数组
export const posts = ref(
  initialPosts.map((item) => ({
    ...item,
    comments: item.comments.map((c) => ({ ...c })),
  })),
);

// 当前登录身份：顶栏的横幅、动态的删除权限都跟着它变
export const role = ref("member");
