import React, { useState, useEffect } from "react";
import axios from "axios";
import ManageEventsTable from "components/Tables/ManageEventsTable";
export default function Tables() {
  const token = localStorage.getItem("jwt");
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
          setloding(true);
        }, 500);
      }
    }

    fetchData();
  }, []);
  if (loding) {
    return (
      console.log(data),
      (
        <>
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
              <ManageEventsTable finaldata={data} />
            </div>
            <div className="w-full mb-12 px-4"></div>
          </div>
        </>
      )
    );
  } else {
    return <></>;
  }
}
