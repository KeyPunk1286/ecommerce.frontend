<template>
  <div class="title-page">{{ pageName }} page</div>
  <div class="table__content">
    <div class="table__left-side left-side">
      <ul class="left-side__list">
        <li
          v-for="table in tables"
          :key="table"
          @click="onSelectTable(table)"
          class="left-side__item"
        >
          {{ table }}
        </li>
      </ul>
    </div>
    <div class="table-container">
      <table class="table">
        <thead class="table__head">
          <tr class="table__row">
            <th
              v-for="(value, key) in tablesData[0]"
              :key="key"
              class="table__row-name"
            >
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="row in tablesData" :key="row.id" class="table__row">
            <td v-for="(value, key) in row" :key="key" class="table__cell">
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTableStore } from "../stores/tableStore.js";

definePageMeta({
  middleware: "auth",
});

const tableStore = useTableStore();
const { tables, tablesData } = storeToRefs(tableStore);
const { fetchTables, fetchTablesData } = tableStore;

const pageName = ref("Home");

const onSelectTable = async (table) => {
  await fetchTablesData(table.toLowerCase());
};

onMounted(() => {
  fetchTables();
});
</script>

<style scoped lang="scss">
.title-page {
  margin-bottom: 50px;
}
.table__content {
  display: flex;
  gap: 50px;
}
.left-side {
  padding-right: 50px;
  border-right: 3px gainsboro solid;

  &__list {
  }

  &__item {
    margin-bottom: 15px;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0px;
    }
  }
}
.table {
  border: 3px gainsboro solid;
  border-radius: 3px;
  overflow: hidden;
  padding: 10px;

  &__head {
  }

  &__row {
  }

  &__row-name {
    border-right: 1px gainsboro solid;
    padding: 5px 3px;
  }

  &__body {
  }

  &__cell {
    border-right: 1px gainsboro solid;
    padding: 5px 3px;
  }
}
</style>
