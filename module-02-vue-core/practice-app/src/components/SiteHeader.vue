<script setup>
import { role } from "../store.js";

// 后台返回的待办数量，会员横幅里会用到
const todoCount = 2;
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__brand">
        <span class="header__logo">🍋</span>
        <span class="header__name">青柠圈</span>
        <span class="header__slogan">校园朋友的动态广场</span>
      </div>

      <nav class="header__nav">
        <a href="#feed">动态</a>
        <a href="#trade">闲置</a>
        <a href="#profile">我的</a>
      </nav>

      <div class="header__role">
        <span class="header__role-label">身份：</span>
        <el-radio-group v-model="role" size="small">
          <el-radio-button value="guest">访客</el-radio-button>
          <el-radio-button value="member">会员</el-radio-button>
          <el-radio-button value="admin">管理员</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <!-- 一条完整的判断链：v-if 开头，v-else-if 递进，v-else 兜底，三块互斥 -->
    <div v-if="role === 'guest'" class="banner banner--guest">
      <span class="banner__title">你还没有登录</span>
      <span>登录后才能发布动态、评论和发布闲置，先逛逛吧。</span>
    </div>

    <div v-else-if="role === 'member'" class="banner banner--member">
      <span class="banner__title">欢迎回来，李明</span>
      <span>你有 {{ todoCount }} 条新回复，去看看朋友们在聊什么。</span>
    </div>

    <div v-else class="banner banner--admin">
      <span class="banner__title">管理员模式</span>
      <span>可以删除违规动态、封禁账号、导出社区运营数据。</span>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
}

.header__inner {
  display: flex;
  align-items: center;
  gap: 24px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 14px 20px;
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__logo {
  font-size: 22px;
}

.header__name {
  font-size: 18px;
  font-weight: 700;
  color: #409eff;
}

.header__slogan {
  font-size: 13px;
  color: #909399;
}

.header__nav {
  display: flex;
  gap: 20px;
  flex: 1;
}

.header__nav a {
  font-size: 14px;
  color: #606266;
  text-decoration: none;
}

.header__nav a:hover {
  color: #409eff;
}

.header__role {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__role-label {
  font-size: 13px;
  color: #909399;
}

.banner {
  display: flex;
  align-items: baseline;
  gap: 12px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 10px 20px 12px;
  font-size: 14px;
  border-bottom: 1px solid #ebeef5;
}

.banner__title {
  font-weight: 600;
}

.banner--guest {
  color: #606266;
  background: #f4f4f5;
  border-bottom-color: #e4e7ed;
}

.banner--member {
  color: #1f6feb;
  background: #ecf5ff;
  border-bottom-color: #d9ecff;
}

.banner--admin {
  color: #a06a12;
  background: #fdf6ec;
  border-bottom-color: #faecd8;
}
</style>
