<template>
  <div class="customer-edit">
    <div class="customer-edit__title-panel">
      Customer edit: {{ customer.title }}
    </div>
    <div class="customer-edit__main-panel main-panel">
      <UiField label="title" :errorsFromData="errorsFromNewCustomer.title">
        <UiInput
          type="text"
          placeholder="Enter title customer"
          :value="customer.title"
          @input="handleInputTitle"
          @focus="handleFocusTitle"
          @blur="handleBlurTitle"
        />
      </UiField>

      <UiField label="user_id" :errorsFromData="errorsFromNewCustomer.user_id">
        <select
          class="main-panel__select"
          :value="customer.user_id"
          @change="handleUserIdChange"
          @focus="handleFocusUserId"
          @blur="handleBlurUserId"
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
            @change="handleCheckboxChange('active')"
          />
          <label for="statusActive">active</label>
        </div>
        <div class="main-panel__input">
          <input
            id="statusInactive"
            type="checkbox"
            :checked="customer.status === 'inactive'"
            @change="handleCheckboxChange('inactive')"
          />
          <label for="statusInactive">inactive</label>
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

const emit = defineEmits(["clickGoBack"]);
const handleClickGoBack = (event) => emit("clickGoBack", event);

const props = defineProps({
  selectId: {
    type: Number,
    required: true,
  },
});
const customer = ref({});
const allUsersId = reactive([]);
const loadDataCustomer = async () => {
  try {
    const dataCustomerById = await axios.get(
      `http://localhost:8888/customers/${props.selectId}`
    );
    customer.value = dataCustomerById?.data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
};
const getAllUsersId = async () => {
  try {
    const response = await axios.get("http://localhost:8888/users/all");
    allUsersId.splice(0, allUsersId.length, ...response?.data);
  } catch (error) {
    console.error("Error fetching users_id data:", error);
  }
};
//title field =============================================
const handleInputTitle = (event) => {
  customer.value.title = event.target.value;
  isTitleValid(customer.value.title, errorsFromNewCustomer.title);
};
const handleFocusTitle = () => {
  isTitleValid(customer.value.title, errorsFromNewCustomer.title);
};
const handleBlurTitle = () => {
  isTitleValid(customer.value.title, errorsFromNewCustomer.title);
};
//user_id field ============================================
const handleUserIdChange = (event) => {
  customer.value.user_id = event.target.value;
  isUserIdValid(customer.value.user_id, errorsFromNewCustomer.user_id);
};
const handleFocusUserId = () => {
  isUserIdValid(customer.value.user_id, errorsFromNewCustomer.user_id);
};
const handleBlurUserId = () => {
  isUserIdValid(customer.value.user_id, errorsFromNewCustomer.user_id);
};
//status field ============================================
const handleCheckboxChange = (status) => {
  if (customer.value.status === status) customer.value.status = "";
  else customer.value.status = status;
  isStatusVAlid(customer.value.status, errorsFromNewCustomer.status);
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
