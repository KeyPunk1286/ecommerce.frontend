<template>
  <ul class="table-list">
    <li
      class="table-list__item"
      v-for="(value, key) in items"
      :key="value.title"
      :class="{ 'table-list__item--active': activeItem === key }"
      @click="handleClick(key)"
    >
      {{ value.title }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const activeItem = ref(null);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["change"]);
const handleClick = (index) => {
  activeItem.value = index;
  emit("change", index);
};
</script>

<style lang="scss" scoped>
.table-list {
  list-style: none;
  &__item {
    margin-bottom: 15px;
    cursor: pointer;
    transition: color 0.3s ease;
    width: max-content;

    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      color: rgb(126, 125, 124);
    }
    &--active {
      color: rgb(73, 73, 73);
    }
  }
}
</style>
