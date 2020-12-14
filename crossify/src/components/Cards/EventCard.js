import React from "react";
import defImg from "../../assets/img/event_1.jpeg";
const EventCard = (props) => {
  return (
    <div
      className="relative px-4 mb-4 flex-grow-0"
      style={{ width: "350px", height: "300px" }}
    >
      <div className="rounded overflow-hidden shadow-md">
        <img
          src={props.imgPath}
          className="w-full object-cover"
          alt="eventPic"
        />
        <div className="px-2 py-1">
          <div className="text-xs text-gray-600 font-semibold">
            <i className="fas fa-user-shield"></i> : {props.eventHost}
          </div>
          <div className="text-xl  mt-1 font-semibold truncate leading-snug">
            {props.eventName}
          </div>

          <div className="text-xs text-gray-600 flex flex-row mt-1">
            <div>
              {" "}
              <i className="fas fa-calendar-day"></i> : {props.eventDay} &bull;
              {props.eventDate}{" "}
            </div>
            <div className="ml-auto">
              {" "}
              <i className="fas fa-user-friends"></i> : {props.eventCapacity}{" "}
            </div>
          </div>
          <div className="text-xs text-gray-600 flex flex-row mb-1">
            <div>
              <i className="fas fa-hourglass-start"></i> : {props.eventTime}
            </div>
            <div className="ml-auto">
              <i className="fas fa-clock"></i> : {props.eventDuration}
            </div>
          </div>
          <div
            className="absolute top-0 right-0 pl-4"
            style={{ paddingRight: "20px", paddingTop: "5px" }}
          >
            <span className=" text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200  last:mr-0">
              {props.status}
            </span>
          </div>
          <div
            className="absolute top-0 right-0"
            style={{ marginTop: "195px", marginRight: "20px" }}
          >
            <button
              className="text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-black hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              <i className="fas fa-heart"></i>
            </button>
            <button
              className="text-blue-500 bg-white shadow border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              <i className="fas fa-share-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
EventCard.defaultProps = {
  imgPath: defImg,
  eventHost: "VGEC Football Club",
  eventName: "Football Match",
  eventDay: "SUN",
  eventDate: "12/12/2020",
  eventTime: "8:00 AM",
  eventDuration: "4 Hours",
  eventCapacity: "20",
  status: "Today",
};
export default EventCard;
