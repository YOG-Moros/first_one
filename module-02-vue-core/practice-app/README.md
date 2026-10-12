# 青柠圈 · 指令综合练习

模块二的指令综合练习工程：一个校园朋友动态广场界面，集中演示 Vue 3 常用指令。

## 练习内容

- 条件渲染：v-if / v-else-if / v-else（身份横幅）、v-show（发布框折叠，与 v-if 对比——草稿内容保留）
- 列表渲染：v-for + :key + v-memo（依赖数组控制动态流的更新粒度）
- 表单绑定：v-model 及 .trim / .number / .lazy 修饰符（闲置发布表单）
- 其他内置指令：v-once（页脚、加入日期）、v-pre（代码帖）、v-html（公告）、v-text（个性签名）
- 自定义指令：v-focus（自动聚焦）、v-digits（仅允许输入数字）、v-highlight（搜索关键词高亮）
- 事件处理：@keyup.esc、@submit.prevent、@click.once、.stop 阻止冒泡
- 组件化：三栏布局拆分为 SiteHeader / ProfileSidebar / PublishBox / FeedList / TradeSection / SiteFooter

## 运行方式

```bash
pnpm install
pnpm dev
```
