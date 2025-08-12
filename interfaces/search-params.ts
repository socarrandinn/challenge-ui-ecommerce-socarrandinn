export type ISearchParams = {
  state?: string;
  search?: string;
  category?: string;

  locale?: string
  region?: string
};

export type IParams = Promise<Partial<{ [key: string]: string }>>;
