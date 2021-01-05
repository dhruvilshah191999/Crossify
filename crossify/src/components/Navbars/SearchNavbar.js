import React from "react";
import logo from "../../assets/logos/logo_final.png";

const SearchNavbar = (props) => {
  return (
    <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between p-2 navbar-expand-lg bg-white shadow">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="mt-1 ml-3 mr-4 sm:mb-0 flex flex-row content-center">
          <img
            className="brand-name"
            src={logo}
            style={{ width: "30px", height: "35px" }}
          />
          <span className="font text-xl tracking-tight px-3 pt-1">
            CROSSIFY
          </span>
        </div>

        <div
          className="lg:flex flex-grow flex-row items-center bg-white lg:bg-transparent lg:shadow-none block"
          id="example-navbar-warning"
        >
          <div className="flex-auto ml-auto" style={{ marginLeft: "100px" }}>
            <form>
              <div className="bg-white p-2 align-center">
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
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </form>
          </div>
          <ul className="flex flex-row list-none lg:ml-auto">
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
