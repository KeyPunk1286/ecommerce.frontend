import { dataNewCustomer, errorsFromNewCustomer } from "./data.js";

export const isTitleValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1) {
    errorData.errors.push("Title is required!");
    return false;
  }
  if (value.length > 20) {
    errorData.errors.push("Field title max length should be no more than 20");
    return false;
  }
  if (value.trim().length !== value.length) {
    errorData.errors.push("Field title should not start or end with spaces");
    return false;
  }

  return true;
};

export const isUserIdValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value === undefined || value === "") {
    errorData.errors.push("User_id is required!");
    return false;
  }

  if (!/^\d+$/.test(value)) {
    errorData.errors.push("The user_id value must be an integer.");
    return false;
  }

  return true;
};

export const isStatusVAlid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value === "") {
    errorData.errors.push("The customer status is required.");
    return false;
  }
};

export const doValidateErrorForm = (valueData, errorData) => {
  isTitleValid(valueData.title, errorData.title);
  isUserIdValid(valueData.user_id, errorData.user_id);
  isStatusVAlid(valueData.status, errorData.status);
};

export const isNewCustomerFormValid = (errorData) => {
  return Object.values(errorData).every((filed) => filed.errors.length === 0);
};
