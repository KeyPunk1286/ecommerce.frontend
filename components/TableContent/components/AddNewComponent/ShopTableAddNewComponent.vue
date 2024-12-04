<template>
  <div class="shop-table">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="shop-table__panel-title">Add new shop</div>
      <div class="shop-table__panel-main panel-main">
        <UiField label="Title shop" :errorsFromData="errorsFromNewShop.title">
          <UiInput
            type="text"
            placeholder="Enter title shop"
            :value="dataNewShop.title"
            @input="handleInput($event, 'title', isTitleValid, 'title')"
            @focus="handleFocus('title', isTitleValid, 'title')"
            @blur="handleBlur('title', isTitleValid, 'title')"
          />
        </UiField>

        <UiField
          label="customer_id"
          :errorsFromData="errorsFromNewShop.customer_id"
        >
          <select
            class="panel-main__select"
            v-model="dataNewShop.customer_id"
            @change="
              handleInput(null, 'customer_id', isCustomerIdValid, 'customer_id')
            "
            @focus="
              handleFocus('customer_id', isCustomerIdValid, 'customer_id')
            "
            @blur="handleBlur('customer_id', isCustomerIdValid, 'customer_id')"
          >
            <option value="">select customer_id</option>
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
      <div class="shop-table__button-panel button-panel">
        <UiButton @click="handleClickGoBack"
          ><i class="fa-solid fa-backward"></i> Back</UiButton
        >
        <button class="button-panel__save" @click="handleSubmitNewShop">
          <i class="fa-regular fa-floppy-disk"></i> Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, reactive } from "vue";

import {
  dataNewShop,
  errorsFromNewShop,
} from "@/components/TableContent/composables/data.js";
import {
  isCustomerIdValid,
  isTitleValid,
  doValidateErrorForm,
  isNewShopFormValid,
} from "@/components/TableContent/composables/validationForNewShop.js";

//===== click go back ================================================
const emit = defineEmits(["clickGoBack"]);
const handleClickGoBack = (event) => emit("clickGoBack", event);

const isLoading = ref(false);

const allCustomers = reactive([]);
const getAllCustomers = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:8888/customers/all");
    allCustomers.splice(0, allCustomers.length, ...response.data);
  } catch (error) {
    console.error("Error fetching customers:", error);
  } finally {
    isLoading.value = false;
  }
};

// validate block ===================================================
const validateField = (dataName, validate, errorFieldName) => {
  validate(dataNewShop[dataName], errorsFromNewShop[errorFieldName]);
};
const handleInput = (event, dataName, validate, errorFieldName) => {
  if (event && event.target) {
    dataNewShop[dataName] = event.target.value;
  }
  validateField(dataName, validate, errorFieldName);
};
const handleFocus = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};
const handleBlur = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
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

onMounted(async () => {
  await getAllCustomers();
});
</script>

<style lang="scss" scoped>
.shop-table {
  &__panel-title {
    text-align: center;
    font-size: 30px;
    padding: 20px 0 20px;
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
