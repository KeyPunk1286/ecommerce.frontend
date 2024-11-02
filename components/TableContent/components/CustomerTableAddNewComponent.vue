<template>
  <div class="user-table">
    <div class="user-table__panel-top">
      <UiButton @click="handleClickGoBack"><--- Go Back</UiButton>
    </div>
    ADD NEW CUSTOMER
  </div>
</template>

<script setup>
// import axios from "axios";
// import { ref, onMounted, reactive } from "vue";
//
// let isLoading = ref(true);
// let dataTable = reactive([]);
//
// const loadDataTable = async () => {
//   isLoading.value = true;
//   try {
//     const response = await axios.get("http://localhost:8888/users/all");
//     // dataTable = response.data ?? [];
//     dataTable.splice(0, dataTable.length, ...(response.data ?? []));
//   } catch (error) {
//     console.error(error.message);
//   } finally {
//     isLoading.value = false;
//   }
// };
//
// const removeDataItem = async (id) => {
//   isLoading.value = true;
//   try {
//     await axios.delete(`http://localhost:8888/users/${id}`);
//     const index = dataTable.findIndex((item) => item.id === id);
//     if (index !== -1) dataTable.splice(index, 1);
//   } catch (error) {
//     console.error(error.message);
//   } finally {
//     isLoading.value = false;
//   }
// };
//
// const handleRemoveUser = async (id) => {
//   await removeDataItem(id);
//   await loadDataTable();
// };
//
// onMounted(async () => {
//   await loadDataTable();
// });
const emit = defineEmits(["clickGoBack"]);

const handleClickGoBack = (event) => emit("clickGoBack", event);

</script>

<style lang="scss" scoped>

.user-table {
  &__panel-top {
    padding: 20px;
    background-color: #112121;
    display: flex;
    justify-content: flex-start;
  }
}
</style>
