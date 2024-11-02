<template>
  <input
    class="input"
    :type="props.type"
    :value="props.value"
    :placeholder="props.placeholder"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
  />
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
});

const emit = defineEmits(["focus", "input", "blur"]);

const onFocus = (event) => emit("focus", event);
const onInput = (event) => emit("input", event);
const onBlur = (event) => emit("blur", event);
</script>

<style scoped lang="scss">
.input {
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 20px;
}
</style>
