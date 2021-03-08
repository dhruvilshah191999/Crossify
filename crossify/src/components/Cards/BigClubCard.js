import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
const ResultWindow = (props) => {
  let history = useHistory();
  let count = 0;
  const start = moment().format("LT");
  return (
    <div
      className="h-custom rounded-lg shadow p-4 flex w-full mt-2 hover:shadow-lg"
      style={{ width: "95%", cursor: "pointer" }}
      //onClick={() => showEvents(props.data._id)}
    >
      <div className="eventPhoto">
        <img
          className="card-image rounded-lg"
          src={props.data.profile_photo}
          style={{ width: "160px", height: "160px" }}
        ></img>
      </div>
      <div style={{ minWidth: "85%" }}>
        <div className="leading-3" style={{ marginLeft: "1.25rem" }}>
          <div className="text-xl font-bold">
            {props.data.club_name}{" "}
            <div
              className="inline-block text-sm font-semibold ml-1 text-gray-600"
              style={{ float: "right" }}
            >
              {" "}
              <i className="fas fa-map-marker-alt"></i> {props.data.location},
              {props.data.city},{props.data.state}
            </div>
          </div>
          <div className="text-base font-semibold text-gray-600 tracking-wider">
            {moment(props.data.date).format("LLL")}
          </div>

          <div className="mt-1 text-sm font-semibold text-gray-700 ">
            <i className="fas fa-users"></i> {props.data.max_members} &bull;{" "}
            {props.privacy} Group
          </div>
          <div className="mt-1 tracking-tight text-sm  text-gray-600 ">
            {props.data.description}
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
