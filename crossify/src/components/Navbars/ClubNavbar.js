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
          <img style={{ height: "25px", width: "30px" }} src={logo} />
          <div className="w-full  relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-gray-500 text-sm font-bold leading-relaxed inline-block mr-4 ml-3 py-2 whitespace-no-wrap uppercase"
              to="/"
            >
              Crossify
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded  block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
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
                <a
                  className="hover:text-gray-800 text-gray-500 md:text-white-400 px-3 py-4 lg:py-2 sm:text-white-400 flex items-center text-xs uppercase font-bold"
                  href="#"
                >
                  <i className="text-gray-500 far fa-calendar-alt text-lg leading-lg mr-2" />{" "}
                  Events
                </a>
              </li>
              <li className="flex items-center">
                <div className="hover:text-gray-800 text-gray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                  <i className="text-gray-500  fas fa-users rounded-full text-lg leading-lg mr-2" />{" "}
                  Clubs
                </div>
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
