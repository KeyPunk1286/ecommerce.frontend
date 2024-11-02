<template>
  <div class="ui-field">
    <label>{{ props.label }}</label>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
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
