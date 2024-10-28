<template>
  <div>
    <div
        class="tab"
        v-for="(item, key) in props.items"
        @click="handleClick(key)"
        :key="item.title"
    >{{ item.title }}</div>
  </div>
</template>

<script setup>

const emit = defineEmits(['change'])

const props = defineProps({
  items: {
    type: [],
    default: []
  }
})

const handleClick = index => {
  emit('change', index)
}

</script>

<style lang="scss" scoped>
.tab {
  padding: 20px;
  background-color: #8a9696;
  margin-bottom: 5px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #96a2a2;
  }

  &:active {
    background-color: #6b7373;
  }
}
</style>
