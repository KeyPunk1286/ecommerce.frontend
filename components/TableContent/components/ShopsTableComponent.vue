<template>
  <div class="shop-content">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="shop-content__panel-top">
        <UiButton @click="handleClickAddNew">Add new</UiButton>
      </div>
      <table class="shop-content__table">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>is_active</th>
            <th>created_at</th>
            <th>updated_at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in dataTable" :key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.title }}</td>
            <td>{{ row.is_active }}</td>
            <td>{{ row.created_at }}</td>
            <td>{{ row.updated_at }}</td>
            <td @click="handleRemoveShop(row.id)" style="cursor: pointer">
              <i class="fas fa-times" style="color: red"></i>
            </td>
            <td @click="handleEditShop(row.id)" style="cursor: pointer">
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
import { ref, onMounted, reactive } from "vue";
import UiButton from "~/components/UiButton.vue";

const emit = defineEmits(["switch", "switchToEdit"]);

let isLoading = ref(true);
let dataTable = reactive([]);

const loadDataTable = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:8888/shop/all");
    dataTable.splice(0, dataTable.length, ...(response.data ?? []));
  } catch (error) {
    console.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

const removeDataShop = async (id) => {
  isLoading.value = true;
  try {
    await axios.delete(`http://localhost:8888/shop/${id}`);
    const index = dataTable.findIndex((item) => item.id === id);
    if (index !== -1) dataTable.splice(index, 1);
  } catch (error) {
    console.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

const handleRemoveShop = async (id) => {
  await removeDataShop(id);
  await loadDataTable();
};

onMounted(async () => {
  await loadDataTable();
});

const handleClickAddNew = (event) => emit("switch", event);
const handleEditShop = (event) => emit("switchToEdit", event);
</script>

<style lang="scss" scoped>
.shop-content {
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
