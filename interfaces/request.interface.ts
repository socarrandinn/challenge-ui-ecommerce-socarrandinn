export type RequestConfig = RequestInit & {
  auth?: boolean;
  params?: Record<string, unknown>;
  next?: { tags?: string[] };
  headers?: Partial<Record<string, string>> | undefined;

};
