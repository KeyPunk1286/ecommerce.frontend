import { dataNewUser, errorsFromNewUser } from "./data.js";

//email valid ================================================
export const isEmailValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  // isRequired
  if (value.length < 1) {
    errorData.errors.push("Field Email is required!");
    return false;
  }

  // isEmail
  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailPattern.test(value)) {
  //   errorData.errors.push("Invalid email format!");
  //   return false;
  // }

  return true;
};

//firstname valid ============================================
export const isFirstNameValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1) {
    errorData.errors.push("Field username is required!");
    return;
  }

  if (value.length < 2) {
    errorData.errors.push(
      "Field username min length should be not less than 2"
    );
    return;
  }

  if (value.length > 20) {
    errorData.errors.push(
      "Field username max length should be no more than 20"
    );
    return;
  }

  const usernameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/;
  if (!usernameRegex.test(value)) {
    errorData.errors.push("Username can only contain letters");
    return;
  }

  if (value.trim() !== value) {
    errorData.errors.push("Username cannot have leading or trailing spaces");
    return;
  }

  return true;
};

//secondname valid ===========================================
export const isSecondnameValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1) {
    errorData.errors.push("Field secondname is required!");
    return;
  }

  if (value.length < 2) {
    errorData.errors.push(
      "Field secondname min length should be not less than 2"
    );
    return;
  }

  if (value.length > 20) {
    errorData.errors.push(
      "Field secondname max length should be no more than 20"
    );
    return;
  }

  const usernameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/;
  if (!usernameRegex.test(value)) {
    errorData.errors.push("Secondname can only contain letters");
    return;
  }

  if (value.trim() !== value) {
    errorData.errors.push("Secondname cannot have leading or trailing spaces");
    return;
  }

  return true;
};

//lastname valid =============================================
export const isLastnameValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1) {
    errorData.errors.push("Field lastName is required!");
    return;
  }

  if (value.length < 2) {
    errorData.errors.push(
      "Field lastName min length should be not less than 2"
    );
    return;
  }

  if (value.length > 20) {
    errorData.errors.push(
      "Field lastName max length should be no more than 20"
    );
    return;
  }

  const usernameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/;
  if (!usernameRegex.test(value)) {
    errorData.errors.push("LastName can only contain letters");
    return;
  }

  if (value.trim() !== value) {
    errorData.errors.push("LastName cannot have leading or trailing spaces");
    return;
  }

  return true;
};

//password valid =============================================
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

//rePassword Valid ===========================================
export const isRePasswordValid = (value, value2, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1 || value2.length < 1) {
    errorData.errors.push("Password fields cannot be empty.");
  }

  if (value !== value2) {
    errorData.errors = ["The entered passwords do not match."];
    return false;
  }

  if (value.length < 8) {
    errorData.errors.push("Password must be at least 8 characters long.");
    return false;
  }

  return true;
};

// doValidate =======================================
export const doValidateErrorForm = (
  valueData,
  errorData,
  validatePasswod = true
) => {
  isEmailValid(valueData.email, errorData.email);
  isFirstNameValid(valueData.firstname, errorData.firstname);
  isSecondnameValid(valueData.secondname, errorData.secondname);
  isLastnameValid(valueData.lastname, errorData.lastname);
  if (validatePasswod) {
    isPasswordValid(valueData.password, errorData.password);
    isRePasswordValid(
      valueData.rePassword,
      valueData.password,
      errorData.rePassword
    );
  }
};

export const isNewUserFormValid = (errorData) => {
  return Object.values(errorData).every((filed) => filed.errors.length === 0);
};
