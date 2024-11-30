<template>
  <div class="product-table">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="product-table__title-panel">Add new product</div>
      <div class="product-table__main-panel main-panel">
        <UiField label="title" :errorsFromData="errorsFromNewProduct.title">
          <UiInput
            type="text"
            placeholder="Enter title"
            :value="dataNewProduct.title"
            @input="handleInputTitle"
            @focus="handleFocusTitle"
            @blur="handleBlurTitle"
          />
        </UiField>
        <UiField label="shop_id" :errorsFromData="errorsFromNewProduct.shop_id">
          <select
            class="main-panel__select"
            v-model="dataNewProduct.shop_id"
            @change="handleInputShopId"
            @focus="handleFocusShopId"
            @blur="handleBlurShopId"
          >
            <option value="">select shop_id</option>
            <option v-for="shop in allShops" :key="shop.id" :value="shop.id">
              {{ shop.id }} - {{ shop.title }}
            </option>
          </select>
        </UiField>
        <UiField
          label="description"
          :errorsFromData="errorsFromNewProduct.description"
        >
          <textarea
            placeholder="Enter product description"
            cols="30"
            rows="10"
            v-model="dataNewProduct.description"
            @input="handleInputDescription"
            @focus="handleFocusDescription"
            @blur="handleBlurDescription"
          ></textarea>
        </UiField>
        <UiField label="price" :errorsFromData="errorsFromNewProduct.price">
          <UiInput
            type="number"
            placeholder="Enter product price"
            :value="dataNewProduct.price"
            @input="handleInputPrice"
            @focus="handleFocusPrice"
            @blur="handleBlurPrice"
          />
        </UiField>
      </div>
      <div class="product-table__button-panel button-panel">
        <UiButton class="button-panel__click-back" @click="handleClickGoBack"
          ><i class="fa-solid fa-backward"></i> Back</UiButton
        >
        <UiButton
          class="button-panel__click-save"
          @click="handleSubmitNewProduct"
          ><i class="fa-regular fa-floppy-disk"></i> Save</UiButton
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";

import {
  dataNewProduct,
  errorsFromNewProduct,
} from "@/components/TableContent/composables/data.js";
import {
  isTitleValid,
  isShopIdValid,
  isDescriptionValid,
  isPriceValid,
  doValidateErrorForm,
  isNewProductFormValid,
} from "@/components/TableContent/composables/validationForNewProduct.js";
import { errorMessages } from "vue/compiler-sfc";

const emit = defineEmits(["clickGoBack"]);

const isLoading = ref(false);
const allShops = reactive([]);
const getAllShops = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:8888/shop/all");
    allShops.splice(0, allShops.length, ...(response?.data ?? []));
  } catch (error) {
    console.error("Error fetching shop:", error);
  } finally {
    isLoading.value = false;
  }
};

// title field ==========================================
const handleInputTitle = (event) => {
  dataNewProduct.title = event.target.value;
  isTitleValid(dataNewProduct.title, errorsFromNewProduct.title);
};
const handleFocusTitle = () => {
  isTitleValid(dataNewProduct.title, errorsFromNewProduct.title);
};
const handleBlurTitle = () => {
  isTitleValid(dataNewProduct.title, errorsFromNewProduct.title);
};

// shop_id field ==========================================
const handleInputShopId = () => {
  isShopIdValid(dataNewProduct.shop_id, errorsFromNewProduct.shop_id);
};
const handleFocusShopId = () => {
  isShopIdValid(dataNewProduct.shop_id, errorsFromNewProduct.shop_id);
};
const handleBlurShopId = () => {
  isShopIdValid(dataNewProduct.shop_id, errorsFromNewProduct.shop_id);
};

// description field ==========================================
const handleInputDescription = () => {
  isDescriptionValid(
    dataNewProduct.description,
    errorsFromNewProduct.description
  );
};
const handleFocusDescription = () => {
  isDescriptionValid(
    dataNewProduct.description,
    errorsFromNewProduct.description
  );
};
const handleBlurDescription = () => {
  isDescriptionValid(
    dataNewProduct.description,
    errorsFromNewProduct.description
  );
};

// price field =====================================================
const handleInputPrice = (event) => {
  const inputPrice = event.target.value;
  dataNewProduct.price = inputPrice === "" ? null : parseFloat(inputPrice);
  isPriceValid(dataNewProduct.price, errorsFromNewProduct.price);
};
const handleFocusPrice = () => {
  isPriceValid(dataNewProduct.price, errorsFromNewProduct.price);
};
const handleBlurPrice = () => {
  isPriceValid(dataNewProduct.price, errorsFromNewProduct.price);
};

// clic ====================================================
const handleClickGoBack = (event) => emit("clickGoBack", event);

const handleSubmitNewProduct = async () => {
  doValidateErrorForm(dataNewProduct, errorsFromNewProduct);
  if (isNewProductFormValid(errorsFromNewProduct)) {
    try {
      const POST_DATA = {
        title: dataNewProduct.title,
        shop_id: dataNewProduct.shop_id,
        description: dataNewProduct.description,
        price: dataNewProduct.price,
      };
      await addNewProduct(POST_DATA);

      dataNewProduct.title = "";
      dataNewProduct.shop_id = "";
      dataNewProduct.description = "";
      dataNewProduct.price = "";

      handleClickGoBack();
    } catch (error) {
      if (error?.response.status === 400) {
        const resDataErrors = error?.response.data.errors;
        Object.entries(resDataErrors).forEach(([key, errorMessages]) => {
          if (errorsFromNewProduct[key] !== undefined) {
            errorsFromNewProduct[key].isDirty = true;
            errorsFromNewProduct[key].errors = errorMessages;
          }
        });
      }
    }
  }
};
const addNewProduct = async (data = {}) => {
  return await axios.post("http://localhost:8888/product", data);
};
onMounted(async () => {
  await getAllShops();
});
</script>

<style lang="scss" scoped>
.product-table {
  &__title-panel {
    text-align: center;
    font-size: 30px;
    padding: 20px 0 20px;
    background-color: #112121;
    margin-bottom: 40px;
  }
  &__main-panel {
    max-width: 500px;
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
}
</style>
