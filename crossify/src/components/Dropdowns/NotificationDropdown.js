import React from "react";
import { createPopper } from "@popperjs/core";
import demopf from "assets/img/pp1.jpg";
import { useHistory, Link } from "react-router-dom";

const NotificationDropdown = (props) => {
  // dropdown props
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
              You have <span className="font-semibold text-beta">12</span>{" "}
              Notifications.
            </div>
            {props.topNotifications.map((el) => (
              <Link to="/profile">
                {" "}
                <div
                  className={
                    el.visited
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
                      <div className="ml-auto mr-1">
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {el.time}
                        </span>{" "}
                      </div>
                      <div></div>
                    </div>
                    <div className="text-xs text-muted pr-4 ">
                      {el.semiTitle}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
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
