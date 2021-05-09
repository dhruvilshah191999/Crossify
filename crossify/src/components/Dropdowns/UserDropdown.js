import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import { UserContext } from "context/usercontext";
const UserDropdown = (props) => {
  const { users, isLogin } = useContext(UserContext);
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current);
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const Logout = async (e) => {
    window.localStorage.removeItem("jwt");
    window.location.reload();
  };

  if (isLogin) {
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
          <a className="text-gray-600 block" href="#pablo" ref={btnDropdownRef}>
            <div className="items-center flex ">
              <span className="w-10 h-10 text-sm text-white border-white bg-gray-300 inline-flex items-center justify-center rounded-full  overflow-hidden">
                <img
                  alt="..."
                  className="w-10 h-10 rounded-full border-none shadow-lg "
                  src={users.profile_photo}
                />
              </span>
            </div>
          </a>
          <div
            ref={popoverDropdownRef}
            className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-xl min-w-48 font-semibold"
            }
          >
            <Link
              to="/profile"
              className="text-sm py-2 px-4 font-semibold block w-full whitespace-no-wrap bg-transparent text-gray-700 hover:bg-blue-100"
            >
              <i className="fas fa-tools text-gray-700 mr-2"></i> Settings
            </Link>
            <Link
              to="/profile/myclubs"
              className="text-sm py-2 px-4 font-semibold block w-full whitespace-no-wrap bg-transparent text-gray-700 hover:bg-blue-100"
            >
              <i className="fas fa-users text-gray-700 mr-2"></i> My Clubs
            </Link>
            <Link
              to="/profile/myevents"
              className="text-sm py-2 px-4 font-semibold block w-full whitespace-no-wrap bg-transparent text-gray-700 hover:bg-blue-100"
            >
              <i className="fas fa-calendar-day text-gray-700 mr-2"></i> My
              Events
            </Link>
            <Link
              to="/profile/manage/events"
              className="text-sm py-2 px-4 font-semibold block w-full whitespace-no-wrap bg-transparent text-gray-700 hover:bg-blue-100"
            >
              <i className="fas fa-sliders-h text-gray-700 mr-2"></i> Manage
              Events
            </Link>
            <div className="h-0 my-1 border border-solid border-gray-200" />
            <a
              href="https://forms.gle/JPfRcA3FYgqqBeip6"
              className="text-sm py-2 px-4 font-semibold block w-full whitespace-no-wrap bg-transparent text-gray-700 hover:bg-blue-100"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fas fa-star-half-alt text-gray-700 mr-2"></i> Rate
              our Website
            </a>

            <a
              href="https://forms.gle/mf5rCqLFSDeikiYT6"
              className="text-sm py-2 px-4 font-semibold block w-full whitespace-no-wrap bg-transparent text-gray-700 hover:bg-blue-100"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fas fa-bug text-gray-700 mr-2"></i> Be a Bug Police
            </a>

            <div className="h-0 my-1 border border-solid border-gray-200" />
            <Link
              to="/"
              className={
                "text-sm py-2 px-4 font-semibold block w-full whitespace-no-wrap bg-transparent text-alpha "
              }
              onClick={(e) => Logout(e)}
            >
              <i className="fas fa-sign-out-alt text-alpha mr-2 "></i> Log Out
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default UserDropdown;
