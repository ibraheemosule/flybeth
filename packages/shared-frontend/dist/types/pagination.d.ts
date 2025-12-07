export interface PaginationResponse<T> {
    data: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
export interface PaginationRequest {
    page: number;
    limit: number;
    sort?: string;
    order?: "asc" | "desc";
    filters?: Record<string, any>;
}
export interface AsyncPaginationState<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    isLoading: boolean;
    error: string | null;
}
export type PaginatedAPIFunction<T> = (request: PaginationRequest) => Promise<PaginationResponse<T>>;
