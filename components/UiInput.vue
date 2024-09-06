<template>
  <input
      class="input"
      :type="props.text"
      :value="props.value"
      :placeholder="props.placeholder"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
  >
</template>

<script setup>
const props = defineProps({
  text: {
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
  }
})

const emit = defineEmits(["focus", "input", "blur"])

const onFocus = (event) => emit("focus", event)
const onInput = (event) => emit("input", event)
const onBlur = (event) => emit("blur", event)
</script>

<style scoped lang="scss">
.input {
  border-color: red;
}
</style>