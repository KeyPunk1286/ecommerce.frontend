<template>
  <div class="login__form__field">
    <div class="login__form__field-label">{{ label }}</div>
    <div class="login__form__field-input">
      <UiInput
          :type="type"
          :placeholder="placeholder"
          :value="value"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
      />
    </div>
    <div class="login__form__field-error" v-for="error in errorFormData.errors" :key="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  errorFormData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(["focus", "input", "blur"])

const onFocus = (event) => emit("focus", event)
const onInput = (event) => emit("input", event)
const onBlur = (event) => emit("blur", event)
</script>

<style scoped lang="scss">
.login {
  &__form {
    &__field {
      width: 100%;
      position: relative;
      margin-bottom: 20px;

      &-label {
        position: absolute;
        left: 5px;
        top: -10px;
      }

      &-input {
        input {
          border: 1px solid #00138b;
          border-radius: 10px;
          min-width: 400px;
          padding: 0 10px;

          width: 100%;
          background-color: transparent;
          height: 60px;
          color: gainsboro;

          &:focus {
            outline: none;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }

      &-error {
        color: red;
        font-size: 13px;
        padding: 5px 0;
      }
    }
  }
}
</style>