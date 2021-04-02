import React from "react";
import Chart from "chart.js";

export default function CardBarChart() {
  React.useEffect(() => {
    var randomScalingFactor = function () {
      return Math.round(Math.random() * 100);
    };

    var config = {
      type: "pie",
      data: {
        datasets: [
          {
            data: [12, 45, 6, 4, 2],
            backgroundColor: [
              "#ff75a0",
              "#fce38a",
              "#4299e1",
              "#95e1d3",
              "gray",
            ],
            label: "Dataset 1",
          },
        ],
        labels: ["Ahmedabad", "Gandhinagar", "Sanad", "Anand", "Other"],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
      },
    };

    let ctx = document.getElementById("pie-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-gray-500 mb-1 text-xs font-semibold">
                Geography
              </h6>
              <h2 className="text-gray-800 text-xl font-semibold">Location</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="pie-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}