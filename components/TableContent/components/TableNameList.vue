<template>
  <ul>
    <li
      v-for="(value, key) in items"
      :key="value.title"
      @click="handleClick(key)"
    >
      {{ value.title }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["change"]);
const handleClick = (index) => {
  emit("change", index);
};
</script>

<style lang="scss" scoped></style>
