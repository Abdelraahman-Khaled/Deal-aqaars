import { useState } from "react";
import "./Pagination.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";

const PaginationPage = ({ itemCount, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
        onPageChange({ selected }); // onPageChange function
    };

    return (
        <div className="all-pagination d-flex justify-content-center align-items-center mt-5">
            <ReactPaginate
                breakLabel="..."
                nextLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={parseInt(itemCount)}
                previousLabel={<FontAwesomeIcon icon={faChevronRight} />}
                renderOnZeroPageCount={null}
                containerClassName="pagination d-flex align-items-center gap-2"
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                activeClassName={"active-1"}
            />
        </div>
    );
};

export default PaginationPage;
