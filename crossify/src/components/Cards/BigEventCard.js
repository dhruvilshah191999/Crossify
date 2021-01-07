import React, { useState, useEffect } from "react";
const ResultWindow = (props) => {
  const [tags, settags] = useState([]);
  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const finaldata = await axios.get("/api/events/get-interest");
  //       if (finaldata.data.is_error) {
  //         console.log(finaldata.data.message);
  //       } else {
  //         InterestArray = finaldata.data.data;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getData();
  // }, []);
  return (
    <div
      className="h-custom rounded-lg shadow p-4 flex w-full mt-2 hover:shadow-lg"
      style={{ width: "95%" }}
    >
      <div className="eventPhoto">
        <img
          className="card-image rounded-lg"
          src={props.data.photo}
          style={{ width: "160px", height: "160px" }}
        ></img>
      </div>
      <div className="leading-3" style={{ marginLeft: "1.25rem" }}>
        <div className="text-xl font-bold">
          {props.data.event_name}{" "}
          <div
            className="inline-block text-sm font-normal ml-1 text-gray-600"
            style={{ float: "right" }}
          >
            {" "}
            <i className="fas fa-map-marker-alt"></i> {props.location}
          </div>
        </div>
        <div className="text-sm font-semibold text-gray-600 tracking-wider">
          {props.day + " , " + props.date + " , " + props.time}
        </div>

        <div>
          <i className="fas fa-users"></i> {props.ownerGroup}
        </div>
        <div className="mt-1 tracking-tight text-sm">{props.description}</div>
        <div className="mt-1">
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-1 ">
            Photography
          </span>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-1 ">
            Art
          </span>
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