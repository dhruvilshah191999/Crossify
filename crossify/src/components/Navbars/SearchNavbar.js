import React from "react";
import { render } from "react-dom";
import logo from "../../assets/logos/logo_final.png";

const SearchNavbar = (props) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between p-2 navbar-expand-lg bg-white shadow">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="mt-1 ml-3 mr-4 sm:mb-0 flex flex-row">
          <img
            className="brand-name"
            src={logo}
            style={{ width: "30px", height: "35px" }}
          />
          <span className="font-semibold text-xl tracking-tight px-2">
            CROSSIFY
          </span>
        </div>

        <div
          className={
            "lg:flex flex-grow flex-row items-center bg-white lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block" : " hidden")
          }
          id="example-navbar-warning"
        >
          <div className="flex-auto">
            <div className="ml-auto">
              <form>
                <div className="bg-white p-2 align-center ml-8">
                  <input
                    style={{
                      width: "50%",
                      outline: "none",
                      borderRight: "2px solid #C8C8C8",
                    }}
                    className="px-3 py-2 text-lg shadow-lg"
                    type="text"
                    placeholder="Find your club"
                  />
                  <input
                    style={{ width: "30%", outline: "none" }}
                    className="px-3 py-2  text-lg shadow-lg"
                    type="text"
                    placeholder="Select Location"
                  />

                  <button className="bg-red-400 shadow-lg text-lg hover:bg-red-300 rounded text-white p-2 pl-4 pr-4">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center">
              <button
                className="bg-gray-700 text-white active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
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
  );
};

export default SearchNavbar;
