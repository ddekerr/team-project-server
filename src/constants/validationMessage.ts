export default {
  VALIDATION_ERROR: 'Validation error',

  // user fields validation
  USER_NAME_STRING_MSG: 'User name must be a string',
  USER_NAME_LENGTH_MSG: 'User name must be at least $constraint1 characters',

  USER_EMAIL_MSG: 'User e-mail must be in the correct format',
  USER_EMAIL_EMPTY_MSG: 'User e-mail must be not empty',

  USER_PHONE_MSG: 'User phone must be in the correct format',
  USER_PHONE_EMPTY_MSG: 'User phone must be not empty',

  USER_PASSWORD_EMPTY_MSG: 'User password must be not empty',
  USER_PASSWORD_STRING_MSG: 'User password must be a string',
  USER_PASSWORD_LENGTH_MSG: 'User password must be between $constraint1-$constraint2 characters',

  // product fields validation
  PRODUCT_TITLE_EMPTY_MSG: 'Products title must be not empty',
  PRODUCT_TITLE_STRING_MSG: 'Products title must be a string',

  PRODUCT_PRICE_EMPTY_MSG: 'Products price must be not empty',
  PRODUCT_PRICE_NUMBER_MSG: 'Products price must be a number',

  PRODUCT_IN_STOCK_EMPTY_MSG: 'Products inStock must be not empty',
  PRODUCT_IN_STOCK_BOOLEAN_MSG: 'Products inStock must be boolean value',

  PRODUCT_POSTER_EMPTY_MSG: 'Products poster must not be empty',

  PRODUCT_CATEGORY_EMPTY_MSG: 'Products category must not be empty',
  PRODUCT_CATEGORY_STRING_MSG: 'Products categories must be a string',

  // category fields validation
  CATEGORY_TITLE_EMPTY_MSG: 'Category title mustnot not be empty',
  CATEGORY_TITLE_STRING_MSG: 'Category title must be a string',
  CATEGORY_TITLE_MIN_LENGTH_MSG: 'Category title must be at least $constraint1 characters',
  CATEGORY_TITLE_MAX_LENGTH_MSG: 'Category title cannot be longer then $constraint1 characters',

  CATEGORY_PARENT_EMPTY_MSG: 'Category parent must not be empty',
  CATEGORY_PARENT_STRING_MSG: 'Category parent must be a string',
};
