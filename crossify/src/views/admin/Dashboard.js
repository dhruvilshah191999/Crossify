import React from "react";

// components
import Sidebar from "components/Sidebar/ManageClubSidebar.js";
import CardLineChart from "components/Charts/CardLineChart.js";
import CardBarChart from "components/Charts/CardBarChart.js";
import CardRadarChart from "components/Charts/CardRadarChart.js";
import CardFileChart from "components/Charts/CardFileChart.js";
import CardDougnutChart from "components/Charts/CardDougnutChart";
import CardLocationChart from "components/Charts/CardLocationChart";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
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
