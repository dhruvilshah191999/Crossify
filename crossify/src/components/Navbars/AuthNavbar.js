/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";
import logo from "../../assets/logos/logo_light.png"

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <img className="brand-name" src={logo} />
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 ml-3 py-2 whitespace-no-wrap uppercase"
              to="/"
            >
               Crossify
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
                <a
                  className="hover:text-white text-white md:text-gray-400 px-3 py-4 lg:py-2 sm:text-gray-400 flex items-center text-xs uppercase font-bold"
                  href="#"
                >
                  <i className="text-white far fa-calendar-alt text-lg leading-lg mr-2" />{" "}
                  Events
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="#"
                >
                  <i className="text-white fas fa-users rounded-full text-lg leading-lg mr-2" />{" "}
                  Clubs
                </a>
              </li>
              <li className="flex items-center">
                <Link to="/auth/login">
                  <button
                    className="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i className="fas fa-sign-in-alt"></i> Log In
                  </button>
                </Link>
              </li>
              <li className="flex items-center">
                <Link to="/auth/register">
                  <button
                    className="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button">
                    <i className="fas fa-user-plus"></i> Sign Up
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
