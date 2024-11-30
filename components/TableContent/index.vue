<template>
  <div class="table-content">
    <div class="table-content__left-side">
      <TableNameList
        :items="tableListObject"
        @change="handleChangeTableComponent"
      />
    </div>
    <div class="table-content__right-side">
      <component
        :is="activeTableComponent"
        :selectId="idSelect"
        @clickGoBack="handleClickGoBack"
        @switch="handleSwitch"
        @switchToEdit="handleEditUser"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import TableNameList from "../TableContent/components/TableNameList.vue";
import UsersTableComponent from "../TableContent/components/UsersTableComponent.vue";
import UsersTableAddNewComponent from "../TableContent/components/AddNewComponent/UsersTableAddNewComponent.vue";
import UsersEditComponent from "../TableContent/components/EditComponent/UsersEditComponent.vue";
import ShopsTableComponent from "../TableContent/components/ShopsTableComponent.vue";
import ShopsTableAddNewComponent from "../TableContent/components/AddNewComponent/ShopTableAddNewComponent.vue";
import ShopEditComponent from "../TableContent/components/EditComponent/ShopEditComponent.vue";
import CustomersTableComponent from "../TableContent/components/CustomersTableComponent.vue";
import CustomersTableAddNewComponent from "../TableContent/components/AddNewComponent/CustomerTableAddNewComponent.vue";
import CustomersEditComponents from "../TableContent/components/EditComponent/CustomersEditComponents.vue";
import ProductsTableComponent from "../TableContent/components/ProductsTableComponent.vue";
import ProductTableAddNewComponent from "../TableContent/components/AddNewComponent/ProductTableAddNewComponent.vue";
import ProductEditComponent from "../TableContent/components/EditComponent/ProductEditComponent.vue";

const activeTable = ref(0);
const idSelect = ref(null);
const tableListObject = reactive([
  {
    title: "Users",
    tableComponent: UsersTableComponent,
    addNew: {
      component: UsersTableAddNewComponent,
      active: false,
    },
    editComponent: {
      component: UsersEditComponent,
      active: false,
    },
  },
  {
    title: "Shops",
    tableComponent: ShopsTableComponent,
    addNew: {
      component: ShopsTableAddNewComponent,
      active: false,
    },
    editComponent: {
      component: ShopEditComponent,
      active: false,
    },
  },
  {
    title: "Customers",
    tableComponent: CustomersTableComponent,
    addNew: {
      component: CustomersTableAddNewComponent,
      active: false,
    },
    editComponent: {
      component: CustomersEditComponents,
      active: false,
    },
  },
  {
    title: "Products",
    tableComponent: ProductsTableComponent,
    addNew: {
      component: ProductTableAddNewComponent,
      active: false,
    },
    editComponent: {
      component: ProductEditComponent,
      active: false,
    },
  },
]);

const handleChangeTableComponent = (index) => {
  activeTable.value = index;
};

const activeTableComponent = computed(() => {
  const activeComponent = tableListObject[activeTable.value];

  if (activeComponent?.addNew.active) {
    return activeComponent?.addNew.component;
  } else if (activeComponent?.editComponent.active) {
    return activeComponent?.editComponent.component;
  } else {
    return activeComponent?.tableComponent;
  }

  // return activeTableComponent?.addNew.active
  //   ? activeTableComponent?.addNew.component
  //   : activeTableComponent.tableComponent;
});

const handleSwitch = () => {
  tableListObject[activeTable.value].addNew.active = true;
};

const handleClickGoBack = () => {
  tableListObject[activeTable.value].addNew.active = false;
  tableListObject[activeTable.value].editComponent.active = false;
};

const handleEditUser = (event) => {
  idSelect.value = event;
  tableListObject[activeTable.value].editComponent.active = true;
};
</script>

<style lang="scss" scoped>
.table-content {
  display: flex;
  &__left-side {
    background-color: #112121;
    flex: 1 1 auto;
    max-width: 200px;
    margin-bottom: 20px;
  }
  &__right-side {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
}
</style>
