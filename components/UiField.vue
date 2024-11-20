<template>
  <div class="ui-field">
    <label class="ui-field__label">{{ props.label }}</label>
    <slot />
    <div class="ui-field__error-message">
      <ul>
        <li v-for="error in errorsFromData.errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  errorsFromData: {
    type: Object,
    default: () => ({ errors: [] }),
  },
});
</script>

<style scoped lang="scss">
.ui-field {
  &__label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 5px;
  }
  &__error-message {
    color: red;
    ul {
      list-style: none;
    }
  }
}
</style>
