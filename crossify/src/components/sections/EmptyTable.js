import React from "react";

const EmptyTable = ({ isLight }) => {
  return (
    <div className="center-now">
      {" "}
      <div className="flex">
        <div>
          {" "}
          <i className="far fa-dizzy text-5xl mr-4 mt-2"></i>
        </div>
        <div>
          <h1
            className={
              isLight ? "text-2xl text-gray-700 " : "text-2xl text-white"
            }
          >
            No Data Found
          </h1>
          <h2 className="text-gray-500 mr-4">
            There is no entries in this table right now.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default EmptyTable;
