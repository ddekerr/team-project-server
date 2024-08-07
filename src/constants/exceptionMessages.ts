export default {
  // conflict messages
  CONFLICT_EMAIL_MSG: 'E-mail already in use',
  CONFLICT_CATEGORY_MSG: 'The category already exists, please change the name. Or indicate an existing parent class',

  // unauthorize messages
  UNAUTHORIZED_PASSWORD_MSG: 'Password are not valid',

  UNAUTHORIZED_EMAIL_MSG: 'E-mail are not valid',

  UNAUTHORIZED_TOKEN_VALID_MSG: 'Token are not valid',
  UNAUTHORIZED_TOKEN_MISSING_MSG: 'Token missing. You have to sign in',
  UNAUTHORIZED_TOKEN_EXPIRED_MSG: 'Token are expired',

  // bad request messages
  BAD_REQUEST_MSG: 'Wrong data',

  // not found messages
  NOT_FOUND_PRODUCT_MSG: 'Product not found, invalid id ',
  NOT_FOUND_REVIEW_MSG: 'Review not found, invalid id ',
  NOT_FOUND_CATEGORY_MSG: 'Category not found, invalid slug',
  NOT_FOUND_USER_MSG: 'User not found',
  NOT_FOUND_ORDER_MSG: 'Order not found, invalid order code',

  // file problem messages
  FILE_ERROR_MSG: 'Something went wrong working with file',

  //google problem messages
  GOOGLE_ERROR_MSG: 'The Google server cannot verify the Token',

  //mongoDB invalid id
  MONGO_INVALID_ID: 'Invalid _id for Mongoose',

  LEFT_REVIEW: 'This user has already left a review for this product',

  //image
  LIMIT_ADD_NEW_IMAGE: 'Exceeded the limit for adding images to the product',
  NOT_FOUND_IMAGE_BY_IDIMAGE: 'The product does not have an image for this ID',
};
