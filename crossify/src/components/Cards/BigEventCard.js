import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

const ResultWindow = (props) => {
  let history = useHistory();
  let count = 0;

  const showEvents = (event_id) => {
    history.push("/events/event=" + event_id);
  };
  return (
    <div
      className="h-custom rounded-lg shadow p-4 flex ml-2 mt-4 mr-4  hover:shadow-lg "
      style={{ width: "97%", cursor: "pointer", overflow: "overlay" }}
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
      <div style={{ minWidth: "250px" }}>
        <div className="leading-3" style={{ marginLeft: "1.25rem" }}>
          <div
            className="text-2xl font-bold  "
            style={{ lineHeight: "1.8rem" }}
          >
            {props.data.event_name}{" "}
          </div>

          <div className=" text-gray-700 text-sm ">
            by{" "}
            <span className="font-semibold text-gray-800">
              {props.data.club_data[0].club_name}
            </span>
          </div>
          <div className="text-sm mt-1 font-semibold text-alpha tracking-wider">
            {" "}
            <i className="fas fa-calendar-day mr-1 text-sm"></i>{" "}
            {moment(props.data.startdate).format("LLL")}
          </div>
          <div className="tracking-tight text-sm font-semibold text-beta flex flex-wrap w-full">
            <div>
              <i
                className="fas fa-map-marker-alt text-sm "
                style={{ marginRight: "0.6rem" }}
              ></i>
              <span className="truncate max-ch-10 ">
                {props.data.location.slice(0, 18)}
                {props.data.location.length > 18 ? "..." : ""}
              </span>
            </div>{" "}
            , {props.data.city}{" "}
            {/* <span className="text-gray-800 font-semibold mx-1"> &bull; </span> */}
            {/* <div>
              <span className="text-beta font-semibold">
                {"  "}
                <i className="fas fa-glass-cheers"></i> :{" "}
                {props.data.current_participants} /{" "}
                {props.data.maximum_participants}
              </span>
            </div> */}
          </div>

          <div className="mt-2 flex flex-wrap">
            {props.data.tags.map((data) => (
              <span
                key={count++}
                className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-beta bg-lightbeta mr-1 mb-1"
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
