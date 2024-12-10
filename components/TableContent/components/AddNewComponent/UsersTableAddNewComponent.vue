<template>
  <div class="user-table">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="user-table__title">add new user</div>
      <div class="user-table__panel-main">
        <UiField label="Email" :errorsFromData="errorsFromNewUser.email">
          <UiInput
            type="text"
            placeholder="Enter Email"
            :value="dataNewUser.email"
            @input="handleInput($event, 'email', isEmailValid, 'email')"
            @focus="handleFocus('email', isEmailValid, 'email')"
            @blur="handleBlur('email', isEmailValid, 'email')"
          />
        </UiField>
        <UiField
          label="First name"
          :errorsFromData="errorsFromNewUser.firstname"
        >
          <UiInput
            type="text"
            placeholder="Enter First name"
            :value="dataNewUser.firstname"
            @input="
              handleInput($event, 'firstname', isFirstNameValid, 'firstname')
            "
            @focus="handleFocus('firstname', isFirstNameValid, 'firstname')"
            @blur="handleBlur('firstname', isFirstNameValid, 'firstname')"
          />
        </UiField>
        <UiField
          label="Second name"
          :errorsFromData="errorsFromNewUser.secondname"
        >
          <UiInput
            type="text"
            placeholder="Enter Second name"
            :value="dataNewUser.secondname"
            @input="
              handleInput($event, 'secondname', isSecondnameValid, 'secondname')
            "
            @focus="handleFocus('secondname', isSecondnameValid, 'secondname')"
            @blur="handleBlur('secondname', isSecondnameValid, 'secondname')"
          />
        </UiField>
        <UiField label="Last name" :errorsFromData="errorsFromNewUser.lastname">
          <UiInput
            type="text"
            placeholder="Enter last name"
            :value="dataNewUser.lastname"
            @input="
              handleInput($event, 'lastname', isLastnameValid, 'lastname')
            "
            @focus="
              handleFocusLastname('lastname', isLastnameValid, 'lastname')
            "
            @blur="handleBlurLastname('lastname', isLastnameValid, 'lastname')"
          />
        </UiField>
        <UiField label="Password" :errorsFromData="errorsFromNewUser.password">
          <UiInput
            type="text"
            placeholder="Enter password"
            :value="dataNewUser.password"
            @input="
              handleInput($event, 'password', isPasswordValid, 'password')
            "
            @focus="handleFocus('password', isPasswordValid, 'password')"
            @blur="handleBlur('password', isPasswordValid, 'password')"
          />
        </UiField>
        <UiField
          label="re-enter your password"
          :errorsFromData="errorsFromNewUser.rePassword"
        >
          <UiInput
            type="text"
            placeholder="Enter password"
            :value="dataNewUser.rePassword"
            @input="
              handleInput($event, 'rePassword', isRePasswordValid, 'rePassword')
            "
            @focus="handleFocus('rePassword', isRePasswordValid, 'rePassword')"
            @blur="handleBlur('rePassword', isRePasswordValid, 'rePassword')"
          />
        </UiField>
      </div>
      <div class="user-table__button-panel button-panel">
        <UiButton @click="handleClickGoBack"
          ><i class="fa-solid fa-backward"></i> Back</UiButton
        >
        <button class="button-panel__save" @click="handleSubmitNewUser">
          <i class="fa-regular fa-floppy-disk"></i> Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";

import UiField from "~/components/UiField.vue";
import {
  dataNewUser,
  errorsFromNewUser,
} from "@/components/TableContent/composables/data.js";
import {
  isEmailValid,
  isFirstNameValid,
  isSecondnameValid,
  isLastnameValid,
  isPasswordValid,
  isRePasswordValid,
  doValidateErrorForm,
  isNewUserFormValid,
} from "@/components/TableContent/composables/validationForNewUser.js";

let isLoading = ref(false);

const validateField = (dataName, validate, errorFieldName) => {
  if (dataName === "rePassword") {
    validate(
      dataNewUser[dataName],
      dataNewUser.password,
      errorsFromNewUser[errorFieldName]
    );
  } else {
    validate(dataNewUser[dataName], errorsFromNewUser[errorFieldName]);
  }
};

// handle field ===================================================
const handleInput = (event, dataName, validate, errorFieldName) => {
  dataNewUser[dataName] = event.target.value;
  validateField(dataName, validate, errorFieldName);
};
const handleFocus = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};
const handleBlur = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};

// goBack ====================================================
const emit = defineEmits(["clickGoBack"]);
const handleClickGoBack = (event) => emit("clickGoBack", event);

const doRegisterNewUser = async (data = {}) => {
  return await axios.post("http://localhost:8888/users", data);
};

// Submit
const handleSubmitNewUser = async () => {
  doValidateErrorForm(dataNewUser, errorsFromNewUser);
  if (isNewUserFormValid(errorsFromNewUser)) {
    try {
      const POST_DATA = {
        email: dataNewUser.email,
        firstname: "dataNewUser.firstname",
        secondname: dataNewUser.secondname,
        lastname: dataNewUser.lastname,
        password: dataNewUser.password,
      };
      await doRegisterNewUser(POST_DATA);
      dataNewUser.email = "";
      dataNewUser.firstname = "";
      dataNewUser.secondname = "";
      dataNewUser.lastname = "";
      dataNewUser.password = "";

      handleClickGoBack();
    } catch (error) {
      console.log(error);

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
</script>

<style lang="scss" scoped>
.user-table {
  &__title {
    text-align: center;
    font-size: 30px;
    padding: 20px 0 20px;
    background-color: #112121;
    margin-bottom: 40px;
  }
  &__panel-main {
    max-width: 500px;
    // padding: 20px;
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    justify-content: space-between;
    align-items: center;
    row-gap: 20px;
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
</style>
