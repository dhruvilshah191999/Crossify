import React, { useState,useEffect } from "react";
import Sidebar from "components/Sidebar/ManageClubSidebar.js";
import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import axios from "axios";
import { useParams } from "react-router";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Settings() {
  var { id } = useParams();
  const [loading, setloading] = useState(false);
  const [clubData, setclubData] = useState({});
  const [count, setCount] = useState({});

  useEffect(() => {
    async function get_count() {
      const config = {
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
        "/api/admin/getCount",
        send_data,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setCount(finaldata.data.data);
      }
    }

    async function club_details() {
      const config = {
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
        "/api/admin/getClub",
        send_data,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setclubData(finaldata.data.data);
        setTimeout(() => {
          setloading(true);
        }, 100);
      }
    }
    get_count();
    club_details();
  }, [id]);
  return (
    <>
      <Sidebar />
      {loading ? (
        <div className="flex flex-wrap">
          <div className="w-full lg:w-7/10 px-4">
            <CardSettings data={clubData} />
          </div>
          <div className="w-full lg:w-3/10 px-4">
            <CardProfile clubData={clubData} count={count} />
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center items-center"
          style={{ height: "60vh" }}
        >
          <ScaleLoader color="#825ee4" size={60} />
        </div>
      )}
    </>
  );
}
