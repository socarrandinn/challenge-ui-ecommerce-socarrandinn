"use client";
import { useState, useCallback } from "react";
import { mutate as swrMutate } from "swr";

interface MutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  onSettled?: (data: TData | null, error: Error | null) => void;
  invalidateKeys?: string[];
}

interface MutationState<TData> {
  data: TData | null;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

interface MutationResult<TData, TVariables> extends MutationState<TData> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  reset: () => void;
}

export const useMutation = <TData = any, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: MutationOptions<TData, TVariables> = {}
): MutationResult<TData, TVariables> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const mutateAsync = useCallback(
    async (variables: TVariables): Promise<TData> => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await mutationFn(variables);
        setData(result);

        // Ejecutar callback de éxito si existe
        if (options.onSuccess) {
          options.onSuccess(result, variables);
        }

        // Invalidar caché relacionado si se especifica
        if (options.invalidateKeys) {
          options.invalidateKeys.forEach((key) => {
            swrMutate(key);
          });
        }

        return result;
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);

        // Ejecutar callback de error si existe
        if (options.onError) {
          options.onError(errorObj, variables);
        }

        throw errorObj;
      } finally {
        setIsLoading(false);

        // Ejecutar callback final si existe
        if (options.onSettled) {
          options.onSettled(data, error);
        }
      }
    },
    [mutationFn, options, data, error]
  );

  const mutate = useCallback(
    (variables: TVariables) => {
      mutateAsync(variables).catch(() => {
        // Silenciar errores si no se maneja explícitamente
      });
    },
    [mutateAsync]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    mutate,
    mutateAsync,
    data,
    error,
    isLoading,
    isError: !!error,
    isSuccess: !isLoading && !error && data !== null,
    reset,
  };
};
