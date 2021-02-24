import React from "react";
import BigClubCard from "components/Cards/BigClubCard";

const ResultWindow2 = ({ getclub, loading }) => {
  if (loading) {
    return <h2>loading...</h2>;
  }
  return (
    <div style={{ marginLeft: 300 }}>
      {getclub.map((data) => (
        <BigClubCard key={data._id} data={data} />
      ))}
    </div>
  );
};

export default ResultWindow2;
