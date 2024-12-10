<template>
  <div class="shop-edit">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="shop-edit__panel-title">
        Edit shop: <span>{{ shop.title }}</span>
      </div>
      <div class="shop-edit__panel-main panel-main">
        <UiField label="Title shop" :errorsFromData="errorsFromNewShop.title">
          <UiInput
            type="text"
            placeholder="Enter title shop"
            :value="shop.title"
            @input="handleInput($event, 'title', isTitleValid, 'title')"
            @focus="handleFocus('title', isTitleValid, 'title')"
            @blur="handleBlur('title', isTitleValid, 'title')"
          />
        </UiField>

        <UiField
          label="Customer_id"
          :errorsFromData="errorsFromNewShop.customer_id"
        >
          <select
            class="panel-main__select"
            v-model="shop.customer_id"
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
              v-for="customer in allCustomerId"
              :key="customer.id"
              :value="customer.id"
            >
              {{ customer.id }} - {{ customer.title }}
            </option>
          </select>
        </UiField>

        <UiField label="is_active field">
          <div class="panel-main__input">
            <input
              id="trueField"
              type="checkbox"
              v-model="shop.is_active"
              @change="handleCheckBox"
            />
            <label for="trueField">true</label>
          </div>
        </UiField>
      </div>

      <div class="shop-edit__button-save button-save">
        <button class="button-save__click-back" @click="handleClickGoBack">
          <i class="fa-solid fa-backward"></i> Back
        </button>
        <button class="button-save__click-save" @click="handleSaveChanges">
          <i class="fa-regular fa-floppy-disk"></i> Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import { errorsFromNewShop } from "@/components/TableContent/composables/data.js";
import {
  isCustomerIdValid,
  isTitleValid,
  doValidateErrorForm,
  isNewShopFormValid,
} from "@/components/TableContent/composables/validationForNewShop.js";
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
const shop = ref({});
const allCustomerId = reactive([]);
const getAllCustomerId = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:8888/customers/all");
    allCustomerId.splice(0, allCustomerId.length, ...response?.data);
  } catch (error) {
    console.error("Error fetching customer_id data:", error);
  } finally {
    isLoading.value = false;
  }
};
const loadShopById = async () => {
  isLoading.value = true;
  try {
    const shopData = await axios.get(
      `http://localhost:8888/shop/${props.selectId}`
    );
    shop.value = shopData?.data;
  } catch (error) {
    console.error("Error fetching shop data:", error);
  } finally {
    isLoading.value = false;
  }
};

const validateField = (dataName, validate, errorFieldName) => {
  validate(shop.value[dataName], errorsFromNewShop[errorFieldName]);
};

const handleInput = (event, dataName, validate, errorFieldName) => {
  if (event && event.target) {
    shop.value[dataName] = event.target.value;
  }
  validateField(dataName, validate, errorFieldName);
};
const handleFocus = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};
const handleBlur = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};

// save changes ============================================
const handleSaveChanges = async () => {
  doValidateErrorForm(shop.value, errorsFromNewShop);
  if (isNewShopFormValid(errorsFromNewShop)) {
    try {
      await axios.put(
        `http://localhost:8888/shop/${props.selectId}`,
        shop.value
      );

      shop.value = {};

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
            if (errorsFromNewShop[key] !== undefined) {
              errorsFromNewShop[key].isDirty = true;
              errorsFromNewShop[key].errors = errorMessage;
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
  await loadShopById();
  await getAllCustomerId();
});
</script>

<style lang="scss" scoped>
.shop-edit {
  &__panel-title {
    text-align: center;
    font-size: 30px;
    padding: 20px 10px;
    background-color: #112121;
    margin-bottom: 40px;
  }
  &__panel-main {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  &__button-save {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
}
.panel-main {
  &__select {
    padding: 5px;
    min-width: 100px;
    outline: none;
  }
  &__input {
    input {
      margin-right: 10px;
    }
  }
}
.button-save {
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
