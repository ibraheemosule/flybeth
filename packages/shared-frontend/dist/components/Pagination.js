import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Pagination = ({ currentPage, totalPages, onPageChange, className = "", }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };
    // Generate page numbers with ellipsis for large datasets
    const getPageNumbers = () => {
        const delta = 2; // Show 2 pages on each side of current page
        const pages = [];
        const rangeStart = Math.max(2, currentPage - delta);
        const rangeEnd = Math.min(totalPages - 1, currentPage + delta);
        // Always show first page
        pages.push(1);
        // Add ellipsis if gap between 1 and rangeStart
        if (rangeStart > 2) {
            pages.push("...");
        }
        // Add pages in range
        for (let i = rangeStart; i <= rangeEnd; i++) {
            if (i !== 1 && i !== totalPages) {
                pages.push(i);
            }
        }
        // Add ellipsis if gap between rangeEnd and last page
        if (rangeEnd < totalPages - 1) {
            pages.push("...");
        }
        // Always show last page (if more than 1 page total)
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        return pages;
    };
    if (totalPages <= 1)
        return null;
    const pageNumbers = getPageNumbers();
    const buttonBaseClass = "px-3 py-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2";
    const prevNextClass = `${buttonBaseClass} border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`;
    const pageButtonClass = (isActive) => `w-8 h-8 rounded-lg text-sm transition-all ${isActive
        ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md"
        : "hover:bg-gray-100 text-gray-600"}`;
    return (_jsxs("div", { className: `flex items-center justify-between mt-8 p-4 bg-white rounded-xl border shadow-sm ${className}`, children: [_jsxs("button", { onClick: handlePrevPage, disabled: currentPage === 1, className: `${prevNextClass} flex items-center gap-2`, children: [_jsx("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }), "Previous"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-sm text-gray-600 hidden sm:block", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("div", { className: "flex gap-1", children: pageNumbers.map((page, index) => {
                            if (page === "...") {
                                return (_jsx("span", { className: "w-8 h-8 flex items-center justify-center text-gray-500 text-sm", children: "..." }, `ellipsis-${index}`));
                            }
                            return (_jsx("button", { onClick: () => onPageChange(page), className: pageButtonClass(currentPage === page), children: page }, page));
                        }) })] }), _jsxs("button", { onClick: handleNextPage, disabled: currentPage === totalPages, className: `${prevNextClass} flex items-center gap-2`, children: ["Next", _jsx("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] })] }));
};
