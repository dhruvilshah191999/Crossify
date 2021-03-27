/*eslint-disable*/
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { motion } from "framer-motion";
// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";
import logo from "../../assets/logos/logo_light.png";
import NotificationDropdown from "components/Dropdowns/NotificationDropdown";
import { UserContext } from "context/usercontext";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [notification, setnotification] = React.useState(false);
  const [userdrop, setuserdrop] = React.useState(false);
  const { isLogin } = useContext(UserContext);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-6 py-3 navbar-expand-lg bg-transparent">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between bg-transparent">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 ml-3 py-2 whitespace-no-wrap uppercase"
              to="/"
            >
              <div className="flex ">
                <div>
                  <img
                    style={{ height: "25px", width: "30px" }}
                    className="inline-block"
                    src={logo}
                  />
                </div>
                <div className="ml-3">Crossify</div>
              </div>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
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
                <Link
                  to={isLogin ? "/createclub" : "/auth/login"}
                  className="hover:text-lightwhite text-gray-700 ml-2 lg:ml-0 lg:text-white px-3 py-4 lg:py-2  flex items-center text-xs uppercase font-bold"
                >
                  <i className="  fas fa-chalkboard-teacher text-lg leading-lg mr-2" />{" "}
                  Start a Club
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/search"
                  className="hover:text-lightwhite text-gray-700 ml-2 lg:ml-0 lg:text-white px-3 py-4 lg:py-2  flex items-center text-xs uppercase font-bold"
                >
                  <i className=" far fa-calendar-alt text-lg leading-lg mr-2" />{" "}
                  Events
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/clubsearch"
                  className="hover:text-lightwhite text-gray-700 ml-2 lg:ml-0 lg:text-white px-3 py-4 lg:py-2  flex items-center text-xs uppercase font-bold"
                >
                  <i className="  fas fa-users rounded-full text-lg leading-lg mr-2" />{" "}
                  Clubs
                </Link>
              </li>

              <li className={isLogin ? "hidden " : " " + "flex items-center"}>
                <Link to="/auth/login">
                  <motion.button
                    className="bg-white hover:bg-offwhite text-gray-800 ml-2 lg:ml-0  active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-2 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fas fa-sign-in-alt"></i> Log In
                  </motion.button>
                </Link>
              </li>
              <li className={isLogin ? "hidden " : " " + "flex items-center"}>
                <Link to="/auth/register">
                  <motion.button
                    className="bg-alpha hover:bg-alpha text-white  ml-2 lg:ml-0  active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fas fa-user-plus"></i> Sign Up
                  </motion.button>
                </Link>
              </li>

              <li className={isLogin ? " " : "hidden " + "flex items-center "}>
                <div className=" ml-2 lg:ml-0 ">
                  {isLogin ? <NotificationDropdown /> : ""}
                </div>
              </li>

              <li
                className={
                  isLogin ? " " : "hidden " + "flex items-center ml-2 lg:ml-0 "
                }
              >
                <div className=" ml-3 mb-2 lg:ml-0 lg:mb-0  ">
                  <UserDropdown />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
