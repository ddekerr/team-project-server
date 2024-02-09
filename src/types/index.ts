export type ValidationError = {
  [type: string]: string[];
};

export enum Actions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  GET = 'GET',
  ADD_POSTER = 'ADD_POSTER',
  ADD_CATEGORY = 'ADD_CATEGORY',
}

export enum EntityType {
  PRODUCT = 'PRODUCT',
  CATEGORY = 'CATEGORY',
}
