import React from 'react';
import "../../styles/pagination.css"

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <ul className="pagination" >
            {pageNumbers.map(pageNumber => (
                <li
                    key={pageNumber}
                    className={`pagination-item ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => onPageChange(pageNumber)}
                >

                    <p>{pageNumber}</p>

                </li>
            ))}
        </ul>
    );
};

export default Pagination;
