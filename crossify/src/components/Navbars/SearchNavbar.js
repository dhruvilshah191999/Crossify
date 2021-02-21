import React, { useContext, useState } from "react";
import logo from "../../assets/logos/logo_final.png";
import { Link } from "react-router-dom";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import NotificationDropdown from "components/Dropdowns/NotificationDropdown";
import { UserContext } from "context/usercontext";
const SearchNavbar = (props) => {
  const [changing, setchanging] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setlocation] = useState("");
  const { isLogin, search_dispatch } = useContext(UserContext);
  const onSubmit = async (e) => {
    e.preventDefault();
    var object = {
      search,
      location,
    };
    search_dispatch({ type: "Add-Search", add: object });
    setchanging(!changing);
    props.change(changing);
  };

  return (
    <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between p-2 navbar-expand-lg bg-white border">
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
            <div className="bg-white p-2 align-center">
              <input
                style={{
                  width: "50%",
                  outline: "none",
                  borderRight: "2px solid #C8C8C8",
                }}
                className="px-3 py-2 text-lg shadow-lg"
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Find your club,events"
              />
              <input
                style={{ width: "30%", outline: "none" }}
                className="px-3 py-2  text-lg shadow-lg"
                type="text"
                name="location"
                onChange={(e) => setlocation(e.target.value)}
                value={location}
                placeholder="Select Location"
              />

              <button
                className="bg-alpha shadow-lg text-lg hover:bg-alpha rounded text-white p-2 pl-4 pr-4"
                onClick={(e) => onSubmit(e)}
              >
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
          <ul className="flex flex-row list-none lg:ml-auto">
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

            <li className={isLogin ? " " : "hidden " + "flex items-center "}>
              <NotificationDropdown bgWhite={true} />
            </li>

            <li className={isLogin ? " " : "hidden " + "flex items-center"}>
              <UserDropdown />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SearchNavbar;
