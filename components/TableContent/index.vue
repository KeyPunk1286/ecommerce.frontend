<template>
  <div class="table-content__parent">
    <div class="table-content__left-side">
      <TableNameList
        :items="tableListObject"
        @change="handleChangeTableComponent"
      />
    </div>
    <div class="table-content__right-side">
      <component :is="activeTableComponent"
                 @clickGoBack="handleClickGoBack"
                 @switch="handleSwitch"
      />
    </div>
  </div>
</template>

<script setup>

import { reactive, ref, computed } from "vue";
import TableNameList from "../TableContent/components/TableNameList.vue";
import UsersTableComponent from "../TableContent/components/UsersTableComponent.vue";
import UsersTableAddNewComponent from "../TableContent/components/UsersTableAddNewComponent.vue";
import ShopsTableComponent from "../TableContent/components/ShopsTableComponent.vue";
import ShopsTableAddNewComponent from "../TableContent/components/ShopTableAddNewComponent.vue";
import CustomersTableComponent from "../TableContent/components/CustomersTableComponent.vue";
import CustomersTableAddNewComponent from "../TableContent/components/CustomerTableAddNewComponent.vue";

const activeTable = ref(0);
const tableListObject = reactive([
  {
    title: "Users",
    tableComponent: UsersTableComponent,
    addNew: {
      component: UsersTableAddNewComponent,
      active: false,
    },
  },
  {
    title: "Shops",
    tableComponent: ShopsTableComponent,
    addNew: {
      component: ShopsTableAddNewComponent,
      active: false,
    }
  },
  {
    title: "Customers",
    tableComponent: CustomersTableComponent,
    addNew: {
      component: CustomersTableAddNewComponent,
      active: false,
    }
  },
]);

const handleChangeTableComponent = (index) => {
  activeTable.value = index;
};

const activeTableComponent = computed(() => {
  const activeTableComponent = tableListObject[activeTable.value];

  return activeTableComponent?.addNew.active ?
      activeTableComponent?.addNew.component : activeTableComponent.tableComponent;
});

const handleSwitch = () => {
  return tableListObject[activeTable.value].addNew.active = true;
}

const handleClickGoBack = () => {
  return tableListObject[activeTable.value].addNew.active = false;
}

</script>

<style lang="scss" scoped></style>
