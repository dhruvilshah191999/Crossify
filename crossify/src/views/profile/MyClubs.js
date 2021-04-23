import React, { useState, useEffect, useContext } from "react";
import ProfileClubCard from "components/Cards/ProfileClubCard";
import axios from "axios";
import { motion } from "framer-motion";
import { UserContext } from "context/usercontext";
import EmptyContainer from "components/sections/EmptyContainer";

const getSegment = (totalEvents, curIndex, eventPerPage) => {
  const end = curIndex * eventPerPage;
  const start = end - eventPerPage;
  return totalEvents.slice(start, end);
};
export default function MyClubs() {
  const token = localStorage.getItem("jwt");
  const { users } = useContext(UserContext);
  const [tabIndex, toggleTabIndex] = useState(1);
  const [likedClubs, setLikedClubs] = useState([]);
  const [manageClubs, setManageClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [likedIndex, setLikedIndex] = useState(1);
  const [manageIndex, setManageIndex] = useState(1);
  const [joinedIndex, setJoinedIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const eventPerPage = 6;
  const handleClickLiked = (event) => {
    setLikedIndex(Number(event.target.id));
  };
  const handleClickJoined = (event) => {
    setJoinedIndex(Number(event.target.id));
  };

  const handleClickManage = (event) => {
    setManageIndex(Number(event.target.id));
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
  const filteredManageClubs = manageClubs.filter((el) => {
    let search1 = el.club_name.toLowerCase();
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
  const filteredJoinedClubs = joinedClubs.filter((el) => {
    let search1 = el.club_name.toLowerCase();
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
  const filteredLikedClubs = likedClubs.filter((el) => {
    let search1 = el.club_name.toLowerCase();
    let search2 = el.location.toLowerCase();
    let search3 = el.tags;
    return (
      search1.indexOf(searchQuery) !== -1 ||
      search2.indexOf(searchQuery) !== -1 ||
      search3.some(isPresent)
    );
  });
  const currentfilteredManageClubs = getSegment(
    filteredManageClubs,
    manageIndex,
    eventPerPage
  );
  const currentjoinedClubs = getSegment(
    filteredJoinedClubs,
    joinedIndex,
    eventPerPage
  );
  const currentlikedClubs = getSegment(
    filteredLikedClubs,
    likedIndex,
    eventPerPage
  );

  const renderjoinedClubs = currentjoinedClubs.map((el, index) => {
    return (
      <ProfileClubCard
        data={el}
        key={el._id}
        fav_club={users.fav_club}
      ></ProfileClubCard>
    );
  });
  const renderfilteredManageClubs = currentfilteredManageClubs.map(
    (el, index) => {
      return (
        <ProfileClubCard
          data={el}
          key={el._id}
          fav_club={users.fav_club}
        ></ProfileClubCard>
      );
    }
  );
  const renderlikedClubs = currentlikedClubs.map((el, index) => {
    return (
      <ProfileClubCard
        data={el}
        key={el._id}
        fav_club={users.fav_club}
      ></ProfileClubCard>
    );
  });

  // Logic for displaying page numbers
  const pagesManage = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredManageClubs.length / eventPerPage);
    i++
  ) {
    pagesManage.push(i);
  }

  var renderpagesManage = pagesManage.map((number) => {
    var classNames =
      "first:ml-0 text-xs cursor-pointer font-semibold text-alpha bg-white flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2";
    if (number === manageIndex) {
      classNames =
        "first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha  bg-white  m-2";
    }
    return (
      <motion.li
        key={number}
        id={number}
        onClick={handleClickManage}
        className={classNames}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        {number}
      </motion.li>
    );
  });
  const pagesJoined = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredJoinedClubs.length / eventPerPage);
    i++
  ) {
    pagesJoined.push(i);
  }

  var renderpagesJoined = pagesJoined.map((number) => {
    var classNames =
      "first:ml-0 text-xs cursor-pointer font-semibold text-alpha bg-white flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2";
    if (number === joinedIndex) {
      classNames =
        "first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha  bg-white  m-2";
    }
    return (
      <motion.li
        key={number}
        id={number}
        onClick={handleClickJoined}
        className={classNames}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        {number}
      </motion.li>
    );
  });
  const pagesLiked = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredLikedClubs.length / eventPerPage);
    i++
  ) {
    pagesLiked.push(i);
  }

  var renderpagesLiked = pagesLiked.map((number) => {
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

  if (pagesManage.length === 0) {
    renderpagesManage =
      manageClubs.length !== 0 ? (
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
  if (pagesLiked.length === 0) {
    renderpagesLiked =
      likedClubs.length !== 0 ? (
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
  if (pagesJoined.length === 0) {
    renderpagesJoined =
      joinedClubs.length !== 0 ? (
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
        token: token,
      };
      const finaldata = await axios.post(
        "/api/profile/get-join-club",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        console.log(finaldata);
        setJoinedClubs(finaldata.data.data);
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
        "/api/profile/get-like-club",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setLikedClubs(finaldata.data.data);
      }
    }

    async function getadmindata() {
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
        "/api/profile/get-manage-club",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setManageClubs(finaldata.data.data);
      }
    }

    getData();
    getlikedata();
    getadmindata();
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
            <i className="fas fa-heart hover:text-offwhite hover:text-offwhite"></i>
            &nbsp; Liked
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
            <i className="fas fa-sliders-h hover:text-offwhite"></i>&nbsp;
            Managing
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
            <i className="fab fa-fort-awesome hover:text-offwhite"></i>&nbsp;
            Joined
          </button>
        </div>
        <div className="bg-white shadow  ml-auto mr-8 flex border border-beta rounded-lg">
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
        <div className="ml-4 mt-10 bg-gray-200 flex flex-wrap flex-row">
          {tabIndex === 2
            ? renderjoinedClubs
            : tabIndex === 0
            ? renderlikedClubs
            : renderfilteredManageClubs}
        </div>
      </div>
      <div className="py-2 justify-center flex">
        <div className="block">
          <ul className="flex pl-0 mt-4 rounded list-none flex-wrap">
            {tabIndex === 1
              ? renderpagesManage
              : tabIndex === 0
              ? renderpagesLiked
              : renderpagesJoined}
          </ul>
        </div>
      </div>
    </>
  );
}
