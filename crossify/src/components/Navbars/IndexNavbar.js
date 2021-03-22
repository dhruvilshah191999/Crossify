/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// components
// this needs to have state when user is loged in
// Logged In things requires multiple components in the navbar
// import IndexDropdown from "components/Dropdowns/IndexDropdown.js"; This will be used once user is logged in
import logo from "../../assets/logos/logo_final.png";
export default function Navbar(props) {
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="mt-1 sm:mb-0 flex flex-row">
            {/* <img className="brand-name" src={logo} /> */}
            <span className="font-semibold text-xl tracking-tight px-2">
              CROSSIFY
            </span>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="#"
                >
                  <i className="text-gray-500 far fa-calendar-alt text-lg leading-lg mr-2" />{" "}
                  Events
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="#"
                >
                  <i className="text-gray-500 fas fa-users rounded-full text-lg leading-lg mr-2" />{" "}
                  Clubs
                </a>
              </li>

              <li className="flex items-center">
                <button
                  className="bg-gray-700 text-white active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-2  lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-sign-in-alt"></i> Log In
                </button>
              </li>
              <li className="flex items-center">
                <button
                  className="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  Sign Up <i className="fas fa-signature"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
