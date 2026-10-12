<script setup>
import { ref } from "vue";
import { posts, role } from "../store.js";
import { photos } from "../data.js";

// 发布框：用 v-show 折叠，折起来再展开草稿还在（元素没被销毁）
const editorOpen = ref(false);
const draft = ref("");
const draftPhoto = ref("");

// 发布：新动态插到列表最前面
function publish() {
  const text = draft.value.trim();
  if (text === "") {
    return;
  }
  posts.value.unshift({
    id: Date.now(),
    author: "李明",
    color: "#409eff",
    time: "刚刚",
    text: text,
    photo: draftPhoto.value,
    likes: 0,
    liked: false,
    comments: [],
  });
  draft.value = "";
  draftPhoto.value = "";
  editorOpen.value = false;
}

// Esc 清空草稿
function clearDraft() {
  draft.value = "";
  draftPhoto.value = "";
}
</script>

<template>
  <div class="card editor">
    <div class="editor__head">
      <span>有什么新鲜事？</span>
      <el-button size="small" @click="editorOpen = !editorOpen">
        {{ editorOpen ? "收起" : "写动态" }}
      </el-button>
    </div>

    <div v-show="editorOpen" class="editor__body">
      <!-- 访客没登录：这里只显示一句提示，输入表单整个不渲染 -->
      <el-alert
        v-if="role === 'guest'"
        class="editor__login"
        type="info"
        :closable="false"
        show-icon
        title="登录后即可发布动态"
      />

      <div v-else class="editor__form">
        <!-- .trim 自动去掉首尾空格，提交的永远是干净内容 -->
        <el-input
          v-model.trim="draft"
          type="textarea"
          :rows="3"
          placeholder="分享此刻的想法…（按 Esc 清空草稿）"
          @keyup.esc="clearDraft"
        />

        <div class="editor__photos">
          <el-radio-group v-model="draftPhoto">
            <el-radio value="">不配图</el-radio>
            <el-radio v-for="p in photos" :key="p" :value="p">
              <img class="editor__photo-option" :src="p" :alt="p" />
            </el-radio>
          </el-radio-group>
        </div>

        <!-- 表单提交会刷新页面，.prevent 阻止默认行为；内容为空时按钮整个禁用 -->
        <form class="editor__submit" @submit.prevent="publish">
          <el-button
            type="primary"
            native-type="submit"
            :disabled="draft.trim() === ''"
            >发布</el-button
          >
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor {
  padding: 16px;
  margin-bottom: 14px;
}

.editor__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.editor__body {
  margin-top: 12px;
}

.editor__login {
  margin-top: 4px;
}

.editor__photos {
  margin-top: 12px;
}

.editor__photo-option {
  height: 36px;
  border-radius: 6px;
  vertical-align: middle;
}

.editor__submit {
  margin-top: 12px;
  text-align: right;
}
</style>
