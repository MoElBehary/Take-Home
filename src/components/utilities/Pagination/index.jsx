import ReactPaginate from "react-paginate";

const Pagination = ({ handlePageChange, totalPages }) => {
  return (
    <ReactPaginate
      nextLabel=">"
      onPageChange={handlePageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      previousLabel="<"
      pageClassName="page-item"
      pageLinkClassName="page-link "
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
