import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "context/usercontext";
import { Redirect } from "react-router-dom";
import hobbyImg from "assets/img/hobbyImg.jpg";
import four_boys from "assets/img/four_boys.jpg";
import { store } from "react-notifications-component";
// components
import { motion } from "framer-motion";
import GridLoader from "react-spinners/GridLoader";
import Navbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import EventCard from "components/Cards/EventCard";
import ClubCard from "components/Cards/ClubCard";
import Creators from "components/sections/Creators";

export default function Landing() {
  let history = useHistory();
  const {
    isLogin,
    search_dispatch,
    category,
    EventData,
    ClubData,
    InterestEventData,
  } = useContext(UserContext);
  const [loading, isLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setlocation] = useState("");
  const [readNotification, setreadNotification] = React.useState(false);

  useEffect(async () => {
    setTimeout(() => {
      isLoading(true);
    }, 400);
  }, []);

  const SearchFilter = async (category_name) => {
    var object = {
      search: category_name,
      location: "",
    };
    search_dispatch({ type: "Add-Search", add: object });
    history.push("/search");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    var object = {
      search,
      location,
    };
    search_dispatch({ type: "Add-Search", add: object });
    history.push("/clubsearch");
  };

  if (loading) {
    return (
      <>
        <Navbar transparent />
        <main>
          <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75 w-full">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-75 bg-black"
              ></span>
            </div>
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 px-2 ml-auto mr-auto text-center">
                  <h1 className="text-white font-semibold text-5xl">
                    Seek Your Interest
                  </h1>
                </div>
              </div>
              <br />
              <form>
                <div className="flex justify-center flex-wrap w-full">
                  <div className="bg-white p-2 align-center flex w-full xs:p-1 w-65">
                    <div style={{ flex: "1 1 60%" }}>
                      <input
                        style={{
                          outline: "none",
                          borderRight: "2px solid gray",
                        }}
                        className="p-2 text-lg w-full"
                        type="text"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder="Find your club"
                      />
                    </div>
                    <div style={{ flex: "1 1 35%", overflow: "hidden" }}>
                      <input
                        style={{ outline: "none" }}
                        className="p-2  text-lg w-full"
                        type="text"
                        name="location"
                        onChange={(e) => setlocation(e.target.value)}
                        value={location}
                        placeholder="Select Location"
                      />
                    </div>
                  </div>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="bg-alpha hover:bg-brightalpha hover:shadow-md rounded text-white p-2 pl-4 pr-4 xs:block"
                    onClick={(e) => onSubmit(e)}
                  >
                    <p className="font-semibold text-md">Search</p>
                  </button>
                </div>
              </form>
            </div>

            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              ></svg>
            </div>
          </div>

          <section className="bg-white block m-4">
            <div className="p-8 mx-6 sm:p-10 mx-0">
              <div className="mb-6">
                <div className="flex flex-row xs:flex-column">
                  <h4 className="text-3xl xs:text-2xl ml-1 font-semibold leading-normal mt-0 mb-2 text-alpha">
                    Upcoming Nearby Events
                  </h4>
                  <motion.button
                    className="text-beta font-semibold ml-auto mr-2 hover:text-lightbeta"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link to="/search">
                      {" "}
                      Load More <i className="fas fa-angle-double-right"></i>{" "}
                    </Link>
                  </motion.button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {EventData.map((data) => (
                  <EventCard key={data._id} data={data}></EventCard>
                ))}
              </div>
            </div>
          </section>
          <section
            className="bg-white block m-4"
            style={{ marginBottom: "20px" }}
          >
            <div className="p-8 mx-6 sm:p-10 mx-0">
              <div className="mb-6">
                <div className="flex flex-row ">
                  <h4 className="text-3xl ml-1 font-semibold leading-normal mt-0 mb-2 text-alpha">
                    Explore Local Clubs
                  </h4>
                  <motion.button
                    className="text-beta font-semibold ml-auto mr-2 hover:text-lightbeta"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link to="/clubsearch">
                      {" "}
                      Load More <i className="fas fa-angle-double-right"></i>{" "}
                    </Link>
                  </motion.button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {ClubData.map((data) => (
                  <ClubCard key={data._id} data={data}></ClubCard>
                ))}
              </div>
            </div>
          </section>

          {InterestEventData.map((el) =>
            el.event.length !== 0 ? (
              <section
                className="bg-white block m-4"
                style={{ marginBottom: "0px" }}
              >
                <div className="p-8 mx-6 pt-0">
                  <div className=" mb-6">
                    <div className="flex flex-row ">
                      <h4 className="text-3xl ml-1 font-semibold leading-normal mt-0 mb-2 text-alpha">
                        {el.category_name}
                      </h4>
                      <motion.button
                        className="text-beta font-semibold ml-auto mr-2 hover:text-lightbeta"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Link to="/search">
                          {" "}
                          Load More{" "}
                          <i className="fas fa-angle-double-right"></i>{" "}
                        </Link>
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {el.event.map((data) =>
                      data.is_active ? (
                        <EventCard key={data._id} data={data}></EventCard>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                </div>
              </section>
            ) : (
              ""
            )
          )}

          <section className="pb-4 bg-gray-100 ">
            <div className="container mx-auto px-4">
              <div className="flex flex-col">
                <div className="flex flex-row justify-center ">
                  {" "}
                  <div className="text-2xl m-4 font-bold text-alpha  pt-6">
                    {" "}
                    Browse Clubs by Category
                  </div>
                </div>
                <div className="flex flex-row justify-center flex-wrap container p-4">
                  {" "}
                  {category.map((el) => {
                    return (
                      <motion.button
                        type="button"
                        className=" rounded-lg shadow p-4 mr-6 category-container mb-4 text-center   hover:border-lightbeta hover:shadow-lg active:bg-superlightbeta active:text-white hover:bg-offwhite  hover:text-extrabeta font-semibold"
                        style={{ outline: "none" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => SearchFilter(el.category_name)}
                      >
                        {el.category_name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className=" py-20">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-white fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>

            <div className="w-full container mx-auto px-4">
              <div className="items-center flex flex-wrap">
                <div className="w-full md:w-6/12 ml-auto mr-auto px-4 mb-8">
                  <img
                    alt="..."
                    className="max-w-full rounded-lg shadow-lg text-center"
                    src={four_boys}
                    style={{ maxHeight: "600px" }}

                    // src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <div className="text-blue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blue-300">
                      <i className="fas fa-rocket text-xl"></i>
                    </div>
                    <h3 className="text-3xl font-semibold">
                      A growing community
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">
                      The application connects users with their interest to
                      explore new inspiration and ideas of the related
                      industries. Focuses on building keen, strong and united
                      communities to prospore and flourish our interest whether
                      it is career related or just a healthi hobby
                    </p>
                    <ul className="list-none mt-6">
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3">
                              <i className="fas fa-bullhorn"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              Wide Range of Clubs and Events
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3">
                              <i className="fas fa-chart-line"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              Free and Simple to Build Club
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3">
                              <i className="fas fa-bolt"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              Powerful Nearby Search Engine
                            </h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20 relative block bg-gray-900">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-900 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
            <Creators />
          </section>
        </main>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <div
          className="flex justify-center items-center"
          style={{ height: "100vh" }}
        >
          <GridLoader color="#36D7B7" size={15} />
        </div>
      </>
    );
  }
}
