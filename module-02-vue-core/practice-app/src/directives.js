// 自定义指令：把重复的 DOM 操作封装起来，在 main.js 里全局注册后随处可用

// 指令挂在 el-input 上时，拿到的是组件根元素（一个 div），
// 真正能聚焦、能读写 value 的是它内部的原生 input，所以先找出来
function findInput(el) {
  return el.tagName === "INPUT" ? el : el.querySelector("input");
}

// v-focus：页面打开就聚焦到输入框，方便直接打字
export const vFocus = {
  mounted(el) {
    const input = findInput(el);
    if (input) {
      input.focus();
    }
  },
};

// v-digits：只允许输入数字（手机号等场景），敲不进字母和汉字
export const vDigits = {
  mounted(el) {
    const input = findInput(el);
    if (!input) {
      return;
    }
    input.addEventListener("input", function () {
      const filtered = input.value.replace(/\D/g, "");
      if (filtered !== input.value) {
        input.value = filtered;
        // 手动派发一次 input 事件，v-model 才能拿到过滤后的值
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  },
};

// v-highlight：内容里包含关键词时给整块加底色，搜索动态时用
function paint(el, keyword) {
  if (keyword === "") {
    el.style.backgroundColor = "";
    return;
  }
  el.style.backgroundColor =
    el.textContent.indexOf(keyword) !== -1 ? "#fdf6ec" : "";
}

export const vHighlight = {
  mounted(el, binding) {
    paint(el, binding.value);
  },
  // 数据变化后指令默认不会重跑，需要自己接上 updated
  updated(el, binding) {
    paint(el, binding.value);
  },
};
