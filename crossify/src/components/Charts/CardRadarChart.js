import React from "react";
import Chart from "chart.js";

export default function CardBarChart() {
  React.useEffect(() => {
    var date = new Date();
    date.setMonth(date.getMonth() + 1);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let config = {
      type: "radar",
      data: {
        labels: [
          "Exposure", //new memebers size compare to last month
          "Audience", //how many participate
          "Intiative", //how many request recieved for event
          "Curiosity", //question asked
          "Enthusiasm", //shared the event
        ],
        datasets: [
          {
            label: monthNames[new Date().getMonth()],
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: [30, 78, 56, 34, 100],
            fill: false,
            barThickness: 8,
          },
          {
            label: monthNames[new Date().getMonth() - 1],
            //   .toLocaleString("default", { month: "long" }),
            //   Date().setMonth(new Date().getMonth() + 1)
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [27, 68, 86, 74, 10],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        // scales: {
        //   xAxes: [
        //     {
        //       display: false,
        //       scaleLabel: {
        //         display: true,
        //         labelString: "Month",
        //       },
        //       gridLines: {
        //         borderDash: [2],
        //         borderDashOffset: [2],
        //         color: "rgba(33, 37, 41, 0.3)",
        //         zeroLineColor: "rgba(33, 37, 41, 0.3)",
        //         zeroLineBorderDash: [2],
        //         zeroLineBorderDashOffset: [2],
        //       },
        //     },
        //   ],
        //   yAxes: [
        //     {
        //       display: true,
        //       scaleLabel: {
        //         display: false,
        //         labelString: "Value",
        //       },
        //       gridLines: {
        //         borderDash: [2],
        //         drawBorder: false,
        //         borderDashOffset: [2],
        //         color: "rgba(33, 37, 41, 0.2)",
        //         zeroLineColor: "rgba(33, 37, 41, 0.15)",
        //         zeroLineBorderDash: [2],
        //         zeroLineBorderDashOffset: [2],
        //       },
        //     },
        //   ],
        // },
      },
    };
    let ctx = document.getElementById("radar-chart").getContext("2d");
    window.myRadar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-gray-500 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-gray-800 text-xl font-semibold">
                Monthly Attributes
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="radar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}