<script setup>
import { ref } from "vue";

const students = [
  {
    id: "20230101",
    name: "美妆蛋",
    className: "软件 2301",
    direction: "前端开发",
    score: 92,
    status: "active",
  },
  {
    id: "20230102",
    name: "灯箱片",
    className: "软件 2301",
    direction: "后端开发",
    score: 85,
    status: "active",
  },
  {
    id: "20230103",
    name: "卷闸门",
    className: "软件 2302",
    direction: "前端开发",
    score: 78,
    status: "intern",
  },
  {
    id: "20230104",
    name: "火箭筒",
    className: "软件 2302",
    direction: "数据开发",
    score: 88,
    status: "leave",
  },
  {
    id: "20230105",
    name: "香蕉皮",
    className: "软件 2302",
    direction: "后端开发",
    score: 57,
    status: "active",
  },
  {
    id: "20230106",
    name: "章序",
    className: "软件 2303",
    direction: "测试开发",
    score: 71,
    status: "intern",
  },
  {
    id: "20230107",
    name: "gyy",
    className: "软件 2303",
    direction: "前端开发",
    score: 95,
    status: "active",
  },
  {
    id: "20230108",
    name: "暖茎须",
    className: "软件 2303",
    direction: "数据开发",
    score: 59,
    status: "leave",
  },
];

const viewMode = ref("table");

const passOnly = ref(false);
const shownStudents = ref([]);
const groups = ref([]);

const dialogVisible = ref(false);
const selectedStudent = ref(null);

const STATUS_MAP = {
  active: { text: "在读", type: "success" },
  intern: { text: "实习中", type: "warning" },
  leave: { text: "休学", type: "info" },
};

function scoreColor(score) {
  if (score >= 85) return "#0f9d58";
  if (score >= 70) return "#e6a23c";
  return "#f56c6c";
}

function applyFilter() {
  shownStudents.value = [];
  for (let i = 0; i < students.length; i++) {
    if (!passOnly.value || students[i].score >= 60) {
      shownStudents.value.push(students[i]);
    }
  }
  buildGroups();
}

function buildGroups() {
  groups.value = [];
  for (let i = 0; i < shownStudents.value.length; i++) {
    const stu = shownStudents.value[i];
    let target = null;
    for (let j = 0; j < groups.value.length; j++) {
      if (groups.value[j].direction === stu.direction) {
        target = groups.value[j];
      }
    }
    if (target) {
      target.list.push(stu);
    } else {
      groups.value.push({ direction: stu.direction, list: [stu] });
    }
  }
}

applyFilter();

function showDetail(student) {
  selectedStudent.value = student;
  dialogVisible.value = true;
}
</script>

<template>
  <div class="page">
    <header class="page__head">
      <div>
        <h2 class="page__title">学生名单</h2>
        <p class="page__desc">
          共 {{ shownStudents.length }} 人 软件2412 陈昶好
        </p>
      </div>

      <div class="page__tools">
        <el-radio-group v-model="viewMode">
          <el-radio-button value="table">表格</el-radio-button>
          <el-radio-button value="card">卡片</el-radio-button>
          <el-radio-button value="group">分组</el-radio-button>
          <el-radio-button value="list">名单</el-radio-button>
        </el-radio-group>

        <span class="page__switch">
          只看及格
          <el-switch v-model="passOnly" @change="applyFilter" />
        </span>
      </div>
    </header>

    <el-table v-if="viewMode === 'table'" :data="shownStudents" stripe border>
      <el-table-column prop="id" label="学号" width="120" />
      <el-table-column prop="name" label="姓名" width="110" />
      <el-table-column prop="className" label="班级" width="120" />
      <el-table-column prop="direction" label="方向" />
      <el-table-column prop="score" label="成绩" width="100" sortable>
        <template #default="scope">
          <span class="score" :style="{ color: scoreColor(scope.row.score) }">{{
            scope.row.score
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110">
        <template #default="scope">
          <el-tag :type="STATUS_MAP[scope.row.status].type" effect="light">
            {{ STATUS_MAP[scope.row.status].text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template #default="scope">
          <el-button link type="primary" @click="showDetail(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-row v-else-if="viewMode === 'card'" :gutter="16">
      <el-col
        v-for="item in shownStudents"
        :key="item.id"
        :xs="24"
        :sm="12"
        :md="8"
        class="card-col"
      >
        <el-card shadow="hover" class="stu-card">
          <div class="stu-card__top">
            <el-avatar :size="48" class="avatar">{{
              item.name.charAt(0)
            }}</el-avatar>
            <div>
              <p class="stu-card__name">{{ item.name }}</p>
              <p class="stu-card__id">{{ item.id }} · {{ item.className }}</p>
            </div>
          </div>

          <div class="stu-card__tags">
            <el-tag size="small" effect="plain">{{ item.direction }}</el-tag>
            <el-tag size="small" :type="STATUS_MAP[item.status].type" effect="light">
              {{ STATUS_MAP[item.status].text }}
            </el-tag>
          </div>

          <p class="stu-card__score">成绩 {{ item.score }}</p>
          <el-progress
            :percentage="item.score"
            :color="scoreColor(item.score)"
            :stroke-width="8"
            :show-text="false"
          />

          <template #footer>
            <el-button link type="primary" @click="showDetail(item)"
              >查看详情</el-button
            >
          </template>
        </el-card>
      </el-col>
    </el-row>

    <div v-else-if="viewMode === 'group'" class="group-view">
      <section
        v-for="group in groups"
        :key="group.direction"
        class="group-view__section"
      >
        <h3 class="group-view__title">
          {{ group.direction }}
          <el-tag size="small" effect="plain">{{ group.list.length }} 人</el-tag>
        </h3>
        <ul class="name-list">
          <li v-for="item in group.list" :key="item.id" class="name-list__item">
            <el-avatar :size="32" class="avatar">{{
              item.name.charAt(0)
            }}</el-avatar>
            <span class="name-list__name">{{ item.name }}</span>
            <span class="name-list__meta"
              >{{ item.id }} · {{ item.className }}</span
            >
            <span class="score" :style="{ color: scoreColor(item.score) }">{{
              item.score
            }}</span>
            <el-tag
              size="small"
              :type="STATUS_MAP[item.status].type"
              effect="light"
            >
              {{ STATUS_MAP[item.status].text }}
            </el-tag>
          </li>
        </ul>
      </section>
    </div>

    <ul v-else class="name-list">
      <li v-for="item in shownStudents" :key="item.id" class="name-list__item">
        <el-avatar :size="32" class="avatar">{{ item.name.charAt(0) }}</el-avatar>
        <span class="name-list__name">{{ item.name }}</span>
        <span class="name-list__meta"
          >{{ item.id }} · {{ item.className }} · {{ item.direction }}</span
        >
        <span class="score" :style="{ color: scoreColor(item.score) }">{{
          item.score
        }}</span>
        <el-tag size="small" :type="STATUS_MAP[item.status].type" effect="light">
          {{ STATUS_MAP[item.status].text }}
        </el-tag>
      </li>
    </ul>

    <el-dialog
      v-if="selectedStudent"
      v-model="dialogVisible"
      :title="selectedStudent.name + ' · 详细信息'"
      width="440px"
    >
      <div class="stu-card__top">
        <el-avatar :size="56" class="avatar">{{
          selectedStudent.name.charAt(0)
        }}</el-avatar>
        <div>
          <p class="stu-card__name">{{ selectedStudent.name }}</p>
          <p class="stu-card__id">
            {{ selectedStudent.id }} · {{ selectedStudent.className }}
          </p>
        </div>
      </div>

      <el-descriptions :column="1" border class="detail__desc">
        <el-descriptions-item label="学号">{{
          selectedStudent.id
        }}</el-descriptions-item>
        <el-descriptions-item label="班级">{{
          selectedStudent.className
        }}</el-descriptions-item>
        <el-descriptions-item label="专业方向">{{
          selectedStudent.direction
        }}</el-descriptions-item>
        <el-descriptions-item label="成绩">
          <span
            class="score"
            :style="{ color: scoreColor(selectedStudent.score) }"
            >{{ selectedStudent.score }}</span
          >
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag
            :type="STATUS_MAP[selectedStudent.status].type"
            effect="light"
          >
            {{ STATUS_MAP[selectedStudent.status].text }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>

      <template #footer>
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.page {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 16px;
}

.page__head {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.page__title {
  margin: 0;
  font-size: 22px;
  color: #1f2329;
}

.page__desc {
  margin: 6px 0 0;
  font-size: 13px;
  color: #8a919f;
}

.page__tools {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.page__switch {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: #5c6470;
}

.score {
  font-weight: 600;
}

.avatar {
  background: #2f6fed;
  color: #fff;
}

.card-col {
  margin-bottom: 16px;
}

.stu-card__top {
  display: flex;
  gap: 12px;
  align-items: center;
}

.stu-card__name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2329;
}

.stu-card__id {
  margin: 4px 0 0;
  font-size: 12px;
  color: #8a919f;
}

.stu-card__tags {
  display: flex;
  gap: 8px;
  margin: 14px 0;
}

.stu-card__score {
  margin: 0 0 6px;
  font-size: 13px;
  color: #5c6470;
}

.group-view__section {
  margin-bottom: 24px;
}

.group-view__title {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 0 0 10px;
  font-size: 15px;
  color: #1f2329;
}

.detail__desc {
  margin-top: 18px;
}

.name-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
}

.name-list__item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 16px;
  background: #fff;
  border-bottom: 1px solid #f2f3f5;
}

.name-list__item:last-child {
  border-bottom: none;
}

.name-list__item:hover {
  background: #f7f9fc;
}

.name-list__name {
  width: 80px;
  font-weight: 600;
  color: #1f2329;
}

.name-list__meta {
  flex: 1;
  font-size: 13px;
  color: #8a919f;
}
</style>
