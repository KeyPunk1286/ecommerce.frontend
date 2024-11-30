// title valid =====================================================================
export const isTitleValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  console.log(value, "test_valid");

  if (value === undefined || value === "") {
    errorData.errors.push("Field title is required!");
    return false;
  }
  if (value.length > 20) {
    errorData.errors.push("Field title max length should be no more than 20");
    return false;
  }
  if (value.trim() !== value) {
    errorData.errors.push("Field title should not start or end with spaces");
    return false;
  }
  return true;
};

// shop_id valid ===================================================================
export const isShopIdValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value === undefined || value === "") {
    errorData.errors.push("Select shop_id is required!");
    return false;
  }

  if (isNaN(value)) {
    errorData.errors.push("Shop ID must be a valid number!");
    return false;
  }
  return true;
};

// description valid ==================================================================
export const isDescriptionValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value === undefined || value === "") {
    errorData.errors.push("Description is required!");
    return false;
  }

  if (value.length < 10) {
    errorData.errors.push("Description must be at least 10 characters long!");
    return false;
  }

  if (value.length > 500) {
    errorData.errors.push("Description must not exceed 500 characters!");
    return false;
  }

  return true;
};

// price valid =====================================================================
export const isPriceValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  if (value === undefined || value === "") {
    errorData.errors.push("Price is required!");
    return false;
  }

  if (isNaN(value)) {
    errorData.errors.push("Price must be a valid number.");
    return false;
  }

  if (value <= 0) {
    errorData.errors.push("Price must be greater than zero.");
    return false;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    errorData.errors.push("Price can have up to two decimal places.");
  }

  return true;
};

// doValidate ===================================================================
export const doValidateErrorForm = (value, errorData) => {
  isTitleValid(value.title, errorData.title);
  isShopIdValid(value.shop_id, errorData.shop_id);
  isDescriptionValid(value.description, errorData.description);
  isPriceValid(value.price, errorData.price);
};

// new product valid ============================================================
export const isNewProductFormValid = (errorData) => {
  return Object.values(errorData).every((field) => field.errors.length === 0);
};
