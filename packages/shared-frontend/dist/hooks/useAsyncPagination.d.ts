import type { PaginationRequest, PaginationResponse } from "../types/pagination";
interface UseAsyncPaginationOptions<T> {
    fetchFunction: (request: PaginationRequest) => Promise<PaginationResponse<T>>;
    initialPage?: number;
    itemsPerPage?: number;
    autoFetch?: boolean;
    onError?: (error: Error) => void;
}
export declare function useAsyncPagination<T>({ fetchFunction, initialPage, itemsPerPage, autoFetch, onError, }: UseAsyncPaginationOptions<T>): {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    isLoading: boolean;
    error: string | null;
    goToPage: (page: number) => void;
    refresh: () => void;
    reset: () => void;
    fetchData: (page: number, additionalParams?: Partial<PaginationRequest>) => Promise<void>;
    hasNext: boolean;
    hasPrev: boolean;
    isEmpty: boolean;
};
export {};
