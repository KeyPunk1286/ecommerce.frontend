import { computed } from "vue";
import {
  registrationForm,
  errorsFromRegistrationData,
} from "./dataForRegistration.js";

export const isEmailValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1) {
    errorData.errors.push("Field email is required!");
    return false;
  }

  const loginPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!loginPattern.test(value)) {
    errorData.errors.push("Invalid email format!");
    return false;
  }

  return true;
};

export const isFirstNameValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1) {
    errorData.errors.push("Field first name is required!");
    return;
  }

  if (value.length < 2) {
    errorData.errors.push(
      "Field first name min length should be not less than 2"
    );
    return;
  }

  if (value.length > 20) {
    errorData.errors.push(
      "Field first name max length should be no more than 20"
    );
    return;
  }

  const usernameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/;
  if (!usernameRegex.test(value)) {
    errorData.errors.push("First name can only contain letters");
    return;
  }

  if (value.trim() !== value) {
    errorData.errors.push("First name cannot have leading or trailing spaces");
    return;
  }

  // const reservedUsernames = ["admin", "root", "superuser"];
  // if (reservedUsernames.includes(value.toLowerCase())) {
  //   errorData.errors = ["This username is reserved or not allowed"];
  //   return;
  // }

  // if (/^\d+$/.test(value)) {
  //   errorData.errors = ["Username cannot consist of only numbers"];
  //   return;
  // }
  // return true;
};

export const isSecondNameValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1) {
    errorData.errors.push("Field second name is required!");
    return;
  }

  if (value.length < 2) {
    errorData.errors.push(
      "Field second name min length should be not less than 2"
    );

    return;
  }

  if (value.length > 20) {
    errorData.errors.push(
      "Field second name max length should be no more than 20"
    );

    return;
  }

  const usernameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/;
  if (!usernameRegex.test(value)) {
    errorData.errors.push("Second name can only contain letters");
    return;
  }

  if (value.trim() !== value) {
    errorData.errors.push("Second name cannot have leading or trailing spaces");
    return;
  }
};

export const isLastNameValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1) {
    errorData.errors.push("Field last name is required!");
    return;
  }

  if (value.length < 2) {
    errorData.errors.push(
      "Field last name min length should be not less than 2"
    );
    return;
  }

  if (value.length > 20) {
    errorData.errors.push(
      "Field last name max length should be no more than 20"
    );
    return;
  }

  const usernameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/;
  if (!usernameRegex.test(value)) {
    errorData.errors.push("Last name can only contain letters");
    return;
  }

  if (value.trim() !== value) {
    errorData.errors.push("Last name cannot have leading or trailing spaces");
    return;
  }
};

export const isPasswordValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1) {
    errorData.errors.push("Field password is required!");
    return false;
  }

  // Мінімальна довжина
  if (value.length < 8) {
    errorData.errors.push("Password must be at least 8 characters long.");
    return false;
  }

  // Перевірка на верхній регістр
  if (!/[A-Z]/.test(value)) {
    errorData.errors.push(
      "Password must contain at least one uppercase letter."
    );
    return false;
  }

  // Перевірка на нижній регістр
  if (!/[a-z]/.test(value)) {
    errorData.errors.push(
      "Password must contain at least one lowercase letter."
    );
    return false;
  }

  // Перевірка на цифру
  if (!/[0-9]/.test(value)) {
    errorData.errors.push("Password must contain at least one digit.");
    return false;
  }

  // Перевірка на спеціальний символ
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    errorData.errors.push(
      "Password must contain at least one special character."
    );
    return false;
  }

  return true;
};

export const isRePaswordValid = (value, value2, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1 || value2.length < 1) {
    errorData.errors.push("Password fields cannot be empty.");
  }

  if (value !== value2) {
    errorData.errors.push("The entered passwords do not match.");
    return false;
  }

  if (value.length < 8) {
    errorData.errors.push("Password must be at least 8 characters long.");
    return false;
  }

  return true;
};

export const dovalidateRegistrationForm = () => {
  isEmailValid(registrationForm.email, errorsFromRegistrationData.email);
  isFirstNameValid(
    registrationForm.firstName,
    errorsFromRegistrationData.firstName
  );
  isSecondNameValid(
    registrationForm.secondName,
    errorsFromRegistrationData.secondName
  );
  isLastNameValid(
    registrationForm.lastname,
    errorsFromRegistrationData.lastname
  );
  isPasswordValid(
    registrationForm.password,
    errorsFromRegistrationData.password
  );
  isRePaswordValid(
    registrationForm.rePassword,
    registrationForm.password,
    errorsFromRegistrationData.rePassword
  );
};

export const isRegistrationFormValid = (errorData) => {
  return Object.values(errorData).every((filed) => filed.errors.length === 0);
};

export const isRegistrationValidateComputed = computed(() => {
  // return Object.values(errorsFromRegistrationData).every(
  //   (filed) => filed.errors.length === 0
  // );

  return true;
});
