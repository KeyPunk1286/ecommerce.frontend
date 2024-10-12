<template>
  <div class="form__field">
    <div class="form__field__label">{{ label }}</div>
    <div class="form__field__input">
      <ui-input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <div
      class="form__field__error"
      v-for="error in errorsFromData.errors"
      :key="error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
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
  label: {
    type: String,
    default: "",
  },
  errorsFromData: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits(["input", "focus", "blur"]);

const onInput = (event) => emits("input", event);
const onFocus = (event) => emits("focus", event);
const onBlur = (event) => emits("blur", event);
</script>

<style lang="scss" scoped>
.form__field {
  width: 100%;
  position: relative;
  margin-bottom: 20px;
  &__label {
    position: absolute;
    left: 5px;
    top: -10px;
  }
  &__input {
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
  &__error {
    color: red;
    font-size: 13px;
    padding: 5px 0;
  }
}
</style>
