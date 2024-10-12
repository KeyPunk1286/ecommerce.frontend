<template>
  <div class="registration__form">
    <registration-form-field
      type="text"
      :value="registrationForm.username"
      placeholder="Enter your username"
      label="Username"
      @input="handleUsernameInput"
      @focus="handleUsernameFocus"
      @blur="handleUsernameBlur"
      :errorsFromData="errorsFromRegistrationData.username"
    />
    <registration-form-field
      type="text"
      :value="registrationForm.login"
      placeholder="Enter your email"
      label="Login"
      @input="handleLoginInput"
      @focus="handleLoginFocus"
      @blur="handleLoginBlur"
      :errorsFromData="errorsFromRegistrationData.login"
    />
    <registration-form-field
      type="password"
      :value="registrationForm.password"
      placeholder="Enter your password"
      label="Password"
      @input="handlePasswordInput"
      @focus="handlePasswordFocus"
      @blur="handlePasswordBlur"
      :errorsFromData="errorsFromRegistrationData.password"
    />
    <registration-form-field
      type="password"
      :value="registrationForm.rePassword"
      placeholder="Enter your password"
      label="Re-enter your password"
      @input="handleRePasswordInput"
      @focus="handleRePasswordFocus"
      @blur="handleRePasswordBlur"
      :errorsFromData="errorsFromRegistrationData.rePassword"
    />
    <registration-form-submit @submit="handleSubmitRegistration" />
  </div>
</template>

<script setup>
import RegistrationFormField from "./RegistrationFormField.vue";
import RegistrationFormSubmit from "./RegistrationFormSubmit.vue";
import {
  isUsernameValid,
  isLoginValid,
  isPasswordValid,
  isRePaswordValid,
  dovalidateRegistrationForm,
  isRegistrationFormValid,
} from "../composables/validationForRegistration.js";

import {
  registrationForm,
  errorsFromRegistrationData,
} from "../composables/dataForRegistration.js";

// username block
const handleUsernameInput = (event) => {
  registrationForm.username = event.target.value;
  isUsernameValid(
    registrationForm.username,
    errorsFromRegistrationData.username
  );
};
const handleUsernameFocus = () => {
  isUsernameValid(
    registrationForm.username,
    errorsFromRegistrationData.username
  );
};
const handleUsernameBlur = () => {
  isUsernameValid(
    registrationForm.username,
    errorsFromRegistrationData.username
  );
};

//login block
const handleLoginInput = (event) => {
  registrationForm.login = event.target.value;
  isLoginValid(registrationForm.login, errorsFromRegistrationData.login);
};
const handleLoginFocus = () => {
  isLoginValid(registrationForm.login, errorsFromRegistrationData.login);
};
const handleLoginBlur = () => {
  isLoginValid(registrationForm.login, errorsFromRegistrationData.login);
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

// button submit
const handleSubmitRegistration = () => {
  dovalidateRegistrationForm();

  if (isRegistrationFormValid(errorsFromRegistrationData))
    alert("Додаємо нового Юзера!");
};
</script>

<style lang="scss" scoped></style>
