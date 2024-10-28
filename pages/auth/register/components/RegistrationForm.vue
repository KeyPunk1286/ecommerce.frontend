<template>
  <div class="registration__form">
    <RegistrationFormField
      type="text"
      :value="registrationForm.email"
      placeholder="Enter your email"
      label="Email"
      @input="handleEmailInput"
      @focus="handleEmailFocus"
      @blur="handleEmailBlur"
      :errorsFromData="errorsFromRegistrationData.email"
    />
    <RegistrationFormField
      type="text"
      :value="registrationForm.firstName"
      placeholder="Enter your first name"
      label="First name"
      @input="handleFirstNameInput"
      @focus="handleFirstNameFocus"
      @blur="handleFirstNameBlur"
      :errorsFromData="errorsFromRegistrationData.firstName"
    />
    <RegistrationFormField
      type="text"
      :value="registrationForm.secondName"
      placeholder="Enter your second name"
      label="Second name"
      @input="handleSecondNameInput"
      @focus="handleSecondNameFocus"
      @blur="handleSecondNameBlur"
      :errorsFromData="errorsFromRegistrationData.secondName"
    />
    <RegistrationFormField
      type="text"
      :value="registrationForm.lastname"
      placeholder="Enter your last name"
      label="Last name"
      @input="handleLastNameInput"
      @focus="handleLastNameFocus"
      @blur="handleLastNameBlur"
      :errorsFromData="errorsFromRegistrationData.lastname"
    />

    <RegistrationFormField
      type="password"
      :value="registrationForm.password"
      placeholder="Enter your password"
      label="Password"
      @input="handlePasswordInput"
      @focus="handlePasswordFocus"
      @blur="handlePasswordBlur"
      :errorsFromData="errorsFromRegistrationData.password"
    />
    <RegistrationFormField
      type="password"
      :value="registrationForm.rePassword"
      placeholder="Enter your password"
      label="Re-enter your password"
      @input="handleRePasswordInput"
      @focus="handleRePasswordFocus"
      @blur="handleRePasswordBlur"
      :errorsFromData="errorsFromRegistrationData.rePassword"
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

const router = useRouter();

// firstName block
const handleFirstNameInput = (event) => {
  registrationForm.firstName = event.target.value;
  isFirstNameValid(
    registrationForm.firstName,
    errorsFromRegistrationData.firstName
  );
};
const handleFirstNameFocus = () => {
  isFirstNameValid(
    registrationForm.firstName,
    errorsFromRegistrationData.firstName
  );
};
const handleFirstNameBlur = () => {
  isFirstNameValid(
    registrationForm.firstName,
    errorsFromRegistrationData.firstName
  );
};

//email block
const handleEmailInput = (event) => {
  registrationForm.email = event.target.value;
  isEmailValid(registrationForm.email, errorsFromRegistrationData.email);
};
const handleEmailFocus = () => {
  isEmailValid(registrationForm.email, errorsFromRegistrationData.email);
};
const handleEmailBlur = () => {
  isEmailValid(registrationForm.email, errorsFromRegistrationData.email);
};

//second name block
const handleSecondNameInput = (event) => {
  registrationForm.secondName = event.target.value;
  isSecondNameValid(
    registrationForm.secondName,
    errorsFromRegistrationData.secondName
  );
};
const handleSecondNameFocus = () => {
  isSecondNameValid(
    registrationForm.secondName,
    errorsFromRegistrationData.secondName
  );
};
const handleSecondNameBlur = () => {
  isSecondNameValid(
    registrationForm.secondName,
    errorsFromRegistrationData.secondName
  );
};

// last name block
const handleLastNameInput = (event) => {
  registrationForm.lastname = event.target.value;
  isLastNameValid(
    registrationForm.lastname,
    errorsFromRegistrationData.lastname
  );
};
const handleLastNameFocus = () => {
  isLastNameValid(
    registrationForm.lastname,
    errorsFromRegistrationData.lastname
  );
};
const handleLastNameBlur = () => {
  isLastNameValid(
    registrationForm.lastname,
    errorsFromRegistrationData.lastname
  );
};

//password block
const handlePasswordInput = (event) => {
  registrationForm.password = event.target.value;
  isPasswordValid(
    registrationForm.password,
    errorsFromRegistrationData.password
  );
};
const handlePasswordFocus = () => {
  isPasswordValid(
    registrationForm.password,
    errorsFromRegistrationData.password
  );
};
const handlePasswordBlur = () => {
  isPasswordValid(
    registrationForm.password,
    errorsFromRegistrationData.password
  );
};

//rePassword block
const handleRePasswordInput = (event) => {
  registrationForm.rePassword = event.target.value;
  isRePaswordValid(
    registrationForm.rePassword,
    registrationForm.password,
    errorsFromRegistrationData.rePassword
  );
};
const handleRePasswordFocus = () => {
  isRePaswordValid(
    registrationForm.rePassword,
    registrationForm.password,
    errorsFromRegistrationData.rePassword
  );
};
const handleRePasswordBlur = () => {
  isRePaswordValid(
    registrationForm.rePassword,
    registrationForm.password,
    errorsFromRegistrationData.rePassword
  );
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
      // await router.push("/auth/login");
    } catch (e) {
      if (e?.status === 401) {
        Object.entries(e?.response?.data?.errors).forEach(
          ([key, errorMessages]) => {
            if (errorsFromRegistrationData[key] !== undefined) {
              errorsFromRegistrationData[key].isDirty = true;
              errorsFromRegistrationData[key].errors = errorMessages;
            }
          }
        );
      }
      console.log("ERROR:", e);
    }
  }
};
</script>

<style lang="scss" scoped></style>
