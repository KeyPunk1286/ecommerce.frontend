<template>
  <div class="shop-table">
    <div class="shop-table__panel-top">
      <UiButton @click="handleClickGoBack"><--- Go Back</UiButton>
    </div>
    <div class="shop-table__panel-main">
      <UiField
        label="customer_id"
        :errorsFromData="errorsFromNewShop.customer_id"
      >
        <UiInput
          type="text"
          placeholder="Enter customer_id"
          :value="dataNewShop.customer_id"
          @input="handleInputCustomerId"
          @focus="handleFocusCustomerId"
          @blur="handleBlurCustomerID"
        />
      </UiField>

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
    </div>
    <div><button @click="handleSubmitNewShop">ADD NEW SHOP</button></div>
  </div>
</template>

<script setup>
import axios from "axios";
// import { ref, onMounted, reactive } from "vue";

import { dataNewShop, errorsFromNewShop } from "../composables/data.js";
import {
  isCustomerIdValid,
  isTitleValid,
  doValidateErrorForm,
  isNewShopFormValid,
} from "../composables/validationForNewShop.js";

//customer_id =====================================================
const handleInputCustomerId = (event) => {
  const inputValue = event.target.value;

  if (inputValue === "" || isNaN(Number(inputValue))) {
    dataNewShop.customer_id = inputValue;
  } else {
    dataNewShop.customer_id = parseInt(inputValue, 10);
  }
  isCustomerIdValid(dataNewShop.customer_id, errorsFromNewShop.customer_id);
};
const handleFocusCustomerId = () => {
  isCustomerIdValid(dataNewShop.customer_id, errorsFromNewShop.customer_id);
};
const handleBlurCustomerID = () => {
  isCustomerIdValid(dataNewShop.customer_id, errorsFromNewShop.customer_id);
};
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

const emit = defineEmits(["clickGoBack"]);
const handleClickGoBack = (event) => emit("clickGoBack", event);
</script>

<style lang="scss" scoped>
.user-table {
  &__panel-top {
    padding: 20px;
    background-color: #112121;
    display: flex;
    justify-content: flex-start;
  }
}
</style>
