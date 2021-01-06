import React from "react";
import { createPopper } from "@popperjs/core";

const NotificationDropdown = (props) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    console.log("hey");
    createPopper(btnDropdownRef.current, popoverDropdownRef.current);
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
            "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
          }
        >
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => e.preventDefault()}
          >
            Messages
          </a>
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => e.preventDefault()}
          >
            Another action
          </a>
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => e.preventDefault()}
          >
            Something else here
          </a>
          <div className="h-0 my-2 border border-solid border-gray-200" />
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => e.preventDefault()}
          >
            Seprated link
          </a>
        </div>
      </div>
    </>
  );
};

export default NotificationDropdown;
