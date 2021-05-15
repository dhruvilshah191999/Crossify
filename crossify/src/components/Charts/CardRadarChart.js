import React from "react";
import Chart from "chart.js";
import axios from "axios";
import { useParams } from "react-router";
import NoPreview from "components/sections/NoPreview";

export default function CardBarChart() {
  var { id } = useParams();
  const [dataExist, setDataExist] = React.useState(false);
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
        "/api/admin/channelGraphs",
        send_data,
        config2
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else if (finaldata.data.label && finaldata.data.label.length) {
        setDataExist(true);
        var date = new Date();
        date.setMonth(date.getMonth() + 1);
        let config = {
          type: "radar",
          data: {
            labels: finaldata.data.label,
            datasets: [
              {
                backgroundColor: "#ed64a6",
                borderColor: "#ed64a6",
                data: finaldata.data.data,
                fill: false,
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
              display: false,
              labels: {
                fontColor: "rgba(0,0,0,.4)",
              },
              align: "end",
              position: "bottom",
            },
          },
        };
        let ctx = document.getElementById("radar-chart").getContext("2d");
        window.myRadar = new Chart(ctx, config);
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
            {dataExist ? <canvas id="radar-chart"></canvas> : <NoPreview />}
          </div>
        </div>
      </div>
    </>
  );
}
