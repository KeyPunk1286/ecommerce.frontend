<template>
  <div class="registration__form">
    <RegistrationFormField
      type="text"
      :value="registrationForm.username"
      placeholder="Enter your username"
      label="Username"
      @input="handleUsernameInput"
      @focus="handleUsernameFocus"
      @blur="handleUsernameBlur"
      :errorsFromData="errorsFromRegistrationData.username"
    />
    <RegistrationFormField
      type="text"
      :value="registrationForm.login"
      placeholder="Enter your email"
      label="Login"
      @input="handleLoginInput"
      @focus="handleLoginFocus"
      @blur="handleLoginBlur"
      :errorsFromData="errorsFromRegistrationData.login"
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

import axios from "axios";

const router = useRouter()


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

const doRegistrationUser = async (data = {}) => {
  return await axios.post('http://localhost:8888/auth/registration', data)
}

// button submit
const handleSubmitRegistration = async () => {
  dovalidateRegistrationForm();

  if (isRegistrationFormValid(errorsFromRegistrationData)) {
    try {
      const dataThatWillSend = {
        login: registrationForm.login,
        username: registrationForm.username, // TODO :: Fix to real field
        secondname: registrationForm.username, // TODO :: Fix to real field
        lastname: registrationForm.username, // TODO :: Fix to real field
        password: registrationForm.password,
      };

      await doRegistrationUser(dataThatWillSend);
      // await router.push('/auth/login');
    } catch(e) {
      if (e?.status === 401) {
        Object.entries(e?.response?.data?.errors).forEach(([key, errorMessages]) => {
          if (errorsFromRegistrationData[key] !== undefined) {
            errorsFromRegistrationData[key].isDirty = true;
            errorsFromRegistrationData[key].errors = errorMessages;
          }
        });
      }
      console.log('ERROR:', e);
    }
  }

};
</script>

<style lang="scss" scoped></style>
