<template>
  <div class="table-content__parent">
    <div class="table-content__left-side">
      <TableNameList
        :items="tableListObject"
        @change="handleChangeTableComponent"
      />
    </div>
    <div class="table-content__right-side">
      <component :is="activeTableComponent.tableComponent" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import TableNameList from "../TableContent/components/TableNameList.vue";
import UsersTableComponent from "../TableContent/components/UsersTableComponent.vue";
import ShopsTableComponent from "../TableContent/components/ShopsTableComponent.vue";
import CustomersTableComponent from "../TableContent/components/CustomersTableComponent.vue";
const activeTable = ref(0);
const tableListObject = reactive([
  {
    title: "Users",
    tableComponent: UsersTableComponent,
  },
  {
    title: "Shops",
    tableComponent: ShopsTableComponent,
  },
  {
    title: "Customers",
    tableComponent: CustomersTableComponent,
  },
]);
const handleChangeTableComponent = (index) => {
  activeTable.value = index;
};
const activeTableComponent = computed(() => {
  return tableListObject[activeTable.value];
});
</script>

<style lang="scss" scoped></style>
