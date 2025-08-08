export type ISearchParams = {
  state?: string;
  search?: string;
  category?: string;
  page?: string;
  size?: string;
  filters?: any;
};

export type IParams = Promise<Partial<{ [key: string]: string }>>;
