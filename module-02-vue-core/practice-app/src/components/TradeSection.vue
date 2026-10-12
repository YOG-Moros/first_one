<script setup>
import { ref } from "vue";

// 发布闲置的几个字段，故意用不同的修饰符写法
const title = ref(""); // .trim：商品名去掉首尾空格
const price = ref(0); // .number：价格转成数字才能正常相加
const desc = ref(""); // .lazy：大段描述等光标离开才同步
const descTyping = ref(""); // 记录正在输入的内容，和已同步的做对比
const phone = ref(""); // v-digits：手机号只允许数字
const condition = ref("九成新");
const saved = ref(false);

const shipping = 10; // 运费，固定值

function onDescInput(event) {
  // el-input 组件透传出来的可能是原生事件对象，也可能是值本身，两种都兼容
  descTyping.value =
    typeof event === "string" ? event : event.target.value;
}

function saveTrade() {
  saved.value = true;
}

function resetSaved() {
  saved.value = false;
}
</script>

<template>
  <section id="trade" class="card trade">
    <h3 class="trade__title">发布闲置</h3>
    <p class="trade__desc">
      毕业季出闲置，填好下面的信息发布到广场，给物品找个新主人。
    </p>

    <el-form label-width="72px" class="trade__form">
      <el-form-item label="商品名">
        <!-- .trim：复制粘贴带上的首尾空格会被自动删掉 -->
        <el-input
          v-model.trim="title"
          placeholder="比如：九成新机械键盘"
          @input="resetSaved"
        />
      </el-form-item>

      <el-form-item label="价格">
        <!-- .number：输入值转成数字，加运费时是正常的加法 -->
        <el-input v-model.number="price" placeholder="0" @input="resetSaved" />
      </el-form-item>

      <el-form-item label="成色">
        <el-radio-group v-model="condition" @change="resetSaved">
          <el-radio value="全新">全新</el-radio>
          <el-radio value="九成新">九成新</el-radio>
          <el-radio value="七成新">七成新</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="描述">
        <!-- .lazy：光标离开输入框时才同步，所以保存状态要等失焦才变绿 -->
        <el-input
          v-model.lazy="desc"
          type="textarea"
          :rows="3"
          placeholder="描述一下物品情况"
          @input="onDescInput"
        />
        <div
          class="trade__save-state"
          :class="desc === descTyping ? 'trade__save-state--saved' : ''"
        >
          {{ desc === descTyping ? "✓ 已保存" : "✎ 编辑中…" }}
        </div>
      </el-form-item>

      <el-form-item label="手机号">
        <!-- v-digits 自定义指令：字母和汉字敲不进去 -->
        <el-input
          v-digits
          v-model="phone"
          placeholder="只允许输入数字"
          @input="resetSaved"
        />
      </el-form-item>
    </el-form>

    <div class="trade__foot">
      <el-button type="primary" @click="saveTrade">保存</el-button>
      <span class="trade__total">
        到手价 = {{ price }} + 运费 {{ shipping }} = ¥{{ price + shipping }}
      </span>
    </div>

    <!-- 保存成功后出现的提示条：v-if 创建、再编辑时销毁 -->
    <el-alert
      v-if="saved"
      class="trade__alert"
      type="success"
      :closable="false"
      show-icon
      title="已保存，发布前可以继续修改"
    />
  </section>
</template>

<style scoped>
.trade {
  padding: 16px;
}

.trade__title {
  margin: 0 0 4px;
  font-size: 16px;
  color: #303133;
}

.trade__desc {
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.6;
  color: #909399;
}

.trade__form {
  margin-bottom: 4px;
}

.trade__save-state {
  margin-top: 6px;
  font-size: 12px;
  color: #e6a23c;
}

.trade__save-state--saved {
  color: #67c23a;
}

.trade__foot {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.trade__total {
  font-size: 13px;
  color: #f56c6c;
  font-weight: 600;
}

.trade__alert {
  margin-top: 12px;
}
</style>
