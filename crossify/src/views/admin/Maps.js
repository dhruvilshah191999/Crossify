import React,{useEffect,useState} from "react";
import Sidebar from "components/Sidebar/ManageClubSidebar.js";
import { useParams } from "react-router";
import axios from "axios";
import MapContainer from "components/Maps/MapCode";
export default function Maps() {
  var { id } = useParams();
  const [loading, setloading] = useState(false);
  const [latitude, setlatitude] = useState(23.106517);
  const [longitude, setlongitude] = useState(72.59482);

  useEffect(() => {
    async function getData() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        club_id: id,
      };
      const finaldata = await axios.post("/api/admin/getClub", object, config);
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setlatitude(finaldata.data.data.latitude);
        setlongitude(finaldata.data.data.longitude);
        setTimeout(() => {
          setloading(true);
        }, 20);
      }
    }
    getData();
  }, [])

  const handleCallback = (childData) => {
    setlatitude(childData.lat);
    setlongitude(childData.lng);
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
             {loading?<MapContainer lat={latitude} long={ longitude} parentCallback={handleCallback}/>:""}
          </div>
        </div>
      </div>
    </>
  );
}
