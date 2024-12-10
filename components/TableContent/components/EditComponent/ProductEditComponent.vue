<template>
  <div class="product-edit">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="product-edit__title-panel">
        Product edit: {{ product.title }}
      </div>
      <div class="product-edit__main-panel main-panel">
        <UiField label="title" :errorsFromData="errorsFromNewProduct.title">
          <UiInput
            type="text"
            placeholder="Enter title product"
            :value="product.title"
            @input="handleInput($event, 'title', isTitleValid, 'title')"
            @focus="handleFocus($event, 'title', isTitleValid, 'title')"
            @blur="handleBlur($event, 'title', isTitleValid, 'title')"
          />
        </UiField>
        <UiField label="shop_id" :errorsFromData="errorsFromNewProduct.shop_id">
          <select
            class="main-panel__select"
            v-model="product.shop_id"
            @change="handleInput($event, 'shop_id', isShopIdValid, 'shop_id')"
            @focus="handleFocus($event, 'shop_id', isShopIdValid, 'shop_id')"
            @blur="handleBlur($event, 'shop_id', isShopIdValid, 'shop_id')"
          >
            <option value="">select shop_id</option>
            <option v-for="shop in allShopsId" :key="shop.id" :value="shop.id">
              {{ shop.id }} - {{ shop.title }}
            </option>
          </select>
        </UiField>
        <UiField
          label="description"
          :errorsFromData="errorsFromNewProduct.description"
        >
          <textarea
            class="main-panel__textarea"
            cols="30"
            rows="10"
            v-model="product.description"
            @input="
              handleInput(
                $event,
                'description',
                isDescriptionValid,
                'description'
              )
            "
            @focus="
              handleFocus(
                $event,
                'description',
                isDescriptionValid,
                'description'
              )
            "
            @blur="
              handleBlur(
                $event,
                'description',
                isDescriptionValid,
                'description'
              )
            "
          ></textarea>
        </UiField>
        <UiField label="price" :errorsFromData="errorsFromNewProduct.price">
          <UiInput
            type="text"
            placeholder="Enter product price"
            :value="product.price"
            @input="handleInput($event, 'price', isPriceValid, 'price')"
            @focus="handleFocus($event, 'price', isPriceValid, 'price')"
            @blur="handleBlur($event, 'price', isPriceValid, 'price')"
          />
        </UiField>
      </div>
      <div class="product-edit__button-panel">
        <UiButton @click="handleClickGoBack"
          ><i class="fa-solid fa-backward"></i> Back</UiButton
        >
        <UiButton @click="handleSaveEdit"
          ><i class="fa-regular fa-floppy-disk"></i> Save</UiButton
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import { errorsFromNewProduct } from "@/components/TableContent/composables/data.js";
import {
  isTitleValid,
  isShopIdValid,
  isDescriptionValid,
  isPriceValid,
  doValidateErrorForm,
  isNewProductFormValid,
} from "@/components/TableContent/composables/validationForNewProduct.js";
import { toast } from "vue3-toastify";

const props = defineProps({
  selectId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["clickGoBack"]);

let isLoading = ref(false);
const product = ref({});
const allShopsId = reactive([]);

const loadProductById = async () => {
  isLoading.value = true;
  try {
    const productData = await axios.get(
      `http://localhost:8888/product/${props.selectId}`
    );
    product.value = productData?.data;
    if (product.value.price) {
      product.value.price = parseFloat(product.value.price);
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  } finally {
    isLoading.value = false;
  }
};
const getAllShopsId = async () => {
  isLoading.value = true;
  try {
    const allShops = await axios.get("http://localhost:8888/shop/all");
    allShopsId.splice(0, allShopsId.length, ...allShops?.data);
  } catch (error) {
    console.error("Error fetching shop data:", error);
  } finally {
    isLoading.value = false;
  }
};

//обробник для усього
const validateField = (fieldName, validator, errors) => {
  const fieldValue = product.value[fieldName];
  validator(fieldValue, errorsFromNewProduct[errors]);
};

const handleInput = (event, fieldName, validator, errors) => {
  const newValue = event.target.value;
  if (fieldName === "title") {
    product.value[fieldName] = newValue;
  } else if (fieldName === "price") {
    if (newValue === "") {
      product.value[fieldName] = null;
    } else {
      const numericValue = parseFloat(newValue);
      product.value[fieldName] = !isNaN(numericValue) ? numericValue : 0;
    }
  }
  validateField(fieldName, validator, errors);
};
const handleFocus = (event, fieldName, validator, errors) => {
  validateField(fieldName, validator, errors);
};
const handleBlur = (event, fieldName, validator, errors) => {
  validateField(fieldName, validator, errors);
};

// click ==========================================================
const handleClickGoBack = (event) => emit("clickGoBack", event);

const handleSaveEdit = async () => {
  isLoading.value = true;
  doValidateErrorForm(product.value, errorsFromNewProduct);
  if (isNewProductFormValid(errorsFromNewProduct)) {
    try {
      await axios.put(
        `http://localhost:8888/product/${props.selectId}`,
        product.value
      );
      product.value = {};
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
            if (errorsFromNewProduct[key] !== undefined) {
              errorsFromNewProduct[key].isDirty = true;
              errorsFromNewProduct[key].errors = errorMessage;
            }
          });
        }
      } else {
        toast.error(message);
      }
    } finally {
      isLoading.value = false;
    }
  }
};

onMounted(async () => {
  await loadProductById();
  await getAllShopsId();
});
</script>

<style lang="scss" scoped>
.product-edit {
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
}
</style>
