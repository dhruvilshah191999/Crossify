import React from "react";

const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="py-2" style={{ marginLeft: "50%" }}>
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          {pageNumbers.map((number) => (
            <li>
              <a
                href="#"
                onClick={() => paginate(number)}
                className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blue-500 bg-white text-blue-500"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
