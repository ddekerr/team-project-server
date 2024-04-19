export type Filter = {
  category?: string;
  ids?: string;
};

export type Params = Filter & {
  sort?: string;
};
