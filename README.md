# 前端工程化学习仓库

《前端工程化开发》课程学习仓库：从工具链认知到 Vue 3 核心基础的练习集合。
按课程仓库规范组织：`module-XX-主题 / unit-XX-主题 / 练习工程` 分层，编号 + kebab-case 命名。

## 目录结构

```
first_one/
├── docs/                          课程资料（任务清单等）
├── module-01-toolchain/           模块一 · 工程化认知与工具链
│   └── unit-02-package-vite/      单元 2 · 依赖与 Vite 脚手架
│       ├── vite-scaffold-npm/     npm 方式初始化的脚手架对照样本
│       └── vite-scaffold-pnpm/    pnpm 方式初始化的脚手架对照样本
└── module-02-vue-core/            模块二 · Vue 3 核心基础
    ├── unit-04-getting-started/   单元 4 · CDN 入门练习
    ├── unit-05-score-board/       单元 5 · 成绩单界面作业
    └── practice-app/              青柠圈 · 指令综合练习
```

## 练习导航

| 练习 | 位置 | 内容 | 运行方式 |
| --- | --- | --- | --- |
| 字面量入门 | `module-02-vue-core/unit-04-getting-started/literal.html` | CDN 引入 Vue，插值表达式与事件绑定 | 浏览器直接打开 |
| 自我介绍页 | `module-02-vue-core/unit-04-getting-started/intro.html` | computed、v-for 列表、v-bind | 浏览器直接打开 |
| 脚手架对照（npm） | `module-01-toolchain/unit-02-package-vite/vite-scaffold-npm/` | Vite 脚手架原始工程，认知工程结构与依赖 | `npm install && npm run dev` |
| 脚手架对照（pnpm） | `module-01-toolchain/unit-02-package-vite/vite-scaffold-pnpm/` | 同上，pnpm 方式 | `pnpm install && pnpm dev` |
| 成绩单界面作业 | `module-02-vue-core/unit-05-score-board/` | 条件渲染多视图切换、筛选、详情对话框 | `pnpm install && pnpm dev` |
| 青柠圈 | `module-02-vue-core/practice-app/` | 内置指令与自定义指令综合练习 | `pnpm install && pnpm dev` |

## 技术栈

- Vue 3（`<script setup>` 组合式 API）
- Vite
- Element Plus
- 包管理器统一使用 pnpm

## 约定

- 提交信息遵循 Conventional Commits：`type(u单元号): 中文描述`，type 限 feat / fix / docs / style / refactor / chore / test
- 目录命名使用「编号 + kebab-case」（如 `unit-04-getting-started`），组件文件使用 PascalCase
- 各子工程独立安装依赖、独立运行，均附 README 说明运行方式
