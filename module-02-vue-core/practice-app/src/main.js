import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "./style.css";
import { vFocus, vDigits, vHighlight } from "./directives.js";

const app = createApp(App);

app.use(ElementPlus);

// 全局注册自定义指令：任何组件里都能直接用 v-focus、v-digits、v-highlight
app.directive("focus", vFocus);
app.directive("digits", vDigits);
app.directive("highlight", vHighlight);

app.mount("#app");
