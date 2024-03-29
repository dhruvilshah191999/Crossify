import React from "react";
import Chart from "chart.js";
import axios from "axios";
import { useParams } from "react-router";
import NoPreview from "components/sections/NoPreview";

export default function CardDougnutChart() {
  const [dataExist, setDataExist] = React.useState(false);
  var { id } = useParams();
  React.useEffect(() => {
    async function getData() {
      const config2 = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      };
      var send_data = {
        club_id: id,
      };
      const finaldata = await axios.post(
        "/api/admin/eventsGraphs",
        send_data,
        config2
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else if (finaldata.data.label && finaldata.data.label.length) {
        setDataExist(true);
        var config = {
          type: "doughnut",
          data: {
            labels: ["Pending", "Approved", "Rejected", "Completed"],
            datasets: [
              {
                data: finaldata.data.data,
                backgroundColor: ["#ed8936", "#4299e1", "#f56565", "#008000"],
                borderAlign: "center",
                borderWidth: 4,
              },
            ],
            // [
            //   // {
            //   //   label: new Date().getFullYear(),
            //   //   backgroundColor: "#4c51bf",
            //   //   borderColor: "#4c51bf",
            //   //   data: [65, 78, 66, 44, 56, 67, 75],
            //   //   fill: false,
            //   // },
            //   {
            //     label: new Date().getFullYear() - 1,
            //     fill: false,
            //     backgroundColor: "#fff",
            //     borderColor: "#fff",
            //     data: [40, 68, 86, 74, 56, 60, 87],
            //   },
            // ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Sales Charts",
              fontColor: "white",
            },
            legend: {
              labels: {
                fontColor: "#2d3748",
              },
              align: "center",
              position: "right",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            // scales: {
            //   xAxes: [
            //     {
            //       ticks: {
            //         fontColor: "rgba(255,255,255,.7)",
            //       },
            //       display: true,
            //       scaleLabel: {
            //         display: false,
            //         labelString: "Month",
            //         fontColor: "white",
            //       },
            //       gridLines: {
            //         display: false,
            //         borderDash: [2],
            //         borderDashOffset: [2],
            //         color: "rgba(33, 37, 41, 0.3)",
            //         zeroLineColor: "rgba(0, 0, 0, 0)",
            //         zeroLineBorderDash: [2],
            //         zeroLineBorderDashOffset: [2],
            //       },
            //     },
            //   ],
            //   yAxes: [
            //     {
            //       ticks: {
            //         fontColor: "rgba(255,255,255,.7)",
            //       },
            //       display: true,
            //       scaleLabel: {
            //         display: false,
            //         labelString: "Value",
            //         fontColor: "white",
            //       },
            //       gridLines: {
            //         borderDash: [3],
            //         borderDashOffset: [3],
            //         drawBorder: false,
            //         color: "rgba(255, 255, 255, 0.15)",
            //         zeroLineColor: "rgba(33, 37, 41, 0)",
            //         zeroLineBorderDash: [2],
            //         zeroLineBorderDashOffset: [2],
            //       },
            //     },
            //   ],
            // },
          },
        };
        var ctx = document.getElementById("dougnut-chart").getContext("2d");
        window.myDougnut = new Chart(ctx, config);
      }
    }
    getData();
  }, [id]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-gray-500 mb-1 text-xs font-semibold">
                Distribution
              </h6>
              <h2 className="text-gray-800 text-xl font-semibold">
                Events' Status
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            {dataExist ? <canvas id="dougnut-chart"></canvas> : <NoPreview />}
          </div>
        </div>
      </div>
    </>
  );
}
