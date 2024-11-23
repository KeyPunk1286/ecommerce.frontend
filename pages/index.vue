<template>
  <!-- <div class="title-page">{{ pageName }} page</div> -->
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
  font-size: 25px;
  text-align: center;
  padding: 20px 0 20px;
  // margin-bottom: 40px;
}
</style>
