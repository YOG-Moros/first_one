<script setup>
import SiteHeader from "./components/SiteHeader.vue";
import ProfileSidebar from "./components/ProfileSidebar.vue";
import PublishBox from "./components/PublishBox.vue";
import FeedList from "./components/FeedList.vue";
import TradeSection from "./components/TradeSection.vue";
import SiteFooter from "./components/SiteFooter.vue";
</script>

<template>
  <div class="app">
    <SiteHeader />

    <!-- 三栏布局：个人侧栏 + 动态广场 + 闲置发布 -->
    <main class="layout">
      <ProfileSidebar />
      <section class="middle">
        <PublishBox />
        <FeedList />
      </section>
      <TradeSection />
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 320px;
  gap: 16px;
  align-items: start;
  max-width: 1120px;
  margin: 16px auto 0;
  padding: 0 20px;
}

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
