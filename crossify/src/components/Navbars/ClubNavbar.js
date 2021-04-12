/*eslint-disable*/
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";
import logo from "../../assets/logos/logo_final.png";
import NotificationDropdown from "components/Dropdowns/NotificationDropdown";
import { UserContext } from "context/usercontext";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [notification, setnotification] = React.useState(false);
  const [userdrop, setuserdrop] = React.useState(false);
  const { isLogin } = useContext(UserContext);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-6 py-3 navbar-expand-lg  border">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between ">
          <div className="w-full  relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 ml-3  whitespace-no-wrap uppercase"
              to="/"
            >
              <div className="flex ">
                <div style={{ paddingTop: 2 }}>
                  <img
                    style={{ height: "25px", width: "30px" }}
                    className="inline-block"
                    src={logo}
                  />
                </div>
                <div className="ml-3 text-gray-600 text-lg tracking-wide font-semibold">
                  Crossify
                </div>
              </div>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded  block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-gray-600 fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {/* for mobile you have change text-black in all the navbar buttons/links */}
              <li className="flex items-center">
                <Link
                  to="/createclub"
                  className="hover:text-lightbeta text-gray-700 md:text-white-400 px-3 py-4 lg:py-2 sm:text-white-400 flex items-center text-xs uppercase font-bold"
                  href="#"
                >
                  <i className=" fas fa-chalkboard-teacher text-lg leading-lg mr-2" />{" "}
                  Start a Club
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/search"
                  className="hover:text-lightbeta text-gray-700 md:text-white-400 px-3 py-4 lg:py-2 sm:text-white-400 flex items-center text-xs uppercase font-bold"
                  href="#"
                >
                  <i className=" far fa-calendar-alt text-lg leading-lg mr-2" />{" "}
                  Events
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/clubsearch"
                  className="hover:text-lightbeta text-gray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  <i className="  fas fa-users rounded-full text-lg leading-lg mr-2" />{" "}
                  Clubs
                </Link>
              </li>

              <li className={isLogin ? "hidden " : " " + "flex items-center"}>
                <Link to="/auth/login">
                  <button
                    className="bg-white hover:bg-offwhite text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i className="fas fa-sign-in-alt"></i> Log In
                  </button>
                </Link>
              </li>
              <li className={isLogin ? "hidden " : " " + "flex items-center"}>
                <Link to="/auth/register">
                  <button
                    className="bg-alpha hover:bg-alpha text-white active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i className="fas fa-user-plus"></i> Sign Up
                  </button>
                </Link>
              </li>

              <li className={isLogin ? " " : "hidden " + "flex items-center"}>
                {isLogin ? <NotificationDropdown /> : ""}
              </li>

              <li className={isLogin ? " " : "hidden " + "flex items-center"}>
                <UserDropdown />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
