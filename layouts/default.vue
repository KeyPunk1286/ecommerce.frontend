<template>
  <TheHeader />
  <main class="main">
    <slot />
  </main>
  <TheFooter />
</template>

<script setup>
import TheHeader from "~/components/TheHeader.vue";
import TheFooter from "~/components/TheFooter.vue";
</script>

<style lang="scss" scoped>
.main {
  height: calc(100vh - 200px);
  padding: 20px 0;
}
</style>
