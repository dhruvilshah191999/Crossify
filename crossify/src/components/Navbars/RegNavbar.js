/*eslint-disable*/
import React from "react";

import logo from "../../assets/logos/FINAL_BG_LOGO.png";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-900">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <a href="/">
            <img
              className="brand-name"
              src={logo}
              style={{ height: "30px", width: "120px" }}
            />
          </a>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          ></div>
        </div>
      </nav>
    </>
  );
}