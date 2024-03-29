/*eslint-disable*/
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// component
import logo from "../../assets/logos/logo_light.png";

function useComponentVisible(initialIsVisible) {
  const [navbarOpen, setNavbarOpen] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setNavbarOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, navbarOpen, setNavbarOpen };
}

export default function Navbar(props) {
  const { ref, navbarOpen, setNavbarOpen } = useComponentVisible(false);
  // const [navbarOpen, setNavbarOpen] = React.useState(false);

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
              className="cursor-pointer z-51 text-xl leading-none px-3 py-1 border text-alpha border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
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
            ref={ref}
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {/* for mobile you have change text-black in all the navbar buttons/links */}

              <li className="flex items-center">
                <Link
                  to="/search"
                  className="hover:text-beta text-gray-700 ml-2 lg:ml-0 lg:text-white px-3 py-4 lg:py-2  flex items-center text-xs uppercase font-bold"
                >
                  <i className=" far fa-calendar-alt text-lg leading-lg mr-2" />{" "}
                  Events
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/clubsearch"
                  className="hover:text-beta text-gray-700 ml-2 lg:ml-0 lg:text-white px-3 py-4 lg:py-2  flex items-center text-xs uppercase font-bold"
                >
                  <i className="  fas fa-users rounded-full text-lg leading-lg mr-2" />{" "}
                  Clubs
                </Link>
              </li>

              <li
                className="flex items-center"
                onClick={() => setNavbarOpen(false)}
              >
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
              <li
                className="flex items-center"
                onClick={() => setNavbarOpen(false)}
              >
                <Link to="/auth/register">
                  <motion.button
                    className="bg-lightalpha hover:bg-alpha text-white  ml-2 lg:ml-0  active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fas fa-user-plus"></i> Sign Up
                  </motion.button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
