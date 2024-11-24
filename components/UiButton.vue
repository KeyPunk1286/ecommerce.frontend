<template>
  <button
    class="button"
    :type="props.type"
    :value="props.value"
    @click="handleClick"
  >
    <slot />
  </button>
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
});

const emit = defineEmits(["click"]);

const handleClick = (event) => emit("click", event);
</script>

<style scoped lang="scss">
.button {
  background-color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #112121;
  }
}
</style>
