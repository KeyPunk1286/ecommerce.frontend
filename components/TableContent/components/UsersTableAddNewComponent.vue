<template>
  <div class="user-table">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="user-table__button-back">
        <UiButton @click="handleClickGoBack"
          ><i class="fa-solid fa-backward"></i> Back</UiButton
        >
      </div>
      <div class="user-table__panel-main">
        <UiField label="Email" :errorsFromData="errorsFromNewUser.email">
          <UiInput
            type="text"
            placeholder="Enter Email"
            :value="dataNewUser.email"
            @input="handleInputEmail"
            @focus="handleFocusEmail"
            @blur="handleBlurEmail"
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
            @input="handleImputFirstname"
            @focus="handleFocusFirstname"
            @blur="handleBlurFirstname"
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
            @input="handleImputSecondname"
            @focus="handleFocusSecondname"
            @blur="handleBlurSecondname"
          />
        </UiField>
        <UiField label="Last name" :errorsFromData="errorsFromNewUser.lastname">
          <UiInput
            type="text"
            placeholder="Enter last name"
            :value="dataNewUser.lastname"
            @input="handleImputLastname"
            @focus="handleFocusLastname"
            @blur="handleBlurLastname"
          />
        </UiField>
        <UiField label="Password" :errorsFromData="errorsFromNewUser.password">
          <UiInput
            type="text"
            placeholder="Enter password"
            :value="dataNewUser.password"
            @input="handleImputPassword"
            @focus="handleFocusPassword"
            @blur="handleBlurPassword"
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
            @input="handleImputRePassword"
            @focus="handleFocusRePsword"
            @blur="handleBlurRePassword"
          />
        </UiField>
      </div>
      <div class="user-table__button-save">
        <button @click="handleSubmitNewUser">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

import UiField from "~/components/UiField.vue";
import { dataNewUser, errorsFromNewUser } from "../composables/data.js";
import {
  isEmailValid,
  isFirstNameValid,
  isSecondnameValid,
  isLastnameValid,
  isPasswordValid,
  isRePasswordValid,
  doValidateErrorForm,
  isNewUserFormValid,
} from "../composables/validationForNewUser.js";

let isLoading = ref(false);

//email field ==============================================
const handleInputEmail = (event) => {
  dataNewUser.email = event.target.value;
  isEmailValid(dataNewUser.email, errorsFromNewUser.email);
};
const handleFocusEmail = () => {
  isEmailValid(dataNewUser.email, errorsFromNewUser.email);
};
const handleBlurEmail = () => {
  isEmailValid(dataNewUser.email, errorsFromNewUser.email);
};
//firstname field ===========================================
const handleImputFirstname = (event) => {
  dataNewUser.firstname = event.target.value;
  isFirstNameValid(dataNewUser.firstname, errorsFromNewUser.firstname);
};
const handleFocusFirstname = () => {
  isFirstNameValid(dataNewUser.firstname, errorsFromNewUser.firstname);
};
const handleBlurFirstname = () => {
  isFirstNameValid(dataNewUser.firstname, errorsFromNewUser.firstname);
};
//secondname field ===========================================
const handleImputSecondname = (event) => {
  dataNewUser.secondname = event.target.value;
  isSecondnameValid(dataNewUser.secondname, errorsFromNewUser.secondname);
};
const handleFocusSecondname = () => {
  isSecondnameValid(dataNewUser.secondname, errorsFromNewUser.secondname);
};
const handleBlurSecondname = () => {
  isSecondnameValid(dataNewUser.secondname, errorsFromNewUser.secondname);
};
//lastname filed ============================================
const handleImputLastname = (event) => {
  dataNewUser.lastname = event.target.value;
  isLastnameValid(dataNewUser.lastname, errorsFromNewUser.lastname);
};
const handleFocusLastname = () => {
  isLastnameValid(dataNewUser.lastname, errorsFromNewUser.lastname);
};
const handleBlurLastname = () => {
  isLastnameValid(dataNewUser.lastname, errorsFromNewUser.lastname);
};
//password field =============================================
const handleImputPassword = (event) => {
  dataNewUser.password = event.target.value;
  isPasswordValid(dataNewUser.password, errorsFromNewUser.password);
};
const handleFocusPassword = () => {
  isPasswordValid(dataNewUser.password, errorsFromNewUser.password);
};
const handleBlurPassword = () => {
  isPasswordValid(dataNewUser.password, errorsFromNewUser.password);
};
//rePassword field ===========================================
const handleImputRePassword = (event) => {
  dataNewUser.rePassword = event.target.value;
  isRePasswordValid(
    dataNewUser.rePassword,
    dataNewUser.password,
    errorsFromNewUser.rePassword
  );
};
const handleFocusRePsword = () => {
  isRePasswordValid(
    dataNewUser.rePassword,
    dataNewUser.password,
    errorsFromNewUser.rePassword
  );
};
const handleBlurRePassword = () => {
  isRePasswordValid(
    dataNewUser.rePassword,
    dataNewUser.password,
    errorsFromNewUser.rePassword
  );
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
        firstname: dataNewUser.firstname,
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
      if (error?.response.status === 400) {
        const resDataErrors = error?.response.data.errors;
        Object.entries(resDataErrors).forEach(([key, errorMessage]) => {
          if (errorsFromNewUser[key] !== undefined) {
            errorsFromNewUser[key].isDirty = true;
            errorsFromNewUser[key].errors = errorMessage;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user-table {
  &__button-back {
    padding: 20px;
    background-color: #112121;
    display: flex;
    justify-content: center;
    button {
      background-color: #ffffff;
      padding: 10px 5px;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #112121;
      }
    }
  }

  &__panel-main {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
  }

  &__button-save {
    display: flex;
    justify-content: center;
    button {
      background-color: #ffffff;
      padding: 10px 5px;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #112121;
      }
    }
  }
}
</style>
