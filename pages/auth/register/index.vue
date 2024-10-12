<template>
  <div class="registration">
    <div class="registration__page-name">{{ pageName }} page</div>

    <registration-form />
  </div>
</template>

<script setup>
import { ref } from "vue";

import RegistrationForm from "./components/RegistrationForm.vue";

const pageName = ref("Registration");
</script>

<style scoped lang="scss">
.registration {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
  &__page-name {
    margin-bottom: 20px;
    font-size: 24px;
    text-transform: uppercase;
  }
}
</style>
