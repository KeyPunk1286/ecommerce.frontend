<template>
  <div class="customer-table">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>status</th>
            <th>created_at</th>
            <th>updated_at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in dataTable" :key="row.id">
            <td>{{ row.title }}</td>
            <td>{{ row.status }}</td>
            <td>{{ row.created_at }}</td>
            <td>{{ row.updated_at }}</td>
            <td @click="handleRemoveCustomer(row.id)" style="cursor: pointer">
              x
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

let isLoading = ref(true);
let dataTable = reactive([]);

const loadDataTable = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:8888/customers/all");
    dataTable.splice(0, dataTable.length, ...(response.data ?? []));
  } catch (error) {
    console.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

const remoweDataItem = async (id) => {
  isLoading.value = true;
  try {
    await axios.delete(`http://localhost:8888/customers/${id}`);
    const index = dataTable.findIndex((item) => item.id === id);
    if (index !== -1) dataTable.splice(index, 1);
  } catch (error) {
    console.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

const handleRemoveCustomer = async (id) => {
  await remoweDataItem(id);
  await loadDataTable();
};

onMounted(async () => {
  await loadDataTable();
});
</script>

<style lang="scss" scoped></style>
