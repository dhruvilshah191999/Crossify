import React from "react";
import BigClubCard from "components/Cards/BigClubCard";
import MapWithClubs from "components/Maps/MapWithClubs";

const ResultWindow2 = ({ getclub, loading }) => {
  if (loading) {
    return <h2>loading...</h2>;
  }
  return (
    <div className="flex  md:mt-10">
      <div className="lg:w-8/12 w-full md:ml-50 lg:minH80 ">
        {getclub.length ? (
          getclub.map((data) => <BigClubCard key={data._id} data={data} />)
        ) : (
          <div
            className="flex justify-center content-center"
            style={{ height: 400 }}
          >
            <div className="flex flex-row mt-32">
              {" "}
              <div>
                {" "}
                <i class="far fa-calendar-times text-5xl mr-4 mt-2"></i>
              </div>
              <div>
                <h1 className="text-2xl text-gray-700 ">No Results Found "</h1>
                <h2 className="text-gray-600 mr-4">
                  Try to search other relevant terms.
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:show lg:w-4/12 rounded overflow-hidden ">
        <MapWithClubs data={getclub} />
      </div>
    </div>
  );
};

export default ResultWindow2;
