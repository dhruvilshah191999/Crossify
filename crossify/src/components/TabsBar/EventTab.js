import { withMobileDialog } from "@material-ui/core";
import React, { useState } from "react";
import Photo from "../../assets/img/team-4-470x470.png";
import ProfileEventClub from "../../components/Cards/ProfileEventCard";

//khatar banayu bhai harshil
export default function EventTab() {
  const eventPerPage = 3;
  const [pastIndex, setpastIndex] = useState(1);
  const [upcomingIndex, setUpcomingIndex] = useState(1);
  const [tabIndex, toggleTabIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // todo GOLU fire a query and put pastevents and upcoming events in below two state (RAW ones)

  const [rawPastEvents, setpastEvents] = useState([
    {
      club_name: "Think Less Act More",
      place: "Punjab",
      tags: ["Magic", "Entertainment"],
    },
    {
      club_name: "Golfanatics",
      place: "Japan",
      tags: ["Sports", "Competition"],
    },
    {
      club_name: "Gamers Louge",
      place: "Rajkot",
      tags: ["Gaming", "Streaming"],
    },
    {
      club_name: "Gamers Louge",
      place: "Rajkot",
      tags: ["Gaming", "Streaming"],
    },
  ]);
  const [rawUpcomingEvents, setupcomingEvents] = useState([
    {
      club_name: "Act Less Think More",
      place: "Kerala",
      tags: ["Stoicism", "Realist"],
    },
    {
      club_name: "Table Truckers",
      place: "California",
      tags: ["Friendly"],
    },
    {
      club_name: "Gamers Louge",
      place: "Rajkot",
      tags: ["Gaming", "Streaming"],
    },
    {
      club_name: "Gamers Louge",
      place: "Rajkot",
      tags: ["Gaming", "Streaming"],
    },
  ]);
  const handleClick = (event) => {
    setpastIndex(Number(event.target.id));
  };
  const handleClick2 = (event) => {
    setUpcomingIndex(Number(event.target.id));
  };

  const searchHandler = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Logic for displayingpastEvents
  const isPresent = (val) => {
    if (val.toLowerCase().indexOf(searchQuery) !== -1) {
      return true;
    }
    return false;
  };
  const pastEvents = rawPastEvents.filter((el) => {
    let search1 = el.club_name.toLowerCase();
    let search2 = el.place.toLowerCase();
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
    let search1 = el.club_name.toLowerCase();
    let search2 = el.place.toLowerCase();
    let search3 = el.tags;
    if (
      search1.indexOf(searchQuery) !== -1 ||
      search2.indexOf(searchQuery) !== -1 ||
      search3.some(isPresent)
    ) {
      return true;
    }
    search3.forEach((el) => {
      console.log(el);
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
        club_name={el.club_name}
        place={el.place}
        tags={el.tags}
      ></ProfileEventClub>
    );
  });
  const renderpastEvents = currentpastEvents.map((el, index) => {
    return (
      <ProfileEventClub
        club_name={el.club_name}
        place={el.place}
        tags={el.tags}
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
    if (number == pastIndex) {
      classNames =
        "first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha  bg-white  m-2";
    }
    return (
      <li key={number} id={number} onClick={handleClick} className={classNames}>
        {number}
      </li>
    );
  });

  if (pageNumbers.length == 0) {
    renderPageNumbers = (
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

  const pageNumbers2 = [];
  for (let i = 1; i <= Math.ceil(upcomingEvents.length / eventPerPage); i++) {
    pageNumbers2.push(i);
  }
  var renderPageNumbers2 = pageNumbers2.map((number) => {
    var classNames =
      "first:ml-0 text-xs cursor-pointer font-semibold text-alpha bg-white flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2";
    if (number == upcomingIndex) {
      classNames =
        "first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha  bg-white  m-2";
    }
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick2}
        className={classNames}
      >
        {number}
      </li>
    );
  });

  if (pageNumbers2.length == 0) {
    renderPageNumbers2 = (
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
  return (
    <>
      <div className="flex   text-sm">
        <div className="ml-8 mt-2">
          <button
            className={
              tabIndex === 0
                ? "bg-beta rounded-full py-2 px-4 text-white mr-2 outline-none "
                : "rounded-full py-2 px-4  mr-2 outline-none hover:text-lightbeta"
            }
            onClick={() => toggleTabIndex(0)}
          >
            <i class="fas fa-history hover:"></i>&nbsp; Past Events
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
            <i class="fas fa-glass-cheers hover:text-lightbeta"></i>&nbsp;
            Upcoming
          </button>
        </div>{" "}
        <div class="bg-white w-1/4 shadow  ml-auto mr-8 flex border border-beta rounded-lg">
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
        <div class="ml-4 mt-10 flex flex-col flex-wrap lg:flex-row">
          {tabIndex === 0 ? renderpastEvents : renderupcomingEvents}
        </div>
      </div>
      {/* search bar */}

      {/* pagination. maximum 6 items should be on 1 page. */}
      <div className="py-2 justify-center flex">
        <div className="block">
          <ul className="flex pl-0 mt-4 rounded list-none flex-wrap">
            {tabIndex == 0 ? renderPageNumbers : renderPageNumbers2}
          </ul>
        </div>
      </div>
    </>
  );
}

// title should be max 45 words include whitespace
EventTab.defaultProps = {
  bgImage: Photo,
  eventTitle: "Introduction To React.js",
  eventTime: "Friday | August 14, 2020 | 6:30 PM",
  eventParticipant: "100",
};
