<template>
  <div class="customer-table">
    <div class="customer-table__panel-title">Add new customer</div>
    <div class="customer-table__panel-main panel-main">
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

      <UiField label="user_id">
        <select
          class="panel-main__select"
          v-model="dataNewCustomer.user_id"
          @change="handleSelectUserId"
          @focus="handleFocusUserID"
          @blur="handleBlurUserID"
        >
          <option value="">select user_id</option>
          <option v-for="user in allUserId" :key="user.id" :value="user.id">
            {{ user.id }}
          </option>
        </select>
      </UiField>

      <UiField
        class="panel-main__checkbox"
        label="Status"
        :errorsFromData="errorsFromNewCustomer.status"
      >
        <div>Select the status: active shop or not.</div>
        <div>
          <input
            type="checkbox"
            id="activeInput"
            :checked="dataNewCustomer.status === 'active'"
            @change="handleCheckboxChange"
          />
          <label for="activeInput">active?</label>
        </div>
      </UiField>
    </div>
    <div class="customer-table__button-panel button-panel">
      <UiButton @click="handleClickGoBack"
        ><i class="fa-solid fa-backward"></i> Back</UiButton
      >
      <button class="button-panel__save" @click="handleSubmitNewCustomer">
        <i class="fa-regular fa-floppy-disk"></i> Add
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, onMounted } from "vue";

import {
  dataNewCustomer,
  errorsFromNewCustomer,
} from "@/components/TableContent/composables/data.js";
import {
  isTitleValid,
  isUserIdValid,
  isStatusVAlid,
  doValidateErrorForm,
  isNewCustomerFormValid,
} from "@/components/TableContent/composables/validationForNewCustomer.js";

const emit = defineEmits(["clickGoBack"]);
const handleClickGoBack = (event) => emit("clickGoBack", event);

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
const allUserId = reactive([]);
const getAllUserId = async () => {
  try {
    const response = await axios.get("http://localhost:8888/users/all");
    allUserId.splice(0, allUserId.length, ...response.data);
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};
const handleSelectUserId = () => {
  isUserIdValid(dataNewCustomer.user_id, errorsFromNewCustomer.user_id);
};
const handleFocusUserID = () => {
  isUserIdValid(dataNewCustomer.user_id, errorsFromNewCustomer.user_id);
};
const handleBlurUserID = () => {
  isUserIdValid(dataNewCustomer.user_id, errorsFromNewCustomer.user_id);
};
//status field=====================================================
const handleCheckboxChange = (event) => {
  dataNewCustomer.status = event.target.checked ? "active" : "inactive";

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

onMounted(async () => {
  await getAllUserId();
});
</script>

<style lang="scss" scoped>
.customer-table {
  &__panel-title {
    text-align: center;
    font-size: 30px;
    padding: 20px 15px;
    background-color: #112121;
    margin-bottom: 40px;
  }
  &__panel-main {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin-bottom: 20px;
  }

  .panel-main {
    &__checkbox {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      input {
        margin-right: 5px;
      }
    }
    &__select {
      padding: 5px;
      min-width: 100px;
      outline: none;
    }
  }
  .button-panel {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    &__save {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      background-color: #ffffff;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #112121;
      }
    }
  }
}
</style>
