import Moment from "react-moment";
import React from "react";

const EventCard = (props) => {
  return (
    <div
      className="relative px-4 mb-4 flex-grow-0 "
      style={{
        width: 353,

        minHeight: "auto",
      }}
    >
      <div className="rounded overflow-hidden shadow-md hover:shadow-lg">
        <img
          src={props.data.photo}
          style={{ height: "210px", width: "355px" }}
          alt="eventPic"
        />
        <div className="px-2 py-1">
          <div className="text-xs text-gray-600 font-semibold">
            <i className="fas fa-user-shield"></i> : {"The Dark Group"}
          </div>
          <div className="text-xl  mt-1 font-semibold truncate leading-snug">
            {props.data.event_name}
          </div>
          <div className="text-xs text-gray-600 flex flex-row mt-1">
            <div>
              <i class="fas fa-map-marker-alt"></i> : {props.data.location},
              {props.data.city},{props.data.state}
            </div>
          </div>
          <div className="text-xs text-gray-600 flex flex-row mt-1">
            <div>
              <i className="fas fa-calendar-day"></i> :{" "}
              {<Moment format="DD MMM YYYY" date={props.data.date}></Moment>}
            </div>
            <div className="ml-auto">
              <i className="fas fa-hourglass-start"></i> :{" "}
              {<Moment format="hh:mm" date={props.data.date}></Moment>}
            </div>
          </div>
          <div className="text-xs text-gray-600 flex flex-row mb-1 mt-1"></div>
          <div
            className="absolute top-0 right-0 pl-4"
            style={{ paddingRight: "20px", paddingTop: "5px" }}
          >
            <span className=" text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200  last:mr-0">
              {"Today"}
            </span>
          </div>
          <div
            className="absolute top-0 right-0"
            style={{ marginTop: "195px", marginRight: "20px" }}
          >
            <button
              className="text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              <i className="fas fa-heart"></i>
            </button>
            <button
              className="text-blue-500 bg-white shadow border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
              type="button"
            >
              <i class="fas fa-share-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
