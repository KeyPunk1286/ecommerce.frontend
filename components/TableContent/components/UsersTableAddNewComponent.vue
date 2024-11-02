<template>
  <div class="user-table">
    <div v-if="isLoading">Loading...</div>
    <div v-else>

      <div class="user-table__panel-top">

        <UiButton @click="handleClickGoBack"><--- Go Back</UiButton>

      </div>

      <div class="user-table__panel-main">

        <UiField label="Email">
          <UiInput placeholder="Enter Email"/>
        </UiField>

        <UiField label="First name">
          <UiInput placeholder="Enter First name"/>
        </UiField>

        <UiField label="Second name">
          <UiInput placeholder="Enter Second name"/>
        </UiField>

        <UiField label="Last name">
          <UiInput placeholder="Enter last name"/>
        </UiField>

        <div class="user-table__panel-bottom">
          <UiButton @click="handleClickSave">Save</UiButton>
        </div>

      </div>

<!--      <table>-->
<!--        <thead>-->
<!--          <tr>-->
<!--            <th>Email</th>-->
<!--            <th>First name</th>-->
<!--            <th>Second name</th>-->
<!--            <th>Last name</th>-->
<!--            <th>Created</th>-->
<!--            <th>Updated</th>-->
<!--          </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--          <tr v-for="row in dataTable" :key="row.id">-->
<!--            <td>{{ row.email }}</td>-->
<!--            <td>{{ row.firstname }}</td>-->
<!--            <td>{{ row.secondname }}</td>-->
<!--            <td>{{ row.lastname }}</td>-->
<!--            <td>{{ row.created_at }}</td>-->
<!--            <td>{{ row.updated_at }}</td>-->
<!--            <td @click="handleRemoveUser(row.id)" style="cursor: pointer">x</td>-->
<!--          </tr>-->
<!--        </tbody>-->
<!--      </table>-->
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import UiField from "~/components/UiField.vue";

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


const emit = defineEmits(["clickGoBack"]);

const handleClickGoBack = (event) => emit("clickGoBack", event);

const handleClickSave = (event) => {
  handleClickGoBack(event)
}
</script>

<style lang="scss" scoped>

.user-table {
  &__panel-top {
    padding: 20px;
    background-color: #112121;
    display: flex;
    justify-content: flex-start;
  }

  &__panel-main {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__panel-bottom {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
