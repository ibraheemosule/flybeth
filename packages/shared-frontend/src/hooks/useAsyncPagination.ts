import { useState, useEffect, useCallback } from "react";
import type {
  AsyncPaginationState,
  PaginationRequest,
  PaginationResponse,
} from "../types/pagination";

interface UseAsyncPaginationOptions<T> {
  fetchFunction: (request: PaginationRequest) => Promise<PaginationResponse<T>>;
  initialPage?: number;
  itemsPerPage?: number;
  autoFetch?: boolean;
  onError?: (error: Error) => void;
}

export function useAsyncPagination<T>({
  fetchFunction,
  initialPage = 1,
  itemsPerPage = 10,
  autoFetch = true,
  onError,
}: UseAsyncPaginationOptions<T>) {
  const [state, setState] = useState<AsyncPaginationState<T>>({
    data: [],
    currentPage: initialPage,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(
    async (page: number, additionalParams?: Partial<PaginationRequest>) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const request: PaginationRequest = {
          page,
          limit: itemsPerPage,
          ...additionalParams,
        };

        const response = await fetchFunction(request);

        setState(prev => ({
          ...prev,
          data: response.data,
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          totalItems: response.pagination.totalItems,
          itemsPerPage: response.pagination.itemsPerPage,
          isLoading: false,
          error: null,
        }));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));

        if (onError && error instanceof Error) {
          onError(error);
        }
      }
    },
    [fetchFunction, itemsPerPage, onError]
  );

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= state.totalPages && !state.isLoading) {
        fetchData(page);
      }
    },
    [fetchData, state.totalPages, state.isLoading]
  );

  const refresh = useCallback(() => {
    fetchData(state.currentPage);
  }, [fetchData, state.currentPage]);

  const reset = useCallback(() => {
    setState({
      data: [],
      currentPage: initialPage,
      totalPages: 0,
      totalItems: 0,
      itemsPerPage,
      isLoading: false,
      error: null,
    });
    if (autoFetch) {
      fetchData(initialPage);
    }
  }, [fetchData, initialPage, itemsPerPage, autoFetch]);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchData(initialPage);
    }
  }, [autoFetch, initialPage]); // Removed fetchData from deps to avoid infinite loop

  return {
    // State
    data: state.data,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    totalItems: state.totalItems,
    itemsPerPage: state.itemsPerPage,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    goToPage,
    refresh,
    reset,
    fetchData,

    // Computed
    hasNext: state.currentPage < state.totalPages,
    hasPrev: state.currentPage > 1,
    isEmpty: state.data.length === 0 && !state.isLoading,
  };
}
