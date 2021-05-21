import React from "react";
import BigEventCard from "components/Cards/BigEventCard";
import MapwithEvents from "components/Maps/MapWithEvents";
import ClipLoader from "react-spinners/ClipLoader";
const ResultWindow = ({ getevent, loading }) => {
  return (
    <div className={loading ? "" : "flex  md:mt-10"}>
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{ height: "100vh" }}
        >
          <ClipLoader color="#36D7B7" size={50} />
        </div>
      ) : (
        <div className="lg:w-8/12 w-full md:ml-50 lg:minH80 ">
          {getevent.length ? (
            getevent.map((data) => <BigEventCard key={data._id} data={data} />)
          ) : (
            <div
              className="flex justify-center content-center"
              style={{ height: 400 }}
            >
              <div className="flex flex-row mt-32">
                {" "}
                <div>
                  {" "}
                  <i className="far fa-calendar-times text-5xl mr-4 mt-2"></i>
                </div>
                <div>
                  <h1 className="text-2xl text-gray-700 ">No Results Found</h1>
                  <h2 className="text-gray-600 mr-4">
                    Try to search other relevant terms.
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="hidden lg:show lg:w-4/12 rounded overflow-hidden ">
        <MapwithEvents data={getevent}></MapwithEvents>
      </div>
    </div>
  );
};

export default ResultWindow;
