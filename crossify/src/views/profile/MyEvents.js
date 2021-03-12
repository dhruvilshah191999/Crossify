import React, { useState,useEffect } from "react";
import ProfileEventClub from "components/Cards/ProfileEventCard";
import axios from "axios";

export default function MyClubs() {
  const token = localStorage.getItem("jwt");
  const [tabIndex, toggleTabIndex] = useState(1);
  const [likedevents, setLikedevents] = useState([]);
  const [backevents, setbackevents] = useState([]);

  const [upcoming, setupcoming] = useState([]);

  useEffect(() => {
    async function getData() {
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
        "/api/profile/get-upcoming-event",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setupcoming(finaldata.data.data);
      }
    }

    async function getlikedata() {
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
        "/api/profile/get-like-event",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setLikedevents(finaldata.data.data);
      }
    }

    async function getpastdata() {
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
        "/api/profile/get-past-event",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setbackevents(finaldata.data.data);
      }
    }

    getData();
    getlikedata();
    getpastdata();

  },[])


  return (
    <>
      <div className="relative flex justify-center  text-sm -mt-20">
        <div>
          <button
            className={
              tabIndex === 0
                ? "bg-lightalpha rounded-full py-2 px-4 text-white mr-2 outline-none"
                : "rounded-full py-2 px-4 text-white mr-2 outline-none"
            }
            onClick={() => toggleTabIndex(0)}
          >
            <i class="fas fa-history hover:text-white"></i>&nbsp; Past Events
          </button>
          <button
            className={
              tabIndex === 1
                ? "bg-lightalpha rounded-full py-2 px-4 text-white mr-2 outline-none "
                : "rounded-full py-2 px-4 text-white mr-2 outline-none hover:text-offwhite"
            }
            onClick={() => toggleTabIndex(1)}
          >
            {" "}
            <i class="fas fa-heart hover:text-offwhite "></i>&nbsp; Liked
          </button>

          <button
            className={
              tabIndex === 2
                ? "bg-lightalpha rounded-full py-2 px-4 text-white mr-2 outline-none "
                : "rounded-full py-2 px-4 text-white mr-2 outline-none hover:text-offwhite"
            }
            onClick={() => toggleTabIndex(2)}
          >
            {" "}
            <i class="fas fa-glass-cheers hover:text-offwhite"></i>&nbsp;
            Upcoming
          </button>
        </div>
      </div>
      <div>
        <div class="ml-4 mt-10 bg-gray-200 flex flex-col flex-wrap lg:flex-row">
          {tabIndex === 2
            ? upcoming.map((el) => (
                <ProfileEventClub data={el} key={el._id}></ProfileEventClub>
              ))
            : tabIndex === 1
            ? likedevents.map((el) => (
                <ProfileEventClub data={el} key={el._id}></ProfileEventClub>
              ))
            : backevents.map((el) => (
                <ProfileEventClub data={el} key={el._id}></ProfileEventClub>
              ))}
        </div>
      </div>
    </>
  );
}
