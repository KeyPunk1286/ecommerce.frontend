<template>
  <div class="customer-edit">
    <div><button @click="handleClickGoBack"><---Go back</button></div>
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
      <UiInput
        type="text"
        placeholder="Enter user_id"
        :value="customer.user_id"
        @input="handleInputUserId"
        @focus="handleFocusUserId"
        @blur="handleBlurUserId"
      />
    </UiField>
    <UiField label="Status" :errorsFromData="errorsFromNewCustomer.status">
      <div>
        <input
          id="statusActive"
          type="checkbox"
          :checked="customer.status === 'active'"
          @change="handleCheckboxChange('active')"
        />
        <label for="statusActive">active</label>
      </div>
      <div>
        <input
          id="statusInactive"
          type="checkbox"
          :checked="customer.status === 'inactive'"
          @change="handleCheckboxChange('inactive')"
        />
        <label for="statusInactive">inactive</label>
      </div>
    </UiField>
    <div><button @click="handleSaveChanges">Save Changes</button></div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
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
const handleInputUserId = (event) => {
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
});
</script>

<style lang="scss" scoped></style>
