<template>
  <div class="title-page">{{ pageName }} page</div>
  <div><TableContent /></div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  middleware: "auth",
});

const pageName = ref("Home");
</script>

<style scoped lang="scss"></style>
