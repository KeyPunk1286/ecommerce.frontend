<template>
  <div class="shop-edit">
    <div class="shop-edit__panel-title">
      Edit shop: <span>{{ shop.title }}</span>
    </div>
    <div class="shop-edit__panel-main panel-main">
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

      <UiField
        label="Customer_id"
        :errorsFromData="errorsFromNewShop.customer_id"
      >
        <select
          class="panel-main__select"
          :value="shop.customer_id"
          @change="handleCustomerIdChange"
          @focus="handleFocusCustomerId"
          @blur="handleBlurCustomerId"
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
            :checked="shop.is_active === true"
            @change="handleCheckboxChange(true)"
          />
          <label for="trueField">true</label>
        </div>
        <div class="panel-main__input">
          <input
            id="falseField"
            type="checkbox"
            :checked="shop.is_active === false"
            @change="handleCheckboxChange(false)"
          />
          <label for="falseField">false</label>
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

const emit = defineEmits(["clickGoBack"]);
const handleClickGoBack = (event) => emit("clickGoBack", event);

const props = defineProps({
  selectId: {
    type: Number,
    required: true,
  },
});

const shop = ref({});
const allCustomerId = reactive([]);
const getAllCustomerId = async () => {
  try {
    const response = await axios.get("http://localhost:8888/customers/all");
    allCustomerId.splice(0, allCustomerId.length, ...response?.data);
  } catch (error) {
    console.error("Error fetching customer_id data:", error);
  }
};
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
const handleCustomerIdChange = (event) => {
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
