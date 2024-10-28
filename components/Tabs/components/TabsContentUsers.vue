<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="!isLoading">

      <button>Add new</button>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Firstname</th>
            <th>Secondname</th>
            <th>Lastname</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="row in data">
          <td>{{ row.id }}</td>
          <td>{{ row.email }}</td>
          <td>{{ row.firstname }}</td>
          <td>{{ row.secondname }}</td>
          <td>{{ row.lastname }}</td>
          <td>{{ row.created_at }}</td>
          <td>{{ row.updated_at }}</td>
          <td
              style="text-align: center; color: red; cursor: pointer"
              @click="handleRemove(row.id)"
          >
            X
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

import axios from "axios";

let isLoading = ref(true);
let data = reactive([]);

const loadData = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('http://127.0.0.1:8888/users/all')
    data = response.data ?? [];
  } catch (e) {
    console.error(e.message);
  } finally {
    isLoading.value = false;
  }
}

const removeDataItem = async (id) => {
  isLoading.value = true;
  try {
    const response = await axios.delete(`http://127.0.0.1:8888/users/${id}`)
    data = response.data ?? [];
  } catch (e) {
    console.error(e.message);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await loadData();
});

const handleRemove = async (id) => {
  await removeDataItem(id);
  await loadData();
}
</script>

<style lang="scss" scoped>

</style>
