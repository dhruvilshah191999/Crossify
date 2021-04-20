import React from "react";
import pp1 from "assets/img/pp1.jpg";
import moment from "moment";

function Message(props) {
  const openModal = (user_id) => {
    window.open("/profilepage/" + user_id);
  };
  if (props.self) {
    return (
      <>
        <div className="flex flex-col w-full relative my-2">
          {" "}
          <div
            className="px-6 py-3 flex  flex-col bg-blue-200  ml-auto mr-6"
            style={{
              width: "fit-content",
              maxWidth: "60%",
              borderRadius: "1.25rem",
              backgroundColor: "#DCF8C6",
              // backgroundColor: "#d1fbff",
            }}
          >
            <div className="font-semibold text-sm text-gray-800 ">
              {props.username}
            </div>
            <div
              className="text-sm text-gray-700 mt-1 "
              style={{ lineHeight: "1.1rem" }}
            >
              {props.message}
            </div>
          </div>
          <div
            className="text-xs  text-gray-600 mb-3 ml-auto"
            style={{ marginRight: "3rem" }}
          >
            {moment(props.time).format("HH:mm A")}
          </div>
          <div
            className="w-12 h-12  absolute rounded-full overflow-hidden bg-white"
            style={{ bottom: 0, right: 0, padding: "0.5rem" }}
          >
            <img
              src={props.profilePic}
              className="rounded-full cursor-pointer"
              alt="profile"
              onClick={() => openModal(props.userId)}
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col w-full relative my-2">
          {" "}
          <div
            className="px-6 py-3 flex  flex-col bg-blue-200   ml-6 "
            style={{
              width: "fit-content",
              maxWidth: "60%",
              borderRadius: "1.25rem",

              backgroundColor: "#EBF3FE",
              color: "#fff",
            }}
          >
            <div className="font-semibold text-sm text-gray-800">
              {props.username}
            </div>
            <div className="text-sm text-gray-700">{props.message}</div>
          </div>
          <div
            className="text-xs  text-gray-600 mb-3 "
            style={{ marginLeft: "3rem" }}
          >
            {moment(props.time).format("HH:mm A")}
          </div>
          <div
            className="w-12 h-12  absolute rounded-full overflow-hidden bg-white"
            style={{ bottom: 0, left: 0, padding: "0.5rem" }}
          >
            <img
              src={props.profilePic}
              className="rounded-full cursor-pointer"
              alt="profile"
              onClick={() => openModal(props.userId)}
            />
          </div>
        </div>
      </>
    );
  }
}

Message.defaultProps = {
  username: "hackershil",
  message:
    "Wow! Today is October 30th! Halloween is tomorrow already! Have you decided what you will be dressing up for Halloween yet, Sara?",
  senttime: "9:12 AM",
  profilePic: pp1,
};

export default Message;
