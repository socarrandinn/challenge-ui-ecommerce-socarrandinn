export type ISearchParams = {
  state?: string;
  search?: string;
  category?: string;
};

export type IParams = Promise<Partial<{ [key: string]: string }>>;
