<template>
  <div class="customer-table">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="customer-table__panel-title">Add new customer</div>
      <div class="customer-table__panel-main panel-main">
        <UiField label="title" :errorsFromData="errorsFromNewCustomer.title">
          <UiInput
            type="text"
            placeholder="Enter title customer"
            :value="dataNewCustomer.title"
            @input="handleInput($event, 'title', isTitleValid, 'title')"
            @focus="handleFocus('title', isTitleValid, 'title')"
            @blur="handleBlur('title', isTitleValid, 'title')"
          />
        </UiField>

        <UiField
          label="user_id"
          :errorsFromData="errorsFromNewCustomer.user_id"
        >
          <select
            class="panel-main__select"
            v-model="dataNewCustomer.user_id"
            @change="handleInput(null, 'user_id', isUserIdValid, 'user_id')"
            @focus="handleFocus('user_id', isUserIdValid, 'user_id')"
            @blur="handleBlur('user_id', isUserIdValid, 'user_id')"
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
              @change="handleInput($event, 'status', isStatusVAlid, 'status')"
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
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import { toast } from "vue3-toastify";

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

let isLoading = ref(false);

// load  user id =====================================================
const allUserId = reactive([]);
const getAllUserId = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:8888/users/all");
    allUserId.splice(0, allUserId.length, ...response.data);
  } catch (error) {
    console.error("Error fetching customers:", error);
  } finally {
    isLoading.value = false;
  }
};

// validate section =========================================================
const validateField = (dataName, validate, errorFieldName) => {
  validate(dataNewCustomer[dataName], errorsFromNewCustomer[errorFieldName]);
};
const handleInput = (event, dataName, validate, errorFieldName) => {
  const inputType = event?.target?.type;
  if (inputType === "checkbox") {
    dataNewCustomer[dataName] = event.target.checked ? "active" : "inactive";
  } else if (event && event.target) {
    dataNewCustomer[dataName] = event.target.value;
  }
  validateField(dataName, validate, errorFieldName);
};
const handleFocus = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};
const handleBlur = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
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
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message || error?.response?.data?.error;
      const resDataErrors = error?.response?.data?.errors;
      if (status === 400) {
        if (message) {
          toast.error(message);
        }
        if (resDataErrors) {
          Object.entries(resDataErrors).forEach(([key, errorMessage]) => {
            if (errorsFromNewCustomer[key] !== undefined) {
              errorsFromNewCustomer[key].isDirty = true;
              errorsFromNewCustomer[key].errors = errorMessage;
            }
          });
        }
      } else {
        toast.error(message || "An unexpected error occurred.");
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
