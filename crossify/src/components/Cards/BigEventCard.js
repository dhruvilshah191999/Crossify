import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

const bookedSeats = 12;
const totalSeats = 30;

const ResultWindow = (props) => {
  let history = useHistory();
  let count = 0;

  const showEvents = (event_id) => {
    history.push("/events/event=" + event_id);
  };
  return (
    <div
      className="h-custom rounded-lg shadow p-4 flex mx-2 mt-4 mr-4 ml-2 hover:shadow-lg"
      style={{ width: "97%", cursor: "pointer" }}
      onClick={() => showEvents(props.data._id)}
    >
      <div className="eventPhoto flex-shrink-0">
        <img
          alt="Event_photo"
          className="card-image rounded-lg"
          src={props.data.photo}
          style={{ width: "200px", height: "140px" }}
        ></img>
      </div>
      <div style={{ minWidth: "75%" }}>
        <div className="leading-3" style={{ marginLeft: "1.25rem" }}>
          <div className="text-xl font-bold ">{props.data.event_name} </div>
          <div className="text-base font-semibold text-gray-600 tracking-wider">
            {" "}
            {moment(props.data.date).format("LLL")}
          </div>
          <div className="mt-1 tracking-tight text-sm font-semibold text-alpha ">
            <i className="fas fa-map-marker-alt text-sm"></i>{" "}
            {props.data.location}{" "}
            <span className="text-gray-800 font-semibold">&bull;</span>
            <span className="text-beta font-semibold">
              {"  "}
              <i class="fas fa-glass-cheers"></i> : {bookedSeats} / {totalSeats}
            </span>
          </div>
          <div className="mt-1 text-gray-700 text-sm ">
            <i className="fas fa-users"></i> {props.ownerGroup}
          </div>

          <div className="mt-2">
            {props.data.tags.map((data) => (
              <span
                key={count++}
                className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-beta bg-lightbeta mr-1 "
              >
                {data}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ResultWindow.defaultProps = {
  title: "Portrait Photography Workshop",
  day: "SUN",
  date: "JAN 2",
  time: "9:00 AM",
  duration: "2 hours",
  location: "Ahmedabad , IN",
  ownerGroup: "WeClicks Club",
  description:
    " This a beginner friendly Workshop where we introducted everyone to essential tips to get head start into becoming a Professional Portrait Photographer",
};

export default ResultWindow;
