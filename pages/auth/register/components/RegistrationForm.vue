<template>
  <div class="registration__form">
    <RegistrationFormField
      type="text"
      placeholder="Enter your email"
      label="Email"
      :value="registrationForm.email"
      :errorsFromData="errorsFromRegistrationData.email"
      @input="handleInput($event, 'email', isEmailValid, 'email')"
      @focus="handleFocus('email', isEmailValid, 'email')"
      @blur="handleBlur('email', isEmailValid, 'email')"
    />
    <RegistrationFormField
      type="text"
      placeholder="Enter your first name"
      label="First name"
      :value="registrationForm.firstName"
      :errorsFromData="errorsFromRegistrationData.firstName"
      @input="handleInput($event, 'firstName', isFirstNameValid, 'firstName')"
      @focus="handleFocus('firstName', isFirstNameValid, 'firstName')"
      @blur="handleBlur('firstName', isFirstNameValid, 'firstName')"
    />
    <RegistrationFormField
      type="text"
      placeholder="Enter your second name"
      label="Second name"
      :value="registrationForm.secondName"
      :errorsFromData="errorsFromRegistrationData.secondName"
      @input="
        handleInput($event, 'secondName', isSecondNameValid, 'secondName')
      "
      @focus="handleFocus('secondName', isSecondNameValid, 'secondName')"
      @blur="handleBlur('secondName', isSecondNameValid, 'secondName')"
    />
    <RegistrationFormField
      type="text"
      placeholder="Enter your last name"
      label="Last name"
      :value="registrationForm.lastname"
      :errorsFromData="errorsFromRegistrationData.lastname"
      @input="handleInput($event, 'lastname', isLastNameValid, 'lastname')"
      @focus="handleFocus('lastname', isLastNameValid, 'lastname')"
      @blur="handleBlur('lastname', isLastNameValid, 'lastname')"
    />

    <RegistrationFormField
      type="password"
      placeholder="Enter your password"
      label="Password"
      :value="registrationForm.password"
      :errorsFromData="errorsFromRegistrationData.password"
      @input="handleInput($event, 'password', isPasswordValid, 'password')"
      @focus="handleFocus('password', isPasswordValid, 'password')"
      @blur="handleBlur('password', isPasswordValid, 'password')"
    />
    <RegistrationFormField
      type="password"
      placeholder="Enter your password"
      label="Re-enter your password"
      :value="registrationForm.rePassword"
      :errorsFromData="errorsFromRegistrationData.rePassword"
      @input="handleInput($event, 'rePassword', isRePaswordValid, 'rePassword')"
      @focus="handleFocus('rePassword', isRePaswordValid, 'rePassword')"
      @blur="handleBlur('rePassword', isRePaswordValid, 'rePassword')"
    />
    <RegistrationFormSubmit @submit="handleSubmitRegistration" />
  </div>
</template>

<script setup>
import RegistrationFormField from "./RegistrationFormField.vue";
import RegistrationFormSubmit from "./RegistrationFormSubmit.vue";
import {
  isEmailValid,
  isFirstNameValid,
  isSecondNameValid,
  isLastNameValid,
  isPasswordValid,
  isRePaswordValid,
  dovalidateRegistrationForm,
  isRegistrationFormValid,
} from "../composables/validationForRegistration.js";

import {
  registrationForm,
  errorsFromRegistrationData,
} from "../composables/dataForRegistration.js";

import axios from "axios";

import { toast } from "vue3-toastify";

const router = useRouter();

const validateField = (dataName, validate, errorFieldName) => {
  if (dataName === "rePassword") {
    validate(
      registrationForm[dataName],
      registrationForm.password,
      errorsFromRegistrationData[errorFieldName]
    );
  } else {
    validate(
      registrationForm[dataName],
      errorsFromRegistrationData[errorFieldName]
    );
  }
};
const handleInput = (event, dataName, validate, errorFieldName) => {
  registrationForm[dataName] = event.target.value;
  validateField(dataName, validate, errorFieldName);
};
const handleFocus = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};
const handleBlur = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};

const doRegistrationUser = async (data = {}) => {
  return await axios.post("http://localhost:8888/auth/registration", data);
};

// button submit
const handleSubmitRegistration = async () => {
  dovalidateRegistrationForm();

  if (isRegistrationFormValid(errorsFromRegistrationData)) {
    try {
      const dataThatWillSend = {
        email: registrationForm.email,
        firstname: registrationForm.firstName,
        secondname: registrationForm.secondName,
        lastname: registrationForm.lastname,
        password: registrationForm.password,
      };

      await doRegistrationUser(dataThatWillSend);
      await router.push("/auth/login");
    } catch (e) {
      const status = e?.response?.status;
      const message = e?.response?.data?.message || e?.response?.data?.error;
      const resDataErrors = e?.response?.data?.errors;

      if (status === 401) {
        if (message) {
          toast.error(message);
        }
        if (resDataErrors) {
          Object.entries(resDataErrors).forEach(([key, errorMessages]) => {
            if (errorsFromRegistrationData[key] !== undefined) {
              errorsFromRegistrationData[key].isDirty = true;
              errorsFromRegistrationData[key].errors = errorMessages;
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

<style lang="scss" scoped></style>
