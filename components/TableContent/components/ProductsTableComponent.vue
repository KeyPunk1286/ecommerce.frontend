<template>
  <div class="product-content">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="product-content__panel-top">
        <UiButton @click="handleClickAddNew">Add new</UiButton>
      </div>
      <table class="product-content__table">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in dataTable" :key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.title }}</td>
            <td>{{ row.description }}</td>
            <td>{{ row.price }}</td>
            <td @click="handleRemoveProduct(row.id)" style="cursor: pointer">
              <i class="fas fa-times" style="color: red"></i>
            </td>
            <td @click="handleEditProduct(row.id)" style="cursor: pointer">
              <i class="fas fa-edit"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";

const emit = defineEmits(["switch", "switchToEdit"]);

const isLoading = ref(true);
const dataTable = reactive([]);

const loadDataTable = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:8888/product/all");
    dataTable.splice(0, dataTable.length, ...(response?.data ?? []));
  } catch (error) {
    console.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

const handleClickAddNew = (event) => emit("switch", event);

const handleRemoveProduct = async (id) => {
  await removeDataProduct(id);
  await loadDataTable();
};
const removeDataProduct = async (id) => {
  isLoading.value = true;
  try {
    await axios.delete(`http://localhost:8888/product/${id}`);
  } catch (error) {
    console.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

const handleEditProduct = (event) => emit("switchToEdit", event);

onMounted(async () => {
  await loadDataTable();
});
</script>

<style lang="scss" scoped>
.product-content {
  &__panel-top {
    padding: 20px;
    background-color: #112121;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  &__table {
    th {
      padding: 10px;
      background-color: #224141;
    }
    tr:hover td {
      background-color: #224141;
    }
    td {
      padding: 5px;
      border-bottom: 1px #112121 solid;
    }
  }
}
</style>
