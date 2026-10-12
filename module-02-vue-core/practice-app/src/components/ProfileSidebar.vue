<script setup>
import { ref } from "vue";
import { user, themes, noticeHtml } from "../data.js";

// 皮肤主题：切换后靠 :style 改变个人卡片的主色
const themeIndex = ref(0);

// 签到：.once 修饰符保证一天只能点一次
const signed = ref(false);

function signIn() {
  signed.value = true;
}
</script>

<template>
  <aside id="profile" class="side">
    <!-- 个人卡片：CSS 变量驱动整张卡片的主色，换肤只需改一个值 -->
    <div
      class="card profile"
      :style="{ '--main-color': themes[themeIndex].color }"
    >
      <div class="profile__head">
        <span class="profile__avatar">{{ user.name[0] }}</span>
        <div class="profile__info">
          <div class="profile__name">
            {{ user.name }}
            <!-- 数组语法：三元决定徽章样式，积分高显示「活跃」 -->
            <span
              :class="[
                'profile__badge',
                user.points > 2000 ? 'profile__badge--on' : '',
              ]"
            >
              {{ user.points > 2000 ? "活跃用户" : "新朋友" }}
            </span>
          </div>
          <!-- v-text 展示个性签名：会把元素原有内容整个覆盖 -->
          <div class="profile__sign" v-text="user.signature"></div>
        </div>
      </div>

      <div class="profile__meta">
        <!-- v-once：加入日期这类永远不会变的信息只渲染一次 -->
        <div v-once class="profile__joined">
          积分 {{ user.points }} · {{ user.joinedAt }} 加入
        </div>
        <div class="profile__themes">
          <el-radio-group v-model="themeIndex" size="small">
            <el-radio-button
              v-for="(t, i) in themes"
              :key="t.label"
              :value="i"
            >
              {{ t.label }}
            </el-radio-button>
          </el-radio-group>
        </div>
        <!-- 签到只能点一次，点完按钮整个禁用（disabled 属性被移除/添加） -->
        <el-button
          type="primary"
          size="small"
          class="profile__sign-btn"
          :disabled="signed"
          @click.once="signIn"
        >
          {{ signed ? "今日已签到 ✓" : "每日签到 +5 积分" }}
        </el-button>
      </div>
    </div>

    <!-- 公告栏：后台返回的富文本，用 v-html 解析成真正的元素 -->
    <div class="card notice">
      <div class="notice__head">📢 圈内公告</div>
      <div class="notice__body" v-html="noticeHtml"></div>
    </div>
  </aside>
</template>

<style scoped>
.profile {
  --main-color: #409eff;
  padding: 16px;
}

.profile__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--main-color);
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile__name {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.profile__badge {
  margin-left: 6px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 400;
  border-radius: 10px;
  color: #909399;
  background: #f4f4f5;
}

.profile__badge--on {
  color: #fff;
  background: var(--main-color);
}

.profile__sign {
  margin-top: 4px;
  font-size: 13px;
  color: #909399;
}

.profile__meta {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #ebeef5;
}

.profile__joined {
  font-size: 12px;
  color: #909399;
  margin-bottom: 10px;
}

.profile__themes {
  margin-bottom: 10px;
}

.profile__sign-btn {
  width: 100%;
}

.notice {
  padding: 16px;
}

.notice__head {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.notice__body {
  font-size: 13px;
  line-height: 1.8;
  color: #606266;
}
</style>
