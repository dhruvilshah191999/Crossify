import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Sidebar from "components/Sidebar/ManageEventSidebar.js";
import AttendeesTable from "components/Tables/AttendeesTable.js";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Settings() {
  const { id } = useParams();
  const [data, setdata] = useState([]);
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
      };
      const finaldata = await axios.post(
        "/api/manage/get-list",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setdata(finaldata.data.data);
        setTimeout(() => {
          setloding(true);
        }, 100);
      }
    }

    fetchData();
  }, [id]);
  return (
    <>
      <Sidebar />
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          {loding ? (
            <AttendeesTable finaldata={data} />
          ) : (
            <div
              className="flex justify-center items-center"
              style={{ height: "60vh" }}
            >
              <ScaleLoader color="#825ee4" size={60} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
