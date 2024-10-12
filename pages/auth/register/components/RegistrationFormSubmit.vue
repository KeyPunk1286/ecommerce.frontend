<template>
  <button
    class="submit-registration"
    @click="handleSubmitRegistration"
    :disabled="!isRegistrationValidateComputed"
    :class="{
      'submit-registration__disabled': !isRegistrationValidateComputed,
    }"
  >
    register
  </button>
</template>

<script setup>
import { isRegistrationValidateComputed } from "../composables/validationForRegistration.js";
const emit = defineEmits(["submit"]);

const handleSubmitRegistration = (event) => emit("submit", event);
</script>

<style lang="scss" scoped>
.submit-registration {
  background-color: #0e0f50;
  color: gainsboro;
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 10px;
  &:active {
    background-color: #0e1256;
  }
  &__disabled {
    background-color: #05071c;
    color: #383636;
  }
}
</style>
