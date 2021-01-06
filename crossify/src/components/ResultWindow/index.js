import React from "react";
import BigEventCard from "components/Cards/BigEventCard";

const ResultWindow = ({ getevent, loading }) => {
  if (loading) {
    return <h2>loading...</h2>;
  }
  return (
    <div style={{ marginLeft: 300 }}>
      {getevent.map((data) => (
        <BigEventCard data={data} />
      ))}
    </div>
  );
};

export default ResultWindow;
