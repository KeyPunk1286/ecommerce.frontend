<template>
  <div class="user-table">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>First name</th>
            <th>Second name</th>
            <th>Last name</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in dataTable" :key="row.id">
            <td>{{ row.email }}</td>
            <td>{{ row.firstname }}</td>
            <td>{{ row.secondname }}</td>
            <td>{{ row.lastname }}</td>
            <td>{{ row.created_at }}</td>
            <td>{{ row.updated_at }}</td>
            <td @click="handleRemoveUser(row.id)" style="cursor: pointer">x</td>
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
    const response = await axios.get("http://localhost:8888/users/all");
    // dataTable = response.data ?? [];
    dataTable.splice(0, dataTable.length, ...(response.data ?? []));
  } catch (error) {
    console.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

const removeDataItem = async (id) => {
  isLoading.value = true;
  try {
    await axios.delete(`http://localhost:8888/users/${id}`);
    const index = dataTable.findIndex((item) => item.id === id);
    if (index !== -1) dataTable.splice(index, 1);
  } catch (error) {
    console.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

const handleRemoveUser = async (id) => {
  await removeDataItem(id);
  await loadDataTable();
};

onMounted(async () => {
  await loadDataTable();
});
</script>

<style lang="scss" scoped></style>
