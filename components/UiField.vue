<template>
  <div class="ui-field">
    <label>{{ props.label }}</label>
    <slot />
    <div>
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
  label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 5px;
  }
}
</style>
