import { dataNewShop, errorsFromNewShop } from "./data.js";

export const isCustomerIdValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value === undefined || value === "") {
    errorData.errors.push("Field customer_id is required!");
    return false;
  }

  if (!/^\d+$/.test(value)) {
    errorData.errors.push("The field value must be an integer.");
    return false;
  }

  return true;
};

export const isTitleValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value.length < 1) {
    errorData.errors.push("Field title shop is required");
    return false;
  }
  if (value.length > 20) {
    errorData.errors.push(
      "Field title shop max length should be no more than 20"
    );
    return false;
  }
  if (value.trim().length !== value.length) {
    errorData.errors.push(
      "Field title shop should not start or end with spaces"
    );
    return false;
  }
  return true;
};
export const doValidateErrorForm = (dataValue, errorsValue) => {
  isCustomerIdValid(dataValue.customer_id, errorsValue.customer_id);
  isTitleValid(dataValue.title, errorsValue.title);
};
export const isNewShopFormValid = (errorData) => {
  return Object.values(errorData).every((filed) => filed.errors.length === 0);
};
