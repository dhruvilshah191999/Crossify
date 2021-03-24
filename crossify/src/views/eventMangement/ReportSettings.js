import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Sidebar from "components/Sidebar/ManageEventSidebar.js";
import ReportTable from "components/Cards/ReportTable.js";

export default function Settings() {
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const token = localStorage.getItem("jwt");
  const [loding, setloding] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        event_id: id,
        token,
      };
      const finaldata = await axios.post(
        "/api/manage/get-all-reports",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        console.log(finaldata.data.data);
        setdata(finaldata.data.data);
        setTimeout(setloding(true), 1000);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <Sidebar />
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          {loding ? <ReportTable finaldata={data} /> : ""}
        </div>
      </div>
    </>
  );
}
