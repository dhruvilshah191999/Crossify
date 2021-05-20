import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import axios from "axios";
import Moment from "moment";
import { UserContext } from "context/usercontext";
import addNotification from "react-push-notification";
import urlObject from "../../config/default.json";
import io from "socket.io-client";
var BackendURL = urlObject.BackendURL;
let socket = io(BackendURL, {
  transport: ["websocket"],
});

const NotificationDropdown = () => {
  const [unread, setUnread] = useState(0);
  const [loading, setloding] = useState(false);
  const { users } = useContext(UserContext);
  const token = localStorage.getItem("jwt");
  const [animationFinished, setAnimationFinished] = useState(true);
  const history = useHistory();

  const onAnimationStart = () => {
    setAnimationFinished(false);
  };

  const onAnimationEnd = () => {
    setAnimationFinished(true);
  };

  useEffect(() => {
    setTimeout(() => {
      const unreadMsgs =
        (users.inbox && users.inbox.filter((el) => !el.isRead).length) || 0;
      setUnread(unreadMsgs);
    }, 2000);
  });
  useEffect(() => {
    async function fetchData() {
      setTimeout(() => {
        setloding(true);
      }, 1000);
      var user_id = users._id;
      socket.emit("open", { user_id });
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
          ({
            date,
            description,
            title,
            profile_photo,
            user_id,
            target_id,
            target_val,
          }) => {
            var object = {
              date: date,
              description: description,
              photo: profile_photo,
              isRead: false,
              title: title,
              sender_id: user_id,
              target_id: target_id,
              target_val: target_val,
            };
            users.inbox.push(object);

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
  }, [socket]);

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
  const NotificationRead = async () => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const feed = await axios.post(
      "/api/profile/readNotifications",
      { token },
      config
    );
    if (feed.data.is_error) {
      console.log(feed.data.message);
    } else {
      setUnread(0);
      users.inbox.forEach((e) => {
        if (!e.isRead) {
          e.isRead = true;
        }
      });
    }
  };
  const clickOnNotification = (el) => {
    if (el.target_val === "club") {
      history.push("/club/" + el.target_id);
    } else if (el.target_val === "event") {
      history.push("/events/event=" + el.target_id);
    } else {
      console.log("not anything");
    }
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
              ? "notification2  relative"
              : "notification2 notify relative"
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
                You have new{" "}
                <span className="font-semibold text-beta">{unread}</span>{" "}
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
                    onClick={NotificationRead}
                  >
                    Mark all as Read{" "}
                  </button>
                </span>
              </div>
              {users.inbox &&
                users.inbox
                  .map((el, index) => (
                    <div
                      key={index}
                      className={
                        el.isRead
                          ? "w-full flex p-2 pt-2 border-b2 pb-4 cursor-pointer"
                          : "w-full flex p-2 pt-2 bg-gray-200 border-b2 pb-4 cursor-pointer"
                      }
                      onClick={() => clickOnNotification(el)}
                      key={index}
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
                        <div className="flex flex-row w-full text-sm  text-black">
                          <div className="font-semibold">{el.title}</div>
                          <div className="ml-1">
                            <span className="text-xs text-gray-400 flex-shrink-0">
                              {Moment(el.date).fromNow()}
                            </span>{" "}
                          </div>
                        </div>
                        <div className="text-xs text-muted pr-4 ">
                          {el.description}
                        </div>
                      </div>
                    </div>
                  ))
                  .reverse()
                  .slice(0, 10)}
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

export default NotificationDropdown;
