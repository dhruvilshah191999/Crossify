import React, { useState, useEffect } from "react";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import ManageEventsTable from "components/Tables/ManageEventsTable";
export default function Tables() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    async function fetchData() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        token: token,
      };
      const finaldata = await axios.post(
        "/api/profile/get-all-event",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setdata(finaldata.data.data);
        setTimeout(() => {
          setloading(true);
        }, 500);
      }
    }

    fetchData();
  }, []);
  if (loading) {
    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <ManageEventsTable finaldata={data} />
          </div>
          <div className="w-full mb-12 px-4"></div>
        </div>
      </>
    );
  } else {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "65vh" }}
      >
        <ScaleLoader color="#825ee4" size={60} />
      </div>
    );
  }
}
