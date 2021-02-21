import React from "react";
import "./Pagination.css";

const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const [current, setcurrent] = React.useState(1);
  let checkpage = false;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
    if (i === current) checkpage = true;
  }

  return (
    <div className="pagination">
      <ul>
        <li>
          <ol>
            {pageNumbers.map((number) => (
              <li
                className={current === number ? "active" : ""}
                onClick={(e) => setcurrent(number)}
                key={number}
              >
                <a
                  href="#"
                  onClick={() => paginate(number)}
                  className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blue-500 bg-white text-blue-500"
                >
                  {number}
                </a>
              </li>
            ))}
          </ol>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
