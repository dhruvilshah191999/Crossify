import React from "react";
import BigClubCard from "components/Cards/BigClubCard";
import MapWithClubs from "components/Maps/MapWithClubs";

const ResultWindow2 = ({ getclub, loading }) => {
  if (loading) {
    return <h2>loading...</h2>;
  }
  return (
    <div className="flex  md:mt-10">
      <div className="lg:w-8/12 w-full md:ml-50 ">
        {getclub.map((data) => (
          <BigClubCard key={data._id} data={data} />
        ))}
      </div>
      <div className="hidden lg:show lg:w-4/12 rounded overflow-hidden ">
        <MapWithClubs data={getclub} />
      </div>
    </div>
  );
};

export default ResultWindow2;
