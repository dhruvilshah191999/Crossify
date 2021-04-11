import React from "react";

function EmptyContainer(props) {
  return (
    <div className="flex justify-center content-center" style={{ height: 400 }}>
      <div className="flex flex-row mt-32">
        {" "}
        <div>
          {" "}
          <i class="far fa-dizzy text-5xl mr-4 mt-2"></i>
        </div>
        <div>
          <h1 className="text-2xl text-gray-700 ">Oops Such Empty Place...</h1>
          <h2 className="text-gray-600 mr-4">No Data found.</h2>
        </div>
      </div>
    </div>
  );
}

export default EmptyContainer;
