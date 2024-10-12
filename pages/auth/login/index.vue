<template>
  <div class="login">

    <div class="login__title">{{pageName}} page</div>

    <LoginForm />

  </div>
</template>

<script setup>

import LoginForm from "~/pages/auth/login/components/LoginForm.vue";

import { pageName } from "~/pages/auth/login/composables/data.js";

definePageMeta({
  middleware: 'not-auth'
});

</script>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);

  &__title {
    margin-bottom: 20px;
    font-size: 24px;
    text-transform: uppercase;
  }
}
</style>