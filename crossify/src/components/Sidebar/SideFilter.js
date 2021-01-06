/*eslint-disable*/
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import Pagination from "components/ResultWindow/Pagination";
import ResultWindow from "components/ResultWindow";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import RangeInput from "components/RangeSlider";
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage] = React.useState(5);
  const [eventShow, setEventShow] = React.useState(true);
  const [interestState, setInterestState] = React.useState([]);
  const [getevent, setEvent] = React.useState([]);
  const [distance, Setdistance] = React.useState(0);
  const [showCategory, setCategory] = React.useState(false);
  const [startDate, SetstartDate] = React.useState(new Date());
  const [endDate, SetendDate] = React.useState(new Date());
  if (distance === "") {
    Setdistance(0);
  }

  React.useEffect(() => {
    console.clear();
    async function fetchData() {
      let InterestArray = [];
      try {
        const finaldata = await axios.get("/api/events/get-interest");
        if (finaldata.data.is_error) {
          console.log(finaldata.data.message);
        } else {
          InterestArray = finaldata.data.data;
        }
      } catch (err) {
        console.log(err);
      }
      setInterestState(
        InterestArray.map((data) => {
          return {
            select: false,
            id: data._id,
            name: data.category_name,
          };
        })
      );
    }

    async function fetchEvent() {
      try {
        const finaldata2 = await axios.get("/api/filter/get-event");
        if (finaldata2.data.is_error) {
          console.log(finaldata2.data.message);
        } else {
          setEvent(finaldata2.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    fetchEvent();
  }, []);

  const indexofLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexofLastPost - postPerPage;
  const currentEvents = getevent.slice(indexofFirstPost, indexofLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Notus React
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Notus React
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>
            {/* Divider */}

            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-2 pb-4 no-underline">
              Filters
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col lg:flex-row list-none ">
              <div className="text-sm">
                <label className="inline-flex items-center">
                  <input
                    name="target"
                    type="radio"
                    className="form-radio text-gray-600"
                    onClick={() =>
                      setEventShow((prevState) => {
                        console.log(prevState);
                        return !prevState;
                      })
                    }
                    checked={eventShow === true}
                  />
                  <span className="ml-2 text-gray-700">Event</span>
                </label>
              </div>
              <div className="text-sm ml-3">
                <label className="inline-flex items-center">
                  <input
                    name="target"
                    type="radio"
                    className="form-radio ml-3 text-gray-600"
                    onClick={() =>
                      setEventShow((prevState) => {
                        console.log(prevState);
                        return !prevState;
                      })
                    }
                    checked={eventShow === false}
                  />
                  <span className="ml-2 text-gray-700 ">Club</span>
                </label>
              </div>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Distance
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <div className="text-sm w-1/2 border-black">
                  <label className="inline-flex items-center">
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-2"
                      id="grid-zip"
                      type="number"
                      onChange={(e) => {
                        Setdistance(e.target.value);
                      }}
                      value={distance}
                    />

                    <span className="ml-2 text-gray-700">kms</span>
                  </label>
                </div>
              </li>
              <li className="items-center"></li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Categories
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-row list-none md:mb-4">
              <li className="items-center">
                {interestState.slice(0, 4).map((data) => (
                  <div key={data.id}>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        onChange={(event) => {
                          let checked = event.target.checked;
                          setInterestState(
                            interestState.map((records) => {
                              if (records.id === data.id) {
                                records.select = checked;
                              }
                              return records;
                            })
                          );
                        }}
                        checked={data.select}
                      ></input>

                      <span className="ml-2 text-gray-700 text-sm">
                        {data.name}
                      </span>
                    </label>
                  </div>
                ))}
                <div className={showCategory ? "" : "hidden"}>
                  {interestState.slice(4).map((data) => (
                    <div key={data.id}>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          onChange={(event) => {
                            let checked = event.target.checked;
                            setInterestState(
                              interestState.map((records) => {
                                if (records.id === data.id) {
                                  records.select = checked;
                                }
                                return records;
                              })
                            );
                          }}
                          checked={data.select}
                        ></input>

                        <span className="ml-2 text-gray-700 text-sm">
                          {data.name}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                <button
                  className="text-blue-600 font-semibold block background-transparent  text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  style={{ marginTop: "20px" }}
                  onClick={(e) => setCategory(!showCategory)}
                >
                  {showCategory ? "Show Less" : "Show All"}
                </button>
              </li>
            </ul>

            {/* if club is selected then show member size and if event is selected show starting and ending date */}
            <div className={eventShow ? "" : "hidden"}>
              <hr className="my-4 md:min-w-full" />
              {/* Heading */}
              <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Custom Dates
              </h6>
              {/* Navigation */}
              <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                <li>
                  <label className=" items-center">
                    <span className="mr-2  font-semibold text-red-500 text-sm">
                      Start
                    </span>
                    <input
                      type="date"
                      onChange={(e) => SetstartDate(e.target.value)}
                    />
                  </label>
                  <label className="block items-center">
                    <span className="mr-2  font-semibold text-red-500 text-sm">
                      End{"   "}
                    </span>
                    <input
                      type="date"
                      onChange={(e) => SetendDate(e.target.value)}
                    />
                  </label>
                </li>
              </ul>
            </div>
            <div className={eventShow ? "hidden" : ""}>
              <hr className="my-4 md:min-w-full" />
              {/* Heading */}
              <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Club Members
              </h6>
              {/* Navigation */}
              <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                <li className="mt-5" style={{ marginLeft: "15px" }}>
                  <RangeInput></RangeInput>
                </li>
              </ul>
            </div>

            <hr className="my-4 md:min-w-full" />
            <button
              className="bg-alpha text-white active:bg-gray-700 text-md   px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              // onClick={(e) => onSubmit(e)}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </nav>
      <div style={{ marginTop: "100px" }}>
        <ResultWindow getevent={currentEvents} loading={loading} />
        <Pagination
          postPerPage={postPerPage}
          totalPosts={getevent.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}
