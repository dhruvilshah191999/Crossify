import React from "react";
import Chart from "chart.js";
import axios from "axios";
import { useParams } from "react-router";
export default function CardBarChart() {
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
        "/api/admin/LocationGraphs",
        send_data,
        config2
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        var config = {
          type: "pie",
          data: {
            datasets: [
              {
                data: finaldata.data.data,
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
            labels: finaldata.data.label,
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
      }
    }
    getData();
  }, [id]);
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