<template>
  <div class="shop-edit">
    <div><button @click="handleClickGoBack"><---clickGoBack</button></div>

    <UiField
      label="Customer_id"
      :errorsFromData="errorsFromNewShop.customer_id"
    >
      <UiInput
        type="text"
        placeholder="Enter customer_id"
        :value="shop.customer_id"
        @input="handleInputCustomerId"
        @focus="handleFocusCustomerId"
        @blur="handleBlurCustomerId"
      />
    </UiField>

    <UiField label="Title shop" :errorsFromData="errorsFromNewShop.title">
      <UiInput
        type="text"
        placeholder="Enter title shop"
        :value="shop.title"
        @input="handleInputTitleShop"
        @focus="handleFocusTitleShop"
        @blur="handleBlurTitleShop"
      />
    </UiField>
    <UiField label="is_active field">
      <div>
        <input
          id="trueField"
          type="checkbox"
          :checked="shop.is_active === true"
          @change="handleCheckboxChange(true)"
        />
        <label for="trueField">true</label>
      </div>
      <div>
        <input
          id="falseField"
          type="checkbox"
          :checked="shop.is_active === false"
          @change="handleCheckboxChange(false)"
        />
        <label for="falseField">false</label>
      </div>
    </UiField>

    <div><button @click="handleSaveChanges">Save Changes</button></div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { errorsFromNewShop } from "@/components/TableContent/composables/data.js";
import {
  isCustomerIdValid,
  isTitleValid,
  doValidateErrorForm,
  isNewShopFormValid,
} from "@/components/TableContent/composables/validationForNewShop.js";

const emit = defineEmits(["clickGoBack"]);
const handleClickGoBack = (event) => emit("clickGoBack", event);

const props = defineProps({
  selectId: {
    type: Number,
    required: true,
  },
});

const shop = ref({});
const loadShopById = async () => {
  try {
    const shopData = await axios.get(
      `http://localhost:8888/shop/${props.selectId}`
    );
    shop.value = shopData?.data;
  } catch (error) {
    console.error("Error fetching shop data:", error);
  }
};

//customer_id field ========================================
const handleInputCustomerId = (event) => {
  shop.value.customer_id = event.target.value;
  isCustomerIdValid(shop.value.customer_id, errorsFromNewShop.customer_id);
};
const handleFocusCustomerId = () => {
  isCustomerIdValid(shop.value.customer_id, errorsFromNewShop.customer_id);
};
const handleBlurCustomerId = () => {
  isCustomerIdValid(shop.value.customer_id, errorsFromNewShop.customer_id);
};
//title shop id ============================================
const handleInputTitleShop = (event) => {
  shop.value.title = event.target.value;
  isTitleValid(shop.value.title, errorsFromNewShop.title);
};
const handleFocusTitleShop = () => {
  isTitleValid(shop.value.title, errorsFromNewShop.title);
};
const handleBlurTitleShop = () => {
  isTitleValid(shop.value.title, errorsFromNewShop.title);
};
//true false field ==========================================
const handleCheckboxChange = (value) => {
  if (shop.value.is_active === value) shop.value.is_active = null;
  else shop.value.is_active = value;
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
  await loadShopById();
});
</script>

<style lang="scss" scoped></style>
