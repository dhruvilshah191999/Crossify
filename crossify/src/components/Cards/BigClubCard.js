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
      className="h-custom rounded-lg shadow p-4 flex mx-2 mt-4 mr-4 ml-2 hover:shadow-lg"
      style={{ width: "97%", cursor: "pointer" }}
      onClick={() => showClubs(props.data._id)}
    >
      <div className="eventPhoto flex-shrink-0">
        <img
          alt="Profile Photo"
          className="card-image rounded-lg"
          src={props.data.profile_photo}
          style={{ width: "200px", height: "140px" }}
        ></img>
      </div>
      <div style={{ minWidth: "75%" }}>
        <div className="leading-3" style={{ marginLeft: "1.25rem" }}>
          <div className="text-xl font-bold">{props.data.club_name} </div>

          <div className=" text-sm font-semibold text-beta ">
            <i className="fas fa-users"></i> {props.data.status} Group
          </div>
          <div className="text-sm font-semibold  text-alpha">
            {" "}
            <i className="fas fa-map-marker-alt"></i> {props.data.location},
            {props.data.city},{props.data.state}
          </div>
          <div className="text-sm font-semibold  text-gray-600 tracking-wider">
            <i className="fas fa-calendar-day mr-1"></i>{" "}
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

ResultWindow.defaultProps = {
  privacy: "Public", //todo GOLU ADD PRIVACY WITH CLUB
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
