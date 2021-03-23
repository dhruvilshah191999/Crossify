import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardRadarChart from "components/Cards/CardRadarChart.js";
import CardFileChart from "components/Cards/CardFileChart.js";
import CardDougnutChart from "components/Cards/CardDougnutChart";
import CardLocationChart from "components/Cards/CardLocationChart";

export default function Dashboard() {
  return (
    <>
      {/* <StatsBox /> */}
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>

      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <CardFileChart />
        </div>
        <div className="w-full xl:w-6/12 px-4">
          <CardRadarChart />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <CardDougnutChart />
        </div>
        <div className="w-full xl:w-6/12 px-4">
          <CardLocationChart />
        </div>
      </div>
    </>
  );
}
