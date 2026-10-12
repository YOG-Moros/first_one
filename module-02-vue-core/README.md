# 模块二 · Vue 3 核心基础

12 学时 · 第 4-6 周 · 单元 4-6

从操作 DOM 转向描述状态。三个单元分别处理模板与响应式、计算与渲染控制、交互与表单，每节课都有可交互的页面产出。

> 当前进度：单元 4（CDN 入门两页）、单元 5（成绩单界面作业）已完成；practice-app（青柠圈指令综合练习）开发中；单元 6 随课程进度补充。

## 单元

| 单元 | 主题 | 位置 | 课堂产出 |
| --- | --- | --- | --- |
| 4 | 模板语法与响应式基础 | `unit-04-getting-started/` | CDN 字面量入门页、自我介绍页 |
| 5 | 计算属性、侦听器与渲染控制 | `unit-05-score-board/` | 成绩单多视图界面（条件渲染、筛选排序） |
| 6 | 用户交互与表单绑定 | （待补充） | 多步预订表单、Markdown 编辑器 |

## 目录约定

```
module-02-vue-core/
├── unit-04-getting-started/        单元 4 · CDN 入门练习（浏览器直接打开）
│   ├── literal.html                字面量入门对照页（CDN 引入 Vue，独立打开）
│   └── intro.html                  自我介绍页
├── unit-05-score-board/            单元 5 · 成绩单界面作业（Vite + Element Plus）
└── practice-app/                   青柠圈 · 指令综合练习（开发中）
    ├── src/
    │   ├── components/             三栏布局拆分的六个组件
    │   ├── directives.js           v-focus / v-digits / v-highlight 自定义指令
    │   ├── store.js                跨组件共享状态（posts、role）
    │   ├── data.js                 静态数据
    │   ├── App.vue                 三栏布局组装
    │   └── main.js
    └── package.json
```

## 跑起来

```bash
# 单元 5 · 成绩单界面作业
cd unit-05-score-board
pnpm install
pnpm dev

# 青柠圈 · 指令综合练习
cd practice-app
pnpm install
pnpm dev
```

单元 4 的两个页面是 CDN 方式，浏览器直接打开即可。

## 常见错误的定位方向

课堂上会集中复现这几类问题，代码里保留了复现入口：

- 改了数据界面不动：检查状态是否用 ref / reactive 声明，是否在 reactive 对象上整体替换。
- 列表渲染顺序错乱：检查 key 是否用了索引。
- 属性被解构后失去响应性：改用 `toRefs` 或直接访问。
- 事件监听不到：检查事件名在模板中的书写形式。
