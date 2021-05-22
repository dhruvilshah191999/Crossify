import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
const ResultWindow = (props) => {
  let history = useHistory();
  let count = 0;

  const showClubs = (event_id) => {
    history.push("/club/" + event_id);
  };
  return (
    <div
      className="h-custom rounded-lg shadow p-4 flex xxs:flex-col xxs:text-center sm:flex-wrap mx-2 mt-4 mr-4 ml-2 hover:shadow-lg"
      style={{ width: "97%", cursor: "pointer", overflow: "hidden" }}
      onClick={() => showClubs(props.data._id)}
    >
      <div className="eventPhoto flex-shrink-0 mx-auto">
        <img
          alt="Profile"
          className="card-image rounded-lg"
          src={props.data.profile_photo}
          style={{ width: "200px", height: "140px" }}
        ></img>
      </div>
      <div style={{ minWidth: "75%" }}>
        <div className="leading-3" style={{ marginLeft: "1.25rem" }}>
          <div className="text-xl font-bold">{props.data.club_name} </div>

          <div className=" text-sm font-semibold text-beta mt-1">
            <i className="fas fa-users mr-1"></i>
            &nbsp;{props.data.status} Club
          </div>
          <div
            className="text-sm font-semibold text-alpha"
            style={{ width: "70%" }}
          >
            <i className="fas fa-map-marker-alt mr-2 ml-1"></i>{" "}
            {props.data.city},{props.data.state}
          </div>
          <div className="text-sm font-semibold  text-gray-600 tracking-wider">
            <i
              className="fas fa-calendar-day ml-1"
              style={{ marginRight: "0.65rem" }}
            ></i>
            {moment(props.data.date).format("DD MMM YYYY")}
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

export default ResultWindow;
