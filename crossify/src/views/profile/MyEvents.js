import React, { useState, useEffect } from "react";
import ProfileEventClub from "components/Cards/ProfileEventCard";
import axios from "axios";
import { motion } from "framer-motion";

const getSegment = (totalEvents, curIndex, eventPerPage) => {
  const end = curIndex * eventPerPage;
  const start = end - eventPerPage;
  return totalEvents.slice(start, end);
};
export default function MyClubs() {
  const token = localStorage.getItem("jwt");
  const [tabIndex, toggleTabIndex] = useState(1);
  const [likedEvents, setlikedEvents] = useState([]);
  const [backEvents, setBackEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [likedIndex, setLikedIndex] = useState(1);
  const [backIndex, setBackIndex] = useState(1);
  const [upcomingIndex, setUpcomingIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const eventPerPage = 6;
  const handleClickLiked = (event) => {
    setLikedIndex(Number(event.target.id));
  };
  const handleClickUpcoming = (event) => {
    setUpcomingIndex(Number(event.target.id));
  };

  const handleClickBack = (event) => {
    setBackIndex(Number(event.target.id));
  };
  const searchHandler = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  const isPresent = (val) => {
    if (val.toLowerCase().indexOf(searchQuery) !== -1) {
      return true;
    }
    return false;
  };
  const pastEvents = backEvents.filter((el) => {
    let search1 = el.event_name.toLowerCase();
    let search2 = el.location.toLowerCase();
    let search3 = el.tags;
    if (
      search1.indexOf(searchQuery) !== -1 ||
      search2.indexOf(searchQuery) !== -1 ||
      search3.some(isPresent)
    ) {
      return true;
    }

    return false;
  });
  const newEvents = upcomingEvents.filter((el) => {
    let search1 = el.event_name.toLowerCase();
    let search2 = el.location.toLowerCase();
    let search3 = el.tags;
    if (
      search1.indexOf(searchQuery) !== -1 ||
      search2.indexOf(searchQuery) !== -1 ||
      search3.some(isPresent)
    ) {
      return true;
    }

    return false;
  });
  const likeEvents = likedEvents.filter((el) => {
    let search1 = el.event_name.toLowerCase();
    let search2 = el.location.toLowerCase();
    let search3 = el.tags;
    return (
      search1.indexOf(searchQuery) !== -1 ||
      search2.indexOf(searchQuery) !== -1 ||
      search3.some(isPresent)
    );
  });
  console.log(likeEvents);
  const currentPastEvents = getSegment(pastEvents, backIndex, eventPerPage);
  const currentUpcomingEvents = getSegment(
    newEvents,
    upcomingIndex,
    eventPerPage
  );
  const currentLikedEvents = getSegment(likeEvents, likedIndex, eventPerPage);

  const renderUpcomingEvents = currentUpcomingEvents.map((el, index) => {
    return <ProfileEventClub data={el} key={el._id}></ProfileEventClub>;
  });
  const renderPastEvents = currentPastEvents.map((el, index) => {
    return <ProfileEventClub data={el} key={el._id}></ProfileEventClub>;
  });
  const renderLikedEvents = currentLikedEvents.map((el, index) => {
    return <ProfileEventClub data={el} key={el._id}></ProfileEventClub>;
  });

  // Logic for displaying page numbers
  const pageNumbersOld = [];
  for (let i = 1; i <= Math.ceil(pastEvents.length / eventPerPage); i++) {
    pageNumbersOld.push(i);
  }

  var renderPageNumbersOld = pageNumbersOld.map((number) => {
    var classNames =
      "first:ml-0 text-xs cursor-pointer font-semibold text-alpha bg-white flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2";
    if (number === backIndex) {
      classNames =
        "first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha  bg-white  m-2";
    }
    return (
      <motion.li
        key={number}
        id={number}
        onClick={handleClickBack}
        className={classNames}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        {number}
      </motion.li>
    );
  });
  const pageNumbersNew = [];
  for (let i = 1; i <= Math.ceil(newEvents.length / eventPerPage); i++) {
    pageNumbersNew.push(i);
  }

  var renderPageNumbersNew = pageNumbersNew.map((number) => {
    var classNames =
      "first:ml-0 text-xs cursor-pointer font-semibold text-alpha bg-white flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2";
    if (number === upcomingIndex) {
      classNames =
        "first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha  bg-white  m-2";
    }
    return (
      <motion.li
        key={number}
        id={number}
        onClick={handleClickUpcoming}
        className={classNames}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        {number}
      </motion.li>
    );
  });
  const pageNumbersLiked = [];
  for (let i = 1; i <= Math.ceil(likeEvents.length / eventPerPage); i++) {
    pageNumbersLiked.push(i);
  }

  var renderPageNumbersLiked = pageNumbersLiked.map((number) => {
    var classNames =
      "first:ml-0 text-xs cursor-pointer font-semibold text-alpha bg-white flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2";
    if (number === likedIndex) {
      classNames =
        "first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha  bg-white  m-2";
    }
    return (
      <motion.li
        key={number}
        id={number}
        onClick={handleClickLiked}
        className={classNames}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        {number}
      </motion.li>
    );
  });

  if (pageNumbersOld.length === 0) {
    renderPageNumbersOld = (
      <div
        className="flex justify-center content-center"
        style={{ height: 400 }}
      >
        <div className="flex flex-row mt-32">
          {" "}
          <div>
            {" "}
            <i class="far fa-calendar-times text-5xl mr-4 mt-2"></i>
          </div>
          <div>
            <h1 className="text-2xl text-gray-700 ">
              No result from "{searchQuery}
              ".
            </h1>
            <h2 className="text-gray-600 mr-4">
              Try to search other relevant terms.
            </h2>
          </div>
        </div>
      </div>
    );
  }
  if (pageNumbersLiked.length === 0) {
    renderPageNumbersLiked = (
      <div
        className="flex justify-center content-center"
        style={{ height: 400 }}
      >
        <div className="flex flex-row mt-32">
          {" "}
          <div>
            {" "}
            <i class="far fa-calendar-times text-5xl mr-4 mt-2"></i>
          </div>
          <div>
            <h1 className="text-2xl text-gray-700 ">
              No result from "{searchQuery}
              ".
            </h1>
            <h2 className="text-gray-600 mr-4">
              Try to search other relevant terms.
            </h2>
          </div>
        </div>
      </div>
    );
  }
  if (pageNumbersNew.length === 0) {
    renderPageNumbersNew = (
      <div
        className="flex justify-center content-center"
        style={{ height: 400 }}
      >
        <div className="flex flex-row mt-32">
          {" "}
          <div>
            {" "}
            <i class="far fa-calendar-times text-5xl mr-4 mt-2"></i>
          </div>
          <div>
            <h1 className="text-2xl text-gray-700 ">
              No result from "{searchQuery}
              ".
            </h1>
            <h2 className="text-gray-600 mr-4">
              Try to search other relevant terms.
            </h2>
          </div>
        </div>
      </div>
    );
  }
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
        setUpcomingEvents(finaldata.data.data);
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
        console.log(finaldata.data.data);
        setlikedEvents(finaldata.data.data);
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
        setBackEvents(finaldata.data.data);
      }
    }

    getData();
    getlikedata();
    getpastdata();
  }, []);

  return (
    <>
      <div className="relative flex justify-center  text-sm -mt-20">
        <div className="ml-6">
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
            <i class="fas fa-heart hover:text-offwhite hover:text-offwhite"></i>{" "}
            Liked
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
        <div class="bg-white shadow  ml-auto mr-8 flex border border-beta rounded-lg">
          <span class="w-auto flex justify-end items-center text-gray-500 p-2">
            <i className="fas fa-search text-beta"></i>
          </span>
          <input
            class="w-full rounded-lg py-2"
            type="text"
            placeholder="Search Event..."
            onChange={searchHandler}
          />
        </div>
      </div>
      <div>
        <div class="ml-4 mt-10 bg-gray-200 flex flex-wrap flex-row">
          {tabIndex === 2
            ? renderUpcomingEvents
            : tabIndex === 1
            ? renderLikedEvents
            : renderPastEvents}
        </div>
      </div>
      <div className="py-2 justify-center flex">
        <div className="block">
          <ul className="flex pl-0 mt-4 rounded list-none flex-wrap">
            {tabIndex === 0
              ? renderPageNumbersOld
              : tabIndex === 1
              ? renderPageNumbersLiked
              : renderPageNumbersNew}
          </ul>
        </div>
      </div>
    </>
  );
}
