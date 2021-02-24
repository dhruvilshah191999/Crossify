import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import { UserContext } from "context/usercontext";
const UserDropdown = () => {
  // dropdown props
  const { users } = useContext(UserContext);
  //console.log(users);
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
            "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
          }
        >
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => e.preventDefault()}
          >
            Settings
          </a>
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => e.preventDefault()}
          >
            My Groups
          </a>
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => e.preventDefault()}
          >
            My Clubs
          </a>
          <div className="h-0 my-2 border border-solid border-gray-200" />
          <Link
            to="/"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => Logout(e)}
          >
            Log Out
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
