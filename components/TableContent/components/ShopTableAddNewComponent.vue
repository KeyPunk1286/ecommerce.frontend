<template>
  <div class="shop-table">
    <div class="shop-table__panel-top">
      <UiButton @click="handleClickGoBack"
        ><i class="fa-solid fa-backward"></i> Back</UiButton
      >
    </div>
    <div class="shop-table__panel-main panel-main">
      <UiField label="Title shop" :errorsFromData="errorsFromNewShop.title">
        <UiInput
          type="text"
          placeholder="Enter title shop"
          :value="dataNewShop.title"
          @input="handleInputTitle"
          @focus="handleFocusTitle"
          @blur="handleBlurTitle"
        />
      </UiField>

      <UiField
        label="customer_id"
        :errorsFromData="errorsFromNewShop.customer_id"
      >
        <select
          class="panel-main__select"
          v-model="dataNewShop.customer_id"
          @change="handleSelectCustomerId"
          @focus="handleFocusCustomerId"
          @blur="handleBlurCustomerID"
        >
          <option
            v-for="customer in allCustomers"
            :key="customer.id"
            :value="customer.id"
          >
            {{ customer.id }}
          </option>
        </select>
      </UiField>
    </div>
    <div class="shop-table__button-save">
      <button @click="handleSubmitNewShop">ADD NEW SHOP</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, reactive } from "vue";

import { dataNewShop, errorsFromNewShop } from "../composables/data.js";
import {
  isCustomerIdValid,
  isTitleValid,
  doValidateErrorForm,
  isNewShopFormValid,
} from "../composables/validationForNewShop.js";

//===== click go back ================================================
const emit = defineEmits(["clickGoBack"]);
const handleClickGoBack = (event) => emit("clickGoBack", event);

//title=============================================================
const handleInputTitle = (event) => {
  dataNewShop.title = event.target.value;
  isTitleValid(dataNewShop.title, errorsFromNewShop.title);
};
const handleFocusTitle = () => {
  isTitleValid(dataNewShop.title, errorsFromNewShop.title);
};
const handleBlurTitle = () => {
  isTitleValid(dataNewShop.title, errorsFromNewShop.title);
};

//= select customer_id =================================================
const allCustomers = reactive([]);
const getAllCustomers = async () => {
  try {
    const response = await axios.get("http://localhost:8888/customers/all");
    allCustomers.splice(0, allCustomers.length, ...response.data);
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};
const handleSelectCustomerId = () => {
  isCustomerIdValid(dataNewShop.customer_id, errorsFromNewShop.customer_id);
};
const handleFocusCustomerId = () => {
  isCustomerIdValid(dataNewShop.customer_id, errorsFromNewShop.customer_id);
};
const handleBlurCustomerID = () => {
  isCustomerIdValid(dataNewShop.customer_id, errorsFromNewShop.customer_id);
};
//= select ================================================================

// submit new shop ==================================================
const doRegisterNewShop = async (data = {}) => {
  return await axios.post("http://localhost:8888/shop", data);
};
const handleSubmitNewShop = async () => {
  doValidateErrorForm(dataNewShop, errorsFromNewShop);
  if (isNewShopFormValid(errorsFromNewShop)) {
    try {
      const POST_DATA = {
        customer_id: dataNewShop.customer_id,
        title: dataNewShop.title,
      };
      await doRegisterNewShop(POST_DATA);

      dataNewShop.customer_id = "";
      dataNewShop.title = "";

      handleClickGoBack();
    } catch (error) {
      if (error?.response.status === 400) {
        const resDataErrors = error?.response.data.errors;
        Object.entries(resDataErrors).forEach(([key, errorMessage]) => {
          if (errorsFromNewShop[key] !== undefined) {
            errorsFromNewShop[key].isDirty = true;
            errorsFromNewShop[key].errors = errorMessage;
          }
        });
      }
    }
  }
};

onMounted(async () => {
  await getAllCustomers();
});
</script>

<style lang="scss" scoped>
.shop-table {
  &__panel-top {
    padding: 20px;
    background-color: #112121;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    button {
      background-color: #ffffff;
      padding: 10px 5px;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #112121;
      }
    }
  }
  &__panel-main {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin-bottom: 20px;
  }
  &__button-save {
    display: flex;
    justify-content: center;
    button {
      background-color: #ffffff;
      padding: 10px 5px;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #112121;
      }
    }
  }
  .panel-main {
    &__select {
      padding: 5px;
      min-width: 100px;
      outline: none;
    }
  }
}
</style>
