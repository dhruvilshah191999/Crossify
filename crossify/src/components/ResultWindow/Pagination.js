import React from "react";
import { motion } from "framer-motion";

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
            {pageNumbers.map((number) => {
              var classNames =
                "first:ml-0 text-xs cursor-pointer font-semibold text-alpha bg-white flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2";
              if (number === current) {
                classNames =
                  "first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha  bg-white  m-2";
              }
              return (
                <motion.li
                  key={number}
                  id={number}
                  onClick={(e) => {
                    paginate(number);
                    setcurrent(number);
                  }}
                  className={classNames}
                  whileHover={{ scale: 1.09 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {number}
                </motion.li>
              );
              // <li
              //   className={current === number ? "active" : ""}
              //   onClick={(e) => setcurrent(number)}
              //   key={number}
              // >
              //   <a
              //     href="#"
              //     onClick={() => paginate(number)}
              //     className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blue-500 bg-white text-blue-500"
              //   >
              //     {number}
              //   </a>
              // </li>
            })}
          </ol>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
