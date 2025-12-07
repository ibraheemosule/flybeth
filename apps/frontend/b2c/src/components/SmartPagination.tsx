import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./ui/pagination";

interface SmartPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  className?: string;
  isLoading?: boolean;
}

export function SmartPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  className = "",
  isLoading = false,
}: SmartPaginationProps) {
  // Generate page numbers with ellipsis for better UX with large datasets
  const getPageNumbers = () => {
    const delta = 2; // Show 2 pages on each side of current page
    const pages: (number | "ellipsis")[] = [];

    // For small datasets (≤ 7 pages), show all pages
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // For larger datasets, use ellipsis
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    // Always show first page
    pages.push(1);

    // Add ellipsis if gap between 1 and rangeStart
    if (rangeStart > 2) {
      pages.push("ellipsis");
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Add ellipsis if gap between rangeEnd and last page
    if (rangeEnd < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && !isLoading) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  // Calculate showing range for display
  const startItem = Math.max(1, (currentPage - 1) * itemsPerPage + 1);
  const endItem = totalItems
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : currentPage * itemsPerPage;

  return (
    <div className={`mt-8 ${className}`}>
      {/* Page info for mobile */}
      <div className="text-center mb-4 sm:hidden">
        <span className="text-sm text-muted-foreground">
          {isLoading ? "Loading..." : `Page ${currentPage} of ${totalPages}`}
        </span>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={`${
                currentPage === 1 || isLoading
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              } ${isLoading ? "animate-pulse" : ""}`}
            />
          </PaginationItem>

          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className={`${
                    isLoading
                      ? "pointer-events-none animate-pulse"
                      : "cursor-pointer"
                  } ${
                    currentPage === page
                      ? "bg-gradient-to-r from-[#2563eb] to-[#10b981] text-white border-transparent hover:bg-gradient-to-r hover:from-[#2563eb]/90 hover:to-[#10b981]/90"
                      : ""
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={`${
                currentPage === totalPages || isLoading
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              } ${isLoading ? "animate-pulse" : ""}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Results info for desktop */}
      <div className="text-center mt-4 hidden sm:block">
        <span className="text-sm text-muted-foreground">
          {isLoading
            ? "Loading results..."
            : totalItems
            ? `Showing ${startItem} to ${endItem} of ${totalItems} results`
            : `Showing ${startItem} to ${endItem} results`}
        </span>
      </div>
    </div>
  );
}
