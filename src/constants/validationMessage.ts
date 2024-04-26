export default {
  VALIDATION_ERROR: 'Validation error',

  // user fields validation
  USER_NAME_STRING_MSG: 'User name must be a string',
  USER_NAME_LENGTH_MSG: 'User name must be between $constraint1-$constraint2 characters',
  USER_NAME_EMPTY_MSG: 'User name must be not empty',

  USER_EMAIL_MSG: 'User e-mail must be in the correct format',
  USER_EMAIL_EMPTY_MSG: 'User e-mail must be not empty',

  USER_PHONE_MSG: 'User phone must be in the correct format',
  USER_PHONE_EMPTY_MSG: 'User phone must be not empty',

  USER_PASSWORD_EMPTY_MSG: 'User password must be not empty',
  USER_PASSWORD_STRING_MSG: 'User password must be a string',
  USER_PASSWORD_LENGTH_MSG: 'User password must be between $constraint1-$constraint2 characters',

  USER_CITY_STRING_MSG: 'City must be a string',
  USER_CITY_LENGTH_MSG: 'City must be between $constraint1-$constraint2 characters',
  USER_CITY_EMPTY_MSG: 'City must be not empty',

  USER_STREET_STRING_MSG: 'Street must be a string',
  USER_STREET_LENGTH_MSG: 'Street must be between $constraint1-$constraint2 characters',
  USER_STREET_EMPTY_MSG: 'Street must be not empty',

  USER_HOUSE_STRING_MSG: 'House must be a string',
  USER_HOUSE_LENGTH_MSG: 'House must be between $constraint1-$constraint2 characters',
  USER_HOUSE_EMPTY_MSG: 'House must be not empty',

  USER_APARTMENT_NUMBER_MSG: 'Apartment must be a number',
  USER_APARTMENT_MIN_MSG: 'User apartment must be at least $constraint1',
  USER_APARTMENT_MAX_MSG: 'User apartment cannot be bigger then $constraint1',
  USER_APARTMENT_EMPTY_MSG: 'Apartment must be not empty',

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

  PRODUCT_RATE_VALUE_EMPTY_MSG: 'Products rate value must not be empty',
  PRODUCT_RATE_VALUE_NUMBER_MSG: 'Products rate value must be one of $constraint1',

  // category fields validation
  CATEGORY_TITLE_EMPTY_MSG: 'Category title mustnot not be empty',
  CATEGORY_TITLE_STRING_MSG: 'Category title must be a string',
  CATEGORY_TITLE_MIN_LENGTH_MSG: 'Category title must be at least $constraint1 characters',
  CATEGORY_TITLE_MAX_LENGTH_MSG: 'Category title cannot be longer then $constraint1 characters',

  CATEGORY_PARENT_EMPTY_MSG: 'Category parent must not be empty',
  CATEGORY_PARENT_STRING_MSG: 'Category parent must be a string',

  CATEGORY_ICON_EMPTY_MSG: 'Category icon must not be empty',
  CATEGORY_ICON_STRING_MSG: 'Category icon must be a string',

  // orders fields validation
  ORDER_CUSTOMER_PHONE_MSG: 'Customer`s phone must be in the correct format',
  ORDER_CUSTOMER_PHONE_EMPTY_MSG: 'Customer`s e-mail must not be empty',

  ORDER_TOTAL_PRICE_NUMBER_MSG: 'Order`s total must be a number',
  ORDER_TOTAL_PRICE_MIN_MSG: 'Order`s total must be at least $constraint1',
  ORDER_TOTAL_PRICE_EMPTY_MSG: 'Order`s total must not be empty',

  ORDER_PRODUCT_ID_NUMBER_MSG: 'Product Id must be a number',
  ORDER_PRODUCT_ID_MIN_MSG: 'Product Id must be at least $constraint1',
  ORDER_PRODUCT_ID_EMPTY_MSG: 'Product Id must not be empty',

  ORDER_QUANTITY_NUMBER_MSG: 'Product quantity must be a number',
  ORDER_QUANTITY_MIN_MSG: 'Product quantity must be at least $constraint1',
  ORDER_QUANTITY_EMPTY_MSG: 'Product quantity must not be empty',

  ORDER_PAYMENT_STATUS_STRING_MSG: 'Order payment status must be a string',
  ORDER_PAYMENT_STATUS_EMPTY_MSG: 'Order payment status must not be empty',

  ORDER_PAYMENT_METHOD_STRING_MSG: 'Order payment method must be a string',
  ORDER_PAYMENT_METHOD_EMPTY_MSG: 'Order payment method must not be empty',

  ORDER_RECEPIENT_NAME_STRING_MSG: 'Recepient name must be a string',
  ORDER_RECEPIENT_NAME_EMPTY_MSG: 'Recepient name must not be empty',

  ORDER_RECEPIENT_PHONE_MSG: 'Recepint phone must be in the correct format',
  ORDER_RECEPIENT_PHONE_EMPTY_MSG: 'Recepint e-mail must not be empty',
};
