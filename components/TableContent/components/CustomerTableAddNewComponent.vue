<template>
  <div class="customer-table">
    <div class="customer-table__panel-top">
      <UiButton @click="handleClickGoBack"><--- Go Back</UiButton>
    </div>
    <div class="customer-table__panel-main">
      <UiField label="title" :errorsFromData="errorsFromNewCustomer.title">
        <UiInput
          type="text"
          placeholder="Enter title customer"
          :value="dataNewCustomer.title"
          @input="handleInputTitle"
          @focus="handleFocusTitle"
          @blur="handleBlurTitle"
        />
      </UiField>
      <UiField label="user_id" :errorsFromData="errorsFromNewCustomer.user_id">
        <UiInput
          type="text"
          placeholder="Enter user_ID"
          :value="dataNewCustomer.user_id"
          @input="handleInputUserID"
          @focus="handleFocusUserID"
          @blur="handleBlurUserID"
        />
      </UiField>
      <UiField label="Status" :errorsFromData="errorsFromNewCustomer.status">
        <div>Select the status: active shop or not.</div>
        <div>
          <input
            type="checkbox"
            id="activeInput"
            :checked="dataNewCustomer.status === 'active'"
            @change="handleCheckboxChange('active')"
          />
          <label for="activeInput">active?</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="inactiveInput"
            :checked="dataNewCustomer.status === 'inactive'"
            @change="handleCheckboxChange('inactive')"
          />
          <label for="inactiveInput">inactive?</label>
        </div>
      </UiField>
    </div>
    <div>
      <button @click="handleSubmitNewCustomer">ADD NEW CUSTOMER</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

import { dataNewCustomer, errorsFromNewCustomer } from "../composables/data.js";
import {
  isTitleValid,
  isUserIdValid,
  isStatusVAlid,
  doValidateErrorForm,
  isNewCustomerFormValid,
} from "../composables/validationForNewCustomer.js";

// let isLoading = ref(true);

//title field ==================================================
const handleInputTitle = (event) => {
  dataNewCustomer.title = event.target.value;
  isTitleValid(dataNewCustomer.title, errorsFromNewCustomer.title);
};
const handleFocusTitle = () => {
  isTitleValid(dataNewCustomer.title, errorsFromNewCustomer.title);
};
const handleBlurTitle = () => {
  isTitleValid(dataNewCustomer.title, errorsFromNewCustomer.title);
};

//user_id field ==================================================
const handleInputUserID = (event) => {
  const inputValue = event.target.value;
  if (inputValue === "" || isNaN(Number(inputValue)))
    dataNewCustomer.user_id = inputValue;
  else dataNewCustomer.user_id = parseInt(inputValue);
  isUserIdValid(dataNewCustomer.user_id, errorsFromNewCustomer.user_id);
};
const handleFocusUserID = () => {
  isUserIdValid(dataNewCustomer.user_id, errorsFromNewCustomer.user_id);
};
const handleBlurUserID = () => {
  isUserIdValid(dataNewCustomer.user_id, errorsFromNewCustomer.user_id);
};
//status field=====================================================
const handleCheckboxChange = (status) => {
  if (dataNewCustomer.status === status) dataNewCustomer.status = "";
  else dataNewCustomer.status = status;
  isStatusVAlid(dataNewCustomer.status, errorsFromNewCustomer.status);
};
//submit ============================================================
const doRegisterNewShop = async (data = {}) => {
  return await axios.post("http://localhost:8888/customers", data);
};
const handleSubmitNewCustomer = async () => {
  doValidateErrorForm(dataNewCustomer, errorsFromNewCustomer);
  if (isNewCustomerFormValid(errorsFromNewCustomer)) {
    try {
      const POST_DATA = {
        title: dataNewCustomer.title,
        user_id: dataNewCustomer.user_id,
        status: dataNewCustomer.status,
      };
      await doRegisterNewShop(POST_DATA);

      dataNewCustomer.title = "";
      dataNewCustomer.user_id = "";
      dataNewCustomer.status = "";

      handleClickGoBack();
    } catch (error) {
      if (error?.response.status === 400) {
        const resDataErrors = error?.response.data.errors;
        Object.entries(resDataErrors).forEach(([key, errorMessage]) => {
          if (errorsFromNewCustomer[key] !== undefined) {
            errorsFromNewCustomer[key].isDirty = true;
            errorsFromNewCustomer[key].errors = errorMessage;
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
