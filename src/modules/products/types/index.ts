export type Filter = {
  category?: string;
  id?: number;
};

export type Params = Filter & {
  sort?: string;
};
