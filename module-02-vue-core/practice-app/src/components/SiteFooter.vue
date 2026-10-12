<script setup>
import { footer } from "../data.js";

const slogan = "青柠圈 · 让校园生活有迹可循";
</script>

<template>
  <footer class="footer">
    <!-- v-once：页脚整块只渲染一次，备案号、客服电话这些内容不会变 -->
    <div v-once class="footer__inner">
      <div class="footer__slogan" v-text="slogan"></div>
      <div class="footer__line">{{ footer.company }}</div>
      <div class="footer__line">
        客服电话 {{ footer.service }} · {{ footer.icp }}
      </div>
      <div class="footer__line">© {{ footer.since }} - 2026 保留所有权利</div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 24px;
  padding: 20px;
  background: #fff;
  border-top: 1px solid #e4e7ed;
  text-align: center;
}

.footer__slogan {
  font-size: 14px;
  font-weight: 600;
  color: #409eff;
  margin-bottom: 8px;
}

.footer__line {
  font-size: 12px;
  line-height: 1.9;
  color: #909399;
}
</style>
