// 朋友圈网站的初始数据：组件里 import 后用 ref 包起来使用

// 当前登录用户：内容是固定不变的，普通对象就够了，不需要 ref
export const user = {
  name: "李明",
  signature: "写代码，也写生活。",
  joinedAt: "2024 年 9 月",
  points: 2860,
};

// 皮肤主题：切换后靠 :style 改变个人卡片的主色
export const themes = [
  { label: "湖蓝", color: "#409eff" },
  { label: "暖橙", color: "#e6a23c" },
  { label: "森林", color: "#67c23a" },
  { label: "暮紫", color: "#9254de" },
];

// 头像底色：每个好友随机分到一个颜色，靠 :style 绑定
export const avatarColors = [
  "#409eff",
  "#e6a23c",
  "#67c23a",
  "#9254de",
  "#f56c6c",
  "#00a8a8",
];

// 发动态时的可选配图
export const photos = [
  "/images/photo-1.svg",
  "/images/photo-2.svg",
  "/images/photo-3.svg",
  "/images/photo-4.svg",
];

// 后台返回的公告富文本（只含可信的标签）
export const noticeHtml =
  "<b>圈内公告</b>：本周五 14:00 在 A301 教室举行<b>前端技术沙龙</b>，" +
  "分享 Vite 构建优化实战，欢迎参加。请大家互相转告，<i>不要迟到</i>。";

// 首页的初始动态列表，每一条都有唯一 id
export const initialPosts = [
  {
    id: 1,
    author: "章序",
    color: "#e6a23c",
    time: "10 分钟前",
    text: "你很装",
    photo: "",
    likes: 12,
    liked: false,
    comments: [
      { id: 1, author: "lyx", text: "可以" },
      { id: 2, author: "zr", text: "记下了" },
    ],
  },
  {
    id: 2,
    author: "陈超",
    color: "#67c23a",
    time: "32 分钟前",
    text: "数据结构实验终于跑通了，附上心得：链表一定要画图，不然指针绕晕你。",
    photo: "/images/photo-1.svg",
    likes: 8,
    liked: true,
    comments: [],
  },
  {
    id: 3,
    author: "张梦琪",
    color: "#9254de",
    time: "1 小时前",
    text: "社团活动报名页的邮件模板，把姓名和活动名填进双大括号就行，需要的自取：",
    photo: "",
    likes: 45,
    liked: false,
    comments: [
      { id: 1, author: "李思远", text: "收藏了" },
      { id: 2, author: "王小雨", text: "正好用得上" },
      { id: 3, author: "周欣", text: "已保存，谢谢！" },
    ],
    // 带模板的动态：模板里用 v-pre 把这段内容原样展示出来，双大括号不会被当成语法编译
    type: "code",
  },
  {
    id: 4,
    author: "李思远",
    color: "#f56c6c",
    time: "2 小时前",
    text: "篮球场今天下午 4 点有空场，约球的私聊我。",
    photo: "/images/photo-2.svg",
    likes: 21,
    liked: false,
    comments: [],
  },
  {
    id: 5,
    author: "赵倩",
    color: "#00a8a8",
    time: "3 小时前",
    text: "图书馆四楼自习室新装了插座，靠窗那排位子绝了，学习效率翻倍。",
    photo: "",
    likes: 33,
    liked: false,
    comments: [{ id: 1, author: "张梦琪", text: "周末一起自习？" }],
  },
  {
    id: 6,
    author: "周欣",
    color: "#409eff",
    time: "昨天 22:14",
    text: "社团招新结束了，这届大一同学里会前端的好多，未来可期。",
    photo: "/images/photo-3.svg",
    likes: 56,
    liked: true,
    comments: [],
  },
  {
    id: 7,
    author: "孙浩然",
    color: "#e6a23c",
    time: "昨天 20:02",
    text: "宿舍楼下那只橘猫有名字了，叫「代码」，因为它总趴在我们的主机上。",
    photo: "/images/photo-4.svg",
    likes: 88,
    liked: false,
    comments: [
      { id: 1, author: "王小雨", text: "哈哈这个名字起得好" },
      { id: 2, author: "李思远", text: "明天带猫条去看它" },
    ],
  },
];

// 页脚信息：从头到尾不会变，配合 v-once 使用
export const footer = {
  company: "青柠圈 · 校园技术社区",
  icp: "苏ICP备2024000000号-1",
  service: "400-000-0000",
  since: "2024",
};
