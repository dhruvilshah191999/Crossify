import React, { useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import axios from "axios";
import Moment from "moment";
import demopf from "assets/img/pp1.jpg";
import addNotification from "react-push-notification";
import urlObject from "../../config/default.json";
import io from "socket.io-client";
var BackendURL = urlObject.BackendURL;
let socket = io(BackendURL, {
  transport: ["websocket", "polling", "flashsocket"],
});
const NotificationDropdown = (props) => {
  const [data, setData] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setloding] = useState(false);
  const token = localStorage.getItem("jwt");
  const [animationFinished, setAnimationFinished] = useState(true);

  const onAnimationStart = () => {
    setAnimationFinished(false);
  };

  const onAnimationEnd = () => {
    setAnimationFinished(true);
  };

  //todo Bhagu set unread as number of message which are yet read not read
  // ! whenever you want show the shake animation just call setAnimationFinished(false) function

  // to get infomation about user and its notification
  useEffect(() => {
    console.log("in dropdown");
    async function fetchData() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };

      const user = await axios.post("/api/profile/get-user", { token }, config);
      const user_id = user.data.data._id;
      socket.emit("open", { user_id });
      var object = {
        token,
      };
      const finaldata = await axios.post("/api/notification", object, config);
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setData(finaldata.data.data);
        setTimeout(setloding(true), 1000);
      }
    }
    fetchData();
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      socket
        .off("Notify")
        .on(
          "Notify",
          ({ date, description, title, profile_photo, user_id }) => {
            var object = {
              date: date,
              description: description,
              photo: profile_photo,
              isRead: false,
              title: title,
              sender_id: user_id,
            };
            var updatedData = data;
            updatedData[0].inbox.push(object);

            addNotification({
              title: "A new Notification",
              subtitle: "Regarding your report...",
              message: title,
              native: true,
              theme: "darkblue",
              silent: false,
            });
            if (!dropdownPopoverShow) {
              setAnimationFinished(false);
            }
            setUnread((prev) => prev + 1);
          }
        );
    }
    return () => {};
  }, [socket, data]);

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const notifyNow = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  if (loading) {
    return (
      <>
        {/* <button
          type="button"
          id="notifyNow"
          onClick={() => {
            setAnimationFinished(false);
          }}
        >
          {" "}
          add{" "}
        </button> */}
        <div
          ref={notifyNow}
          className={
            animationFinished
              ? "notification  relative"
              : "notification notify relative"
          }
          onMouseEnter={(e) => {
            e.preventDefault();
            openDropdownPopover();
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            closeDropdownPopover();
          }}
          onAnimationEnd={onAnimationEnd}
          onAnimationStart={onAnimationStart}
        >
          {unread > 0 && (
            <div
              className="absolute rounded-full bg-alpha text-white flex justify-center items-center"
              style={{
                right: "5px",
                top: 0,
                width: "15px",
                height: "15px",
                overflow: "hidden",
                fontSize: "10px",
              }}
            >
              <span style={{ marginLeft: "-1px" }}>{unread}</span>
            </div>
          )}
          <a
            className="hover:text-yellow text-yellow px-3 py-4 lg:py-2 flex items-center"
            href="#notifications"
            ref={btnDropdownRef}
          >
            <i className="fas fa-bell rounded-full text-xl leading-lg mr-2" />{" "}
          </a>
          <div
            ref={popoverDropdownRef}
            className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              "bg-white text-base z-50 float-left  py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
            }
            style={{ width: 420 }}
          >
            <div
              className="flex flex-col overflow-y max-h-400vh"
              style={{ maxHeight: 455, overflowY: "scroll" }}
            >
              <div className="px-4 py-2 text-base mb-1 text-muted font-semibold">
                {" "}
                You have{" "}
                <span className="font-semibold text-beta">
                  {data[0].inbox.length}
                </span>{" "}
                Notifications.
                <span className="float-right">
                  <button
                    type="button"
                    className="text-beta text-sm font-semibold rounded px-2 hover:bg-beta  hover:text-white"
                    style={{
                      border: "1px solid #00838f",
                      paddingTop: "3px",
                      paddingBottom: "3px",
                    }}
                  >
                    Mark all as Read{" "}
                  </button>
                </span>
              </div>
              {data[0].inbox
                .map((el) => (
                  <div
                    className={
                      el.isRead
                        ? "w-full flex p-2 pt-2 border-b2 pb-4"
                        : "w-full flex p-2 pt-2 bg-gray-200 border-b2 pb-4"
                    }
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="w-12 h-12 rounded-full ml-2 "
                        src={el.photo}
                        alt="notification"
                      />
                    </div>
                    <div className="flex flex-col ml-6 mr-4">
                      {" "}
                      <div className="flex flex-row w-full text-sm">
                        <div className="font-semibold">{el.title}</div>
                        <div className="ml-1">
                          <span className="text-xs text-gray-400 flex-shrink-0">
                            {Moment(el.date, "YYYYMMDDHHmmss").fromNow()}
                          </span>{" "}
                        </div>
                      </div>
                      <div className="text-xs text-muted pr-4 ">
                        {el.description}
                      </div>
                    </div>
                  </div>
                ))
                .reverse()}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {" "}
        <div id="pop-pop"></div>
      </>
    );
  }
};

NotificationDropdown.defaultProps = {
  topNotifications: [
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 0,
    },
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle:
        "Q. The Event of Festival of Entereprenuer is free or not ?Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 0,
    },
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 1,
    },

    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 1,
    },
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 0,
    },
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle:
        "Q. The Event of Festival of Entereprenuer is free or not ?Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 0,
    },
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 1,
    },

    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 1,
    },
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 0,
    },
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle:
        "Q. The Event of Festival of Entereprenuer is free or not ?Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 0,
    },
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 1,
    },

    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 1,
    },
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 0,
    },
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle:
        "Q. The Event of Festival of Entereprenuer is free or not ?Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 0,
    },
    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 1,
    },

    {
      title: "Query is answered from Harshil.",
      photo: demopf,
      time: "3 hours Ago",
      semiTitle: "Q. The Event of Festival of Entereprenuer is free or not ?",
      visited: 1,
    },
  ],
};

export default NotificationDropdown;
