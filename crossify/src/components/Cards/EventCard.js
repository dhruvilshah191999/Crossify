import Moment from "react-moment";
import React from "react";

const EventCard = (props) => {
  return (
    <div
      className="relative px-4 mb-4 flex-grow-0"
      style={{ width: "300px", minHeight: "auto", marginBottom: "30px" }}
    >
      <div className="rounded overflow-hidden shadow-md">
        <img
          src={props.data.photo}
          className="object-cover"
          alt="eventPic"
          style={{ width: "300px", height: "200px" }}
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
              <i class="fas fa-globe-asia"></i> : {props.data.location},
              {props.data.city},{props.data.state}
            </div>
          </div>
          <div className="text-xs text-gray-600 flex flex-row mt-1">
            <div>
              <i className="fas fa-calendar-day"></i> :{" "}
              {<Moment format="YYYY/MM/DD" date={props.data.date}></Moment>}
            </div>
            <div className="ml-auto">
              {" "}
              <i className="fas fa-user-friends"></i> :{" "}
              {props.data.participants_list.length}
            </div>
          </div>
          <div className="text-xs text-gray-600 flex flex-row mb-1 mt-1">
            <div>
              <i className="fas fa-hourglass-start"></i> :{" "}
              {<Moment format="hh:mm" date={props.data.date}></Moment>}
            </div>
          </div>
          <div
            className="absolute top-0 right-0 pl-4"
            style={{ paddingRight: "20px", paddingTop: "5px" }}
          >
            <span className=" text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200  last:mr-0">
              {"Today"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
