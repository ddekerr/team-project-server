export type ValidationError = {
  [type: string]: string[];
};

export enum Actions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  GET = 'GET',
  GET_LIST = 'GET_LIST',
  ADD_POSTER = 'ADD_POSTER',
  ADD_CATEGORY = 'ADD_CATEGORY',
  ADD_IMAGE = 'ADD_IMAGE',
  RATE = 'RATE',
  LOGOUT = 'LOGOUT',
  LOGIN = 'LOGIN',
  REFRESH = 'REFRESH',
}

export enum EntityType {
  PRODUCT = 'PRODUCT',
  CATEGORY = 'CATEGORY',
  USER = 'USER',
  ORDERS = 'ORDERS',
  REVIEW = 'REVIEW',
}
