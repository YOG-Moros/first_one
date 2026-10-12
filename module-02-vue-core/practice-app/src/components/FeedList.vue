<script setup>
import { ref } from "vue";
import { posts, role } from "../store.js";
import { user } from "../data.js";

// 搜索关键词：v-highlight 指令按它给命中的动态加底色
const keyword = ref("");

// 评论：点卡片展开输入框，回车提交
const openId = ref(0);

// 过滤：用普通函数而不是在 v-for 上叠 v-if
function filteredPosts() {
  return posts.value.filter((item) => {
    return item.text.indexOf(keyword.value) !== -1;
  });
}

// 删除权限：管理员能删任何人的动态，会员只能删自己发的，访客看不到删除按钮
function canDelete(item) {
  if (role.value === "admin") {
    return true;
  }
  return role.value === "member" && item.author === user.name;
}

function toggleLike(item) {
  item.liked = !item.liked;
  item.likes = item.liked ? item.likes + 1 : item.likes - 1;
}

function toggleComment(id) {
  openId.value = openId.value === id ? 0 : id;
}

// 评论输入框没有绑定 v-model：这行在 v-memo 里，跳过重渲染时受控组件
// 拿不到回流的新值，会把用户输入回滚掉，所以这里故意用不受控的原生输入框
function submitComment(item, event) {
  const text = event.target.value.trim();
  if (text === "") {
    return;
  }
  item.comments.push({ id: Date.now(), author: "李明", text: text });
  event.target.value = "";
}

function removePost(index) {
  posts.value.splice(index, 1);
}
</script>

<template>
  <section id="feed" class="feed">
    <!-- 搜索：v-focus 打开就聚焦，v-highlight 命中关键词的动态会加底色 -->
    <div class="card feed__search">
      <el-input
        v-focus
        v-model="keyword"
        placeholder="搜索动态内容，比如「食堂」"
        clearable
      >
        <template #prefix>🔍</template>
      </el-input>
      <span class="feed__count">共 {{ filteredPosts().length }} 条动态</span>
    </div>

    <el-empty
      v-if="filteredPosts().length === 0"
      description="没有匹配的动态，换个关键词试试"
    />

    <div v-else class="feed__list">
      <!-- 动态列表：v-for + :key + v-memo。依赖数组把会影响这一行 DOM 的
           数据都写上：点赞态、评论数、搜索词、评论区开关、身份（决定删除按钮） -->
      <article
        v-for="(item, index) in filteredPosts()"
        :key="item.id"
        v-memo="[
          item.liked,
          item.comments.length,
          keyword,
          openId === item.id,
          role,
        ]"
        v-highlight="keyword"
        class="card post"
        @click="toggleComment(item.id)"
      >
        <div class="post__head">
          <span class="post__avatar" :style="{ background: item.color }">
            {{ item.author[0] }}
          </span>
          <div class="post__meta">
            <div class="post__author">{{ item.author }}</div>
            <div class="post__time">{{ item.time }}</div>
          </div>
          <!-- 权限：只有管理员或发动态的本人能看到删除按钮 -->
          <el-button
            v-if="canDelete(item)"
            size="small"
            type="danger"
            plain
            class="post__delete"
            @click.stop="removePost(index)"
            >删除</el-button
          >
        </div>

        <p class="post__text">{{ item.text }}</p>

        <!-- 模板动态：v-pre 让这段内容原样显示，双大括号不会被当成语法编译 -->
        <div v-if="item.type === 'code'">
          <pre v-pre class="post__code">
&lt;div class="signup-card"&gt;
  &lt;h2&gt;你好，{{ 姓名 }}！&lt;/h2&gt;
  &lt;p&gt;你已报名参加「{{ 活动名称 }}」&lt;/p&gt;
&lt;/div&gt;</pre
          >
        </div>

        <!-- 配图：:src 绑定地址，没选配图就不渲染这个元素 -->
        <img
          v-if="item.photo"
          class="post__photo"
          :src="item.photo"
          :alt="item.author + ' 的配图'"
        />

        <div class="post__foot">
          <!-- .stop 拦住冒泡，点赞不会顺手把评论区打开 -->
          <el-button
            size="small"
            :type="item.liked ? 'warning' : 'default'"
            @click.stop="toggleLike(item)"
          >
            {{ item.liked ? "❤" : "🤍" }} {{ item.likes }}
          </el-button>
          <span class="post__comment-hint">
            评论 {{ item.comments.length }}
          </span>
        </div>

        <!-- 评论区：.stop 拦住内部点击的冒泡，点输入框不会把评论区再收起来 -->
        <div
          v-if="openId === item.id"
          class="post__comments"
          @click.stop
        >
          <ul class="post__comment-list">
            <li v-for="c in item.comments" :key="c.id" class="post__comment">
              <span class="post__comment-author">{{ c.author }}：</span>
              {{ c.text }}
            </li>
          </ul>

          <!-- 访客只能看评论，输入框整个不渲染；回车提交，Esc 清空 -->
          <input
            v-if="role !== 'guest'"
            v-focus
            type="text"
            class="post__comment-input"
            placeholder="说点什么…（回车提交，Esc 清空）"
            @keyup.enter="submitComment(item, $event)"
            @keyup.esc="$event.target.value = ''"
          />
          <span v-else class="post__comment-login">登录后可评论</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.feed__search {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 14px;
}

.feed__count {
  flex-shrink: 0;
  font-size: 13px;
  color: #909399;
}

.feed__list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.post {
  padding: 16px;
  cursor: pointer;
}

.post__head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.post__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.post__meta {
  flex: 1;
  min-width: 0;
}

.post__author {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.post__time {
  font-size: 12px;
  color: #909399;
}

.post__text {
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.7;
  color: #303133;
  word-break: break-all;
}

.post__code {
  margin: 0 0 10px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #f5f7fa;
  color: #303133;
  font-size: 12.5px;
  line-height: 1.8;
  overflow-x: auto;
}

.post__photo {
  display: block;
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}

.post__foot {
  display: flex;
  align-items: center;
  gap: 16px;
}

.post__comment-hint {
  font-size: 13px;
  color: #909399;
}

.post__comments {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #ebeef5;
}

.post__comment-list {
  margin: 0 0 10px;
  padding: 0;
  list-style: none;
}

.post__comment {
  padding: 6px 10px;
  margin-bottom: 6px;
  border-radius: 6px;
  background: #f5f7fa;
  font-size: 13px;
  color: #303133;
  line-height: 1.6;
}

.post__comment-author {
  color: #409eff;
}

.post__comment-input {
  width: 100%;
  box-sizing: border-box;
  padding: 7px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 13px;
  color: #303133;
  outline: none;
  font-family: inherit;
}

.post__comment-input:focus {
  border-color: #409eff;
}

.post__comment-login {
  font-size: 13px;
  color: #909399;
}
</style>
