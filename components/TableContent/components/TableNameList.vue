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
    background-color: #224141;
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    // width: max-content;

    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      background-color: #1c3535;
      // color: rgb(126, 125, 124);
    }
    &--active {
      background-color: #1c3535;
    }
  }
}
</style>
