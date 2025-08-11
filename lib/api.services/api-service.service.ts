import { RequestConfig } from "@/interfaces/request.interface";
import { ENV_CONFIG } from "../config/env.config";

enum Method {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'PATCH' = 'PATCH',
  'DELETE' = 'DELETE',
}

const buildBackendUrl = (path: string) => {
  if (path?.startsWith('http') || path?.startsWith('https')) return path;

  return [process.env.NEXT_PUBLIC_BACKEND_URL!, path].join('');
};

// Función helper para obtener cookies
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null; // SSR check

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

// Función para obtener headers con cookies de locale y region
const getLocaleHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {};

  const locale = getCookie(ENV_CONFIG.cookies.NEXT_LOCALE);
  const region = getCookie(ENV_CONFIG.cookies.X_REGION);

  if (locale) {
    headers['X-Locale'] = locale;
    headers['Accept-Language'] = locale;
  }

  if (region) {
    headers['X-Region'] = region;
  }

  return headers;
};

interface FetchResponse {
  data: any;
  status: number;
  statusText: string;
  headers: Headers;
}

export class ApiService {
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor() {
    this.timeout = 30000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async executeWithTimeout(
    fetchPromise: Promise<Response>,
    timeoutMs: number
  ): Promise<Response> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request timeout'));
      }, timeoutMs);
    });

    return Promise.race([fetchPromise, timeoutPromise]);
  }

  private async handleResponse(response: Response): Promise<FetchResponse> {
    let data;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  request = async (
    method: Method,
    path: string,
    config: RequestConfig = {}
  ) => {
    const url = buildBackendUrl(path);

    const {
      body,
      params,
      headers = {},
      ...fetchConfig
    } = config;

    // Build URL with query parameters if they exist
    let finalUrl = url;
    if (params && method === Method.GET) {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          searchParams.append(key, String(params[key]));
        }
      });
      if (searchParams.toString()) {
        finalUrl += (url.includes('?') ? '&' : '?') + searchParams.toString();
      }
    }

    // Obtener headers de locale y region desde cookies
    const localeHeaders = getLocaleHeaders();

    // Prepare headers with cookies de locale y region
    // @ts-ignore
    const requestHeaders: Record<string, string> = {
      ...this.defaultHeaders,
      ...localeHeaders, // Agregar headers de locale y region
      ...headers, // Los headers pasados por parámetro tienen prioridad
    };

    // Prepare fetch configuration
    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
      ...fetchConfig,
    };

    // Handle body/data
    if (body && method !== Method.GET) {
      if (body instanceof FormData) {
        fetchOptions.body = body;
        delete requestHeaders['Content-Type'];
        fetchOptions.headers = requestHeaders;
      } else if (typeof body === 'object') {
        fetchOptions.body = JSON.stringify(body);
      } else {
        fetchOptions.body = body;
      }
    }

    const executeRequest = async (): Promise<FetchResponse> => {
      try {
        const fetchPromise = fetch(finalUrl, fetchOptions);
        const response = await this.executeWithTimeout(
          fetchPromise,
          this.timeout
        );

        const result = await this.handleResponse(response);

        // If response is not successful, throw error similar to axios
        if (!response.ok) {
          const errorResponse = {
            error: result.data,
            status: result.status,
          };
          throw errorResponse;
        }

        return result;
      } catch (error: any) {
        // Error log similar to axios interceptor
        console.error('API SERVICE - Network or Service Error: =============', {
          endpoint: finalUrl,
          error: error.error || error.message,
          body: fetchOptions.body,
          headers: fetchOptions.headers,
        });

        let errorResponse;

        if (error.status) {
          // HTTP response error
          errorResponse = {
            error: error.error,
            status: error.status,
          };
        } else if (error.message === 'Request timeout') {
          errorResponse = {
            error: {
              message: 'Request timeout.',
              details: error.message,
            },
          };
        } else if (error.message?.includes('fetch')) {
          errorResponse = {
            error: {
              message: 'Network error or server unavailable.',
              details: error.message,
            },
          };
        } else {
          errorResponse = {
            error: {
              message: 'Request configuration error.',
              details: error.message,
            },
          };
        }

        throw errorResponse;
      }
    };

    return executeRequest();
  };

  get = async (path: string, params: any = {}, config: RequestConfig = {}) => {
    return this.request(Method.GET, path, {
      params,
      ...config,
    });
  };

  post = async (path: string, data: any = {}, config: RequestConfig = {}) => {
    return this.request(Method.POST, path, {
      body: data,
      ...config,
    });
  };

  put = async (path: string, data: any = {}, config: RequestConfig = {}) => {
    return this.request(Method.PUT, path, {
      body: data,
      ...config,
    });
  };

  patch = async (path: string, data: any = {}, config: RequestConfig = {}) => {
    return this.request(Method.PATCH, path, {
      body: data,
      ...config,
    });
  };

  delete = async (path: string, config: RequestConfig = {}) => {
    return this.request(Method.DELETE, path, {
      ...config,
    });
  }
}