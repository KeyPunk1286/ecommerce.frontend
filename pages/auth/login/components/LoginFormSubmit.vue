<template>
  <button class="login__form__submit"
          :class="{'login__form__submit--disabled': !isFormValidComputed}"
          @click="handleSubmitForm"
          :disabled="!isFormValidComputed"
  >
    Login
  </button>
</template>

<script setup>
import {
  isFormValidComputed
} from "~/pages/auth/login/composables/validation.js";

const emit = defineEmits(["submit"])

const handleSubmitForm = (event) => emit("submit", event)
</script>

<style scoped lang="scss">
.login {
  &__form {
    &__submit {
      background-color: #0e0f50;
      color: gainsboro;
      width: 100%;
      height: 60px;
      border: none;
      border-radius: 10px;

      &:active {
        background-color: #0e1256;
      }

      &--disabled {
        background-color: #05071c;
        color: #383636;
      }
    }
  }
}
</style>