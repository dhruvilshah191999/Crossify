import React, { useEffect, useState } from "react";
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
  const [loading, setloding] = useState(false);
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    async function fetchData() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };

      const user = await axios.post("/api/profile/get-user", { token }, config);
      const user_id = user.data.data._id;
      console.log(user);
      socket.emit("open", { user_id }, console.log("opened"));
      var object = {
        token,
      };
      const finaldata = await axios.post("/api/notification", object, config);

      console.log(finaldata);
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        console.log(finaldata.data.data);
        setData(finaldata.data.data);
        setTimeout(setloding(true), 1000);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log("in function");
    if (token) {
      console.log("in function after login");
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
            console.log("Notification received");
            console.log(data);
            var updatedData = data;
            updatedData[0].inbox.push(object);
            console.log(updatedData);

            addNotification({
              title: "A new Notification",
              subtitle: "Regarding your report...",
              message: title,
              native: true,
              theme: "darkblue",
              silent: false,
            });
          }
        );
    }
    return () => {};
  }, [socket, data]);

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    console.log("hey");

    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const check = (e) => {};

  if (loading) {
    return (
      <>
        <div
          onMouseEnter={(e) => {
            e.preventDefault();
            openDropdownPopover();
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            closeDropdownPopover();
          }}
        >
          <a
            className="hover:text-yellow text-yellow px-3 py-4 lg:py-2 flex items-center"
            href="#pablo"
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
    return <></>;
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
