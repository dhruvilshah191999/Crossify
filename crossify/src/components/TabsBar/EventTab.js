import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProfileEventClub from "components/Cards/ProfileEventCard";
import EventCalendar from "components/Calendar/EventCalendar";
import { motion } from "framer-motion";
import { UserContext } from "context/usercontext";
import EmptyContainer from "components/sections/EmptyContainer";
import MapwithEvents from "components/Maps/EventsOfClubsMap";
export default function EventTab(props) {
  const eventPerPage = 3;
  const [pastIndex, setpastIndex] = useState(1);
  const { users, category } = useContext(UserContext);
  const [upcomingIndex, setUpcomingIndex] = useState(1);
  const [tabIndex, toggleTabIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rawPastEvents, setpastEvents] = useState([]);
  const [rawUpcomingEvents, setupcomingEvents] = useState([]);
  const [loading, setloading] = useState(false);
  const [viewMode, setViewMode] = useState(0);
  const handleClick = (event) => {
    setpastIndex(Number(event.target.id));
  };
  const handleClick2 = (event) => {
    setUpcomingIndex(Number(event.target.id));
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
  const pastEvents = rawPastEvents.filter((el) => {
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
  const upcomingEvents = rawUpcomingEvents.filter((el) => {
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
    search3.forEach((el) => {
      if (el.toLowerCase().indexOf(searchQuery) !== -1) {
        return true;
      }
    });
    return false;
  });
  const pastEnd = pastIndex * eventPerPage;
  const pastStart = pastEnd - eventPerPage;
  const currentpastEvents = pastEvents.slice(pastStart, pastEnd);
  const upcomingEnd = upcomingIndex * eventPerPage;
  const upcomingStart = upcomingEnd - eventPerPage;
  const currentupcomingEvents = upcomingEvents.slice(
    upcomingStart,
    upcomingEnd
  );

  const renderupcomingEvents = currentupcomingEvents.map((el, index) => {
    return (
      <ProfileEventClub
        data={el}
        key={el._id}
        fav_event={users.fav_event}
      ></ProfileEventClub>
    );
  });
  const renderpastEvents = currentpastEvents.map((el, index) => {
    return (
      <ProfileEventClub
        data={el}
        key={el._id}
        fav_event={users.fav_event}
      ></ProfileEventClub>
    );
  });
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pastEvents.length / eventPerPage); i++) {
    pageNumbers.push(i);
  }

  var renderPageNumbers = pageNumbers.map((number) => {
    var classNames =
      "first:ml-0 text-xs cursor-pointer font-semibold text-alpha bg-white flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2";
    if (number === pastIndex) {
      classNames =
        "first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha  bg-white  m-2";
    }
    return (
      <motion.li
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        key={number}
        id={number}
        onClick={handleClick}
        className={classNames}
      >
        {number}
      </motion.li>
    );
  });

  if (pageNumbers.length === 0) {
    renderPageNumbers =
      rawPastEvents.length !== 0 ? (
        <div
          className="flex justify-center content-center"
          style={{ height: 400 }}
        >
          <div className="flex flex-row mt-32">
            {" "}
            <div>
              {" "}
              <i className="far fa-calendar-times text-5xl mr-4 mt-2"></i>
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
      ) : (
        <EmptyContainer />
      );
  }

  const pageNumbers2 = [];
  for (let i = 1; i <= Math.ceil(upcomingEvents.length / eventPerPage); i++) {
    pageNumbers2.push(i);
  }
  var renderPageNumbers2 = pageNumbers2.map((number) => {
    var classNames =
      "first:ml-0 text-xs cursor-pointer font-semibold text-alpha bg-white flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2";
    if (number === upcomingIndex) {
      classNames =
        "first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha  bg-white  m-2";
    }
    return (
      <motion.li
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        key={number}
        id={number}
        onClick={handleClick2}
        className={classNames}
      >
        {number}
      </motion.li>
    );
  });

  if (pageNumbers2.length === 0) {
    renderPageNumbers2 =
      rawUpcomingEvents.length !== 0 ? (
        <div
          className="flex justify-center content-center"
          style={{ height: 400 }}
        >
          <div className="flex flex-row mt-32">
            {" "}
            <div>
              {" "}
              <i className="far fa-calendar-times text-5xl mr-4 mt-2"></i>
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
      ) : (
        <EmptyContainer />
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
        club_id: props.club_id,
      };
      const finaldata = await axios.post(
        "/api/admin/get-upcoming-event",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setupcomingEvents(finaldata.data.data);
        setloading(true);
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
        club_id: props.club_id,
      };
      const finaldata = await axios.post(
        "/api/admin/get-past-event",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setpastEvents(finaldata.data.data);
      }
    }

    getData();
    getpastdata();
  }, [props.club_id]);
  return (
    <>
      <div className="text-right mb-3 flex">
        <div className="bg-gray-200 rounded-lg border text-lg  mr-8 flex justify-center ml-auto">
          {" "}
          <div className={viewMode === 0 ? "bg-white rounded-lg" : ""}>
            <button
              className="p-1 text-gray-700 mx-3 py-1 "
              onClick={() => setViewMode(0)}
            >
              {" "}
              <i class="fas fa-columns"></i> Card
            </button>{" "}
          </div>
          <div className={viewMode === 1 ? "bg-white rounded-lg" : ""}>
            <button
              className="p-1 text-gray-700 mx-3 py-1"
              onClick={() => setViewMode(1)}
            >
              {" "}
              <i class="far fa-calendar-alt"></i> Calendar
            </button>{" "}
          </div>
          <div className={viewMode === 2 ? "bg-white rounded-lg" : ""}>
            <button
              className="p-1 mx-3 text-gray-700 py-1"
              onClick={() => setViewMode(2)}
            >
              {" "}
              <i class="fas fa-map-marked-alt"></i> Maps
            </button>
          </div>
        </div>
      </div>
      {viewMode === 0 && (
        <>
          <div className="flex mt-1  text-sm">
            <div className="ml-8 mt-2">
              <button
                className={
                  tabIndex === 0
                    ? "bg-beta rounded-full py-2 px-4 text-white mr-2 outline-none "
                    : "rounded-full py-2 px-4  mr-2 outline-none hover:text-lightbeta"
                }
                onClick={() => toggleTabIndex(0)}
              >
                <i className="fas fa-history hover:"></i>&nbsp; Past Events
              </button>

              <button
                className={
                  tabIndex === 1
                    ? "bg-beta rounded-full py-2 px-4 text-white mr-2 outline-none "
                    : "rounded-full py-2 px-4  mr-2 outline-none hover:text-lightbeta"
                }
                onClick={() => toggleTabIndex(1)}
              >
                {" "}
                <i className="fas fa-glass-cheers hover:text-lightbeta"></i>
                &nbsp; Upcoming
              </button>
            </div>{" "}
            <div className="bg-white w-1/4 shadow  ml-auto mr-8 flex border border-beta rounded-lg">
              <span className="w-auto flex justify-end items-center text-gray-500 p-2">
                <i className="fas fa-search text-beta"></i>
              </span>
              <input
                className="w-full rounded-lg py-2"
                type="text"
                placeholder="Search Event..."
                onChange={searchHandler}
              />
            </div>
          </div>
          <div>
            <div className="gap-1 mx-4 mt-10 flex flex-col flex-wrap lg:flex-row">
              {tabIndex === 0 ? renderpastEvents : renderupcomingEvents}
            </div>
          </div>
          {/* search bar */}

          {/* pagination. maximum 6 items should be on 1 page. */}
          <div className="py-2 justify-center flex">
            <div className="block">
              <ul className="flex pl-0 mt-4 rounded list-none flex-wrap">
                {tabIndex === 0 ? renderPageNumbers : renderPageNumbers2}
              </ul>
            </div>
          </div>
        </>
      )}
      {viewMode === 1 && (
        <div className="px-12 text-center">
          {loading && (
            <>
              {/* <span className="text-4xl font-semibold">
                {" "}
                Calendar View for Upcoming Events{" "}
              </span> */}
              <EventCalendar
                EventData={rawUpcomingEvents}
                categoryData={category}
                club_id={props.club_id}
                isAdmin={props.isAdmin}
              />
            </>
          )}
        </div>
      )}

      {viewMode === 2 && (
        <div className=" text-center">
          {/* <span className="text-4xl my-4 font-semibold">
            {" "}
            Map View for Upcoming Events{" "}
          </span> */}
          <MapwithEvents data={rawUpcomingEvents}></MapwithEvents>
        </div>
      )}
    </>
  );
}
