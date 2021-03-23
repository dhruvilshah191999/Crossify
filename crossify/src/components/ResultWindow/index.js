import React from "react";
import BigEventCard from "components/Cards/BigEventCard";
import MapwithEvents from "components/Maps/MapWithEvents";

const ResultWindow = ({ getevent, loading }) => {
  if (loading) {
    return <h2>loading...</h2>;
  }
  return (
    <div className="flex  md:mt-10">
      <div className="lg:w-8/12 w-full md:ml-50 ">
        {getevent.map((data) => (
          <BigEventCard key={data._id} data={data} />
        ))}
      </div>
      <div className="hidden lg:show lg:w-4/12 rounded overflow-hidden ">
        <MapwithEvents data={getevent}></MapwithEvents>
      </div>
    </div>
  );
};

export default ResultWindow;
