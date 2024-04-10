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
  RATE = 'RATE',
}

export enum EntityType {
  PRODUCT = 'PRODUCT',
  CATEGORY = 'CATEGORY',
}
