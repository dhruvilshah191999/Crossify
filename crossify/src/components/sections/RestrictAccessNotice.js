import React from "react";

function RestrictAccessNotice(props) {
  return (
    <div className="flex justify-center content-center" style={{ height: 400 }}>
      <div className="flex flex-row mt-32">
        {" "}
        <div>
          {" "}
          <i class="fas fa-lock text-5xl mr-4 mt-2"></i>
        </div>
        <div>
          <h1 className="text-2xl text-gray-700 ">
            You can not access this section.
          </h1>
          <h2 className="text-gray-600 mr-4">
            Access is restricted to the users , only Official Club Members can
            see this.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default RestrictAccessNotice;
