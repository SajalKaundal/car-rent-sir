export default function Pagination({page,totalPages,pages,setPage}) {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-5">
          <li
            className={`page-item ${page === 1 && "disabled"}`}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <a className="page-link" href="#" tabIndex="-1">
              Previous
            </a>
          </li>
          {pages.map((p) => p)}

          <li className={`page-item ${page === totalPages && "disabled"}`}>
            <a
              className="page-link"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
