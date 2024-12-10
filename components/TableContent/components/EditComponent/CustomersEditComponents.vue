<template>
  <div class="customer-edit">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="customer-edit__title-panel">
        Customer edit: {{ customer.title }}
      </div>
      <div class="customer-edit__main-panel main-panel">
        <UiField label="title" :errorsFromData="errorsFromNewCustomer.title">
          <UiInput
            type="text"
            placeholder="Enter title customer"
            :value="customer.title"
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
            class="main-panel__select"
            v-model="customer.user_id"
            @change="handleInput(null, 'user_id', isUserIdValid, 'user_id')"
            @focus="handleFocus('user_id', isUserIdValid, 'user_id')"
            @blur="handleBlur('user_id', isUserIdValid, 'user_id')"
          >
            <option value="">select user</option>
            <option v-for="user in allUsersId" :key="user.id" :value="user.id">
              {{ user.id }} - {{ user.email }}
            </option>
          </select>
        </UiField>

        <UiField label="Status" :errorsFromData="errorsFromNewCustomer.status">
          <div class="main-panel__input">
            <input
              id="statusActive"
              type="checkbox"
              :checked="customer.status === 'active'"
              @change="handleCheckboxChange"
            />
            <label for="statusActive">active</label>
          </div>
        </UiField>
      </div>

      <div class="customer-edit__button-panel button-panel">
        <button class="button-panel__click-back" @click="handleClickGoBack">
          <i class="fa-solid fa-backward"></i> Back
        </button>
        <button class="button-panel__click-save" @click="handleSaveChanges">
          <i class="fa-regular fa-floppy-disk"></i> Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import { errorsFromNewCustomer } from "@/components/TableContent/composables/data.js";
import {
  isTitleValid,
  isUserIdValid,
  isStatusVAlid,
  doValidateErrorForm,
  isNewCustomerFormValid,
} from "@/components/TableContent/composables/validationForNewCustomer.js";
import { toast } from "vue3-toastify";

const emit = defineEmits(["clickGoBack"]);
const handleClickGoBack = (event) => emit("clickGoBack", event);

const props = defineProps({
  selectId: {
    type: Number,
    required: true,
  },
});

let isLoading = ref(false);
const customer = ref({});
const allUsersId = reactive([]);
const loadDataCustomer = async () => {
  isLoading.value = true;
  try {
    const dataCustomerById = await axios.get(
      `http://localhost:8888/customers/${props.selectId}`
    );
    customer.value = dataCustomerById?.data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
  } finally {
    isLoading.value = false;
  }
};
const getAllUsersId = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:8888/users/all");
    allUsersId.splice(0, allUsersId.length, ...response?.data);
  } catch (error) {
    console.error("Error fetching users_id data:", error);
  } finally {
    isLoading.value = false;
  }
};

// validate block =====================
const validateField = (dataName, validate, errorFieldName) => {
  validate(customer.value[dataName], errorsFromNewCustomer[errorFieldName]);
};
const handleInput = (event, dataName, validate, errorFieldName) => {
  if (event && event.target) {
    customer.value[dataName] = event.target.value;
  }
  validateField(dataName, validate, errorFieldName);
  console.log(customer.value.user_id);
};
const handleFocus = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};
const handleBlur = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};

//status field ============================================
const handleCheckboxChange = (status) => {
  customer.value.status =
    customer.value.status === "active" ? "inactive" : "active";
  validateField("status", isStatusVAlid, "status");
};
// save changes ============================================
const handleSaveChanges = async () => {
  doValidateErrorForm(customer.value, errorsFromNewCustomer);
  if (isNewCustomerFormValid(errorsFromNewCustomer)) {
    try {
      await axios.put(
        `http://localhost:8888/customers/${props.selectId}`,
        customer.value
      );

      customer.value = {};

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
  await loadDataCustomer();
  await getAllUsersId();
});
</script>

<style lang="scss" scoped>
.customer-edit {
  &__title-panel {
    text-align: center;
    font-size: 30px;
    padding: 20px 10px;
    background-color: #112121;
    margin-bottom: 40px;
  }
  &__main-panel {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  &__button-panel {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
}
.main-panel {
  &__select {
    padding: 5px;
    min-width: 100px;
    outline: none;
  }
  &__input {
    margin-bottom: 15px;
    input {
      margin-right: 10px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.button-panel {
  &__click-back {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #ffffff;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #112121;
    }
  }
  &__click-save {
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
</style>
