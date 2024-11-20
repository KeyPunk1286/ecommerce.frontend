<template>
  <div class="layout">
    <TheHeader class="layout__header" />
    <main class="layout__main">
      <slot />
    </main>
    <TheFooter class="layout__footer" />
  </div>
</template>

<script setup>
import TheHeader from "~/components/TheHeader.vue";
import TheFooter from "~/components/TheFooter.vue";
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &__main {
    flex: 1;
  }
}
// .header {
//   margin-bottom: 20px;
// }
// .main {
//   height: calc(100vh - 200px);
//   padding: 0 40px;
// }
</style>
