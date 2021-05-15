import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import logo from "assets/logos/logo_final.png";

export default function Sidebar() {
  const { id } = useParams();
  let history = useHistory();
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const token = localStorage.getItem("jwt");
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
        event_id: id,
      };
      const finaldata = await axios.post(
        "/api/profile/check-event",
        object,
        config
      );
      if (finaldata.data.is_error) {
        history.push("/");
      }
    }
    fetchData();
  }, [history, id, token]);
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black  md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 pt-1 pb-0 px-0"
            to="/"
          >
            <div className="flex flex-row items-center ">
              <div>
                <img className="w-8 ml-4 inline-block pt-2 " src={logo} />
              </div>
              <div>
                <span className="font-semibold text-xl tracking-tight text-gray-600 px-2 ml-2">
                  CROSSIFY
                </span>
              </div>
            </div>
          </Link>

          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12 text-2xl">
                  <Link
                    className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    <div className="flex flex-row ">
                      <img
                        className="w-10 inline-block pt-4"
                        src={logo}
                        alt="logo"
                      />
                      <span className="font-semibold text-2xl tracking-tight px-2">
                        CROSSIFY
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black  md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="mb-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Management
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/manage/event/general") !==
                    -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to={"/manage/event/general/" + id}
                >
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/manage/event/general") !==
                      -1
                        ? "opacity-7"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  General
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/manage/event/details") !==
                    -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to={"/manage/event/details/" + id}
                >
                  <i
                    className={
                      "fas fa-info-circle mr-2 text-sm " +
                      (window.location.href.indexOf("/manage/event/details") !==
                      -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  details
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/manage/event/attendees") !==
                    -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to={"/manage/event/attendees/" + id}
                >
                  <i
                    className={
                      "fas fa-users mr-2 text-sm " +
                      (window.location.href.indexOf(
                        "/manage/event/attendees"
                      ) !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Registeration
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/manage/event/preview") !==
                    -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to={"/manage/event/preview/" + id}
                >
                  <i
                    className={
                      "fas fa-desktop mr-2 text-sm " +
                      (window.location.href.indexOf("/manage/event/preview") !==
                      -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Preview
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/manage/event/qanda") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to={"/manage/event/qanda/" + id}
                >
                  <i
                    className={
                      "fas fa-comments mr-2 text-sm " +
                      (window.location.href.indexOf("/manage/event/qanda") !==
                      -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  QnA
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/manage/event/reports") !==
                    -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to={"/manage/event/reports/" + id}
                >
                  <i
                    className={
                      "fas fa-flag mr-2 text-sm " +
                      (window.location.href.indexOf("/manage/event/reports") !==
                      -1
                        ? "opacity-7"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Reports
                </Link>
              </li>
            </ul>
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}

            {/* Divider */}

            {/* Divider */}
          </div>
        </div>
      </nav>
    </>
  );
}
