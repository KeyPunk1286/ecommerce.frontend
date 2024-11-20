<template>
  <div class="title-page">{{ pageName }} page</div>
  <div><TableContent /></div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  middleware: "auth",
});

const pageName = ref("Table");
</script>

<style scoped lang="scss">
.title-page {
  text-align: center;
  margin-bottom: 40px;
}
</style>
