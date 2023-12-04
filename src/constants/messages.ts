export const exceptionMessages = {
  // conflict messages
  CONFLICT_EMAIL_MSG: 'E-mail already in use',

  // unauthorize messages
  UNAUTHORIZED_PASSWORD_MSG: 'Password are not valid',

  UNAUTHORIZED_EMAIL_MSG: 'E-mail are not valid',

  UNAUTHORIZED_TOKEN_VALID_MSG: 'Token are not valid',
  UNAUTHORIZED_TOKEN_MISSING_MSG: 'Token missing. You have to sign in',

  // bad request messages
  BAD_REQUEST_MSG: 'Wrong data',

  // not found messages
  NOT_FOUND_MSG: 'Resource noy found',
};

export const successMessages = {
  // user success messages
  USER_CREATED_MSG: 'User has been successfully created',
  USER_UPDATED_MSG: 'User has been successfully updated',
  USER_DELETED_MSG: 'User has been successfully deleted',
  USER_LOGGED_IN_MSG: 'User has been successfully logged in',
  USER_LOGOUT_MSG: 'User has been successfully logout',

  // product success messages
  PRODUCT_CREATED_MSG: 'Product has been successfully created',
  PRODUCT_UPDATED_MSG: 'Product has been successfully updated',
  PRODUCT_DELETED_MSG: 'Product has been successfully deleted',

  // category success messages
  CATEGORY_CREATED_MSG: 'Category has been successfully created',
  CATEGORY_UPDATED_MSG: 'Category has been successfully updated',
  CATEGORY_DELETED_MSG: 'Category has been successfully deleted',
};

export const validationMessages = {
  VALIDATION_ERROR: 'Validation error',
  // user fields validation
  USER_NAME_STRING_MSG: 'User name must be a string',
  USER_NAME_LENGTH_MSG: 'User name must be at least 3 characters',

  USER_EMAIL_MSG: 'User e-mail must be in the correct format',
  USER_EMAIL_EMPTY_MSG: 'User e-mail must be not empty',

  USER_PASSWORD_EMPTY_MSG: 'User password must be not empty',
  USER_PASSWORD_STRING_MSG: 'User password must be a string',
  USER_PASSWORD_LENGTH_MSG: 'User password must be between 4-16 characters',

  // products fields validation
  PRODUCT_TITLE_EMPTY_MSG: 'Products title must be not empty',
  PRODUCT_TITLE_STRING_MSG: 'Products title must be a string',
  PRODUCT_TITLE_LENGTH_MSG: 'Products title must be between 5-256 characters',

  PRODUCT_DESCRIPTION_STRING_MSG: 'Products description must be a string',

  PRODUCT_PRICE_EMPTY_MSG: 'Products price must be not empty',
  PRODUCT_PRICE_NUMBER_MSG: 'Products price must be a number',

  // category fields validation
  CATEGORY_TITLE_EMPTY_MSG: 'Category title must be not empty',
  CATEGORY_TITLE_STRING_MSG: 'Category title must be a string',
  CATEGORY_TITLE_LENGTH_MSG: 'Category title must be between 4-32 characters',
};
