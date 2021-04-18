import React from "react";
import Chart from "chart.js";
import axios from "axios";
import { useParams } from "react-router";
export default function CardLineChart() {
  var { id } = useParams();
  React.useEffect(async () => {
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
      "/api/admin/ExtentionsGraphs",
      send_data,
      config2
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
       finaldata.data.label = finaldata.data.label.map(function (x) {
         return x.toUpperCase();
       });
      var config = {
        type: "polarArea",
        data: {
          datasets: [
            {
              data: finaldata.data.data,
              backgroundColor: [
                "#ff75a0",
                "#fce38a",
                "#4299e1",
                "#95e1d3",
                "#364f6b",
                "#a1cae2",
              ],
              label: "My dataset", // for legend
            },
          ],
          labels: finaldata.data.label,
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,

          legend: {
            position: "right",
          },
          title: {
            display: false,
            text: "Chart.js Polar Area Chart",
          },

          scales: {
            r: {
              ticks: {
                beginAtZero: true,
              },
              reverse: false,
            },
          },
          animation: {
            animateRotate: false,
            animateScale: true,
          },
        },
      };

      var ctx = document.getElementById("polar-chart").getContext("2d");
      window.myPolar = new Chart(ctx, config);
    }
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-gray-500 mb-1 text-xs font-semibold">
                Files
              </h6>
              <h2 className="text-gray-800 text-xl font-semibold">
                Extentions
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4  flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="polar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
