<template>
  <div class="user-edit">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="user-edit__panel-title">
        Edit user: <span>{{ user.email }}</span>
      </div>
      <div class="user-edit__panel-main">
        <UiField label="Email" :errorsFromData="errorsFromNewUser.email">
          <UiInput
            type="text"
            placeholder="enter email"
            :value="user.email"
            @input="handleInput($event, 'email', isEmailValid, 'email')"
            @focus="handleFocus('email', isEmailValid, 'email')"
            @blur="handleBlur('email', isEmailValid, 'email')"
          />
        </UiField>
        <UiField
          label="Firstname"
          :errorsFromData="errorsFromNewUser.firstname"
        >
          <UiInput
            type="text"
            placeholder="enter firstname"
            :value="user.firstname"
            @input="
              handleInput($event, 'firstname', isFirstNameValid, 'firstname')
            "
            @focus="handleFocus('firstname', isFirstNameValid, 'firstname')"
            @blur="handleBlur('firstname', isFirstNameValid, 'firstname')"
          />
        </UiField>
        <UiField
          label="Secondname"
          :errorsFromData="errorsFromNewUser.secondname"
        >
          <UiInput
            type="text"
            placeholder="enter secondname"
            :value="user.secondname"
            @input="
              handleInput($event, 'secondname', isSecondnameValid, 'secondname')
            "
            @focus="handleFocus('secondname', isSecondnameValid, 'secondname')"
            @blur="handleBlur('secondname', isSecondnameValid, 'secondname')"
          />
        </UiField>
        <UiField label="lastname" :errorsFromData="errorsFromNewUser.lastname">
          <UiInput
            type="text"
            placeholder="enter lastname"
            :value="user.lastname"
            @input="
              handleInput($event, 'lastname', isLastnameValid, 'lastname')
            "
            @focus="handleFocus('lastname', isLastnameValid, 'lastname')"
            @blur="handleBlur('lastname', isLastnameValid, 'lastname')"
          />
        </UiField>
      </div>

      <div class="user-edit__button-panel button-panel">
        <button class="button-panel__click-back" @click="handleClickGoBack">
          <i class="fa-solid fa-backward"></i> Back
        </button>
        <button class="button-panel__click-save" @click="handleSaveChanges">
          <i class="fa-regular fa-floppy-disk"></i>
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { errorsFromNewUser } from "@/components/TableContent/composables/data.js";
import {
  isEmailValid,
  isFirstNameValid,
  isSecondnameValid,
  isLastnameValid,
  doValidateErrorForm,
  isNewUserFormValid,
} from "@/components/TableContent/composables/validationForNewUser.js";
import { toast } from "vue3-toastify";

const props = defineProps({
  selectId: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["clickGoBack"]);

let isLoading = ref(false);
const user = ref({});

const loadDataById = async () => {
  isLoading.value = true;
  try {
    const userData = await axios.get(
      `http://localhost:8888/users/${props.selectId}`
    );
    user.value = userData?.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  } finally {
    isLoading.value = false;
  }
};

// validate block ==================
const validateField = (dataName, validate, errorFieldName) => {
  validate(user.value[dataName], errorsFromNewUser[errorFieldName]);
};
const handleInput = (event, dataName, validate, errorFieldName) => {
  user.value[dataName] = event.target.value;
  validateField(dataName, validate, errorFieldName);
};
const handleFocus = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};
const handleBlur = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};

const handleSaveChanges = async () => {
  doValidateErrorForm(user.value, errorsFromNewUser, false);
  if (isNewUserFormValid(errorsFromNewUser)) {
    try {
      await axios.put(
        `http://localhost:8888/users/${props.selectId}`,
        user.value
      );

      user.value = {};

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
            if (errorsFromNewUser[key] !== undefined) {
              errorsFromNewUser[key].isDirty = true;
              errorsFromNewUser[key].errors = errorMessage;
            }
          });
        }
      } else {
        toast.error(message || "An unexpected error occurred.");
      }
    }
  }
};

const handleClickGoBack = (event) => emit("clickGoBack", event);

onMounted(async () => {
  await loadDataById();
});
</script>

<style lang="scss" scoped>
.user-edit {
  &__panel-title {
    text-align: center;
    font-size: 30px;
    padding: 20px 10px;
    background-color: #112121;
    margin-bottom: 40px;
  }
  &__panel-main {
    max-width: 500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 20px;
  }
  &__button-panel {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
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
