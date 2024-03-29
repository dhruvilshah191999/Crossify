import React from "react";
import AboutTab from "./AboutTab";
import EventTab from "./EventTab";
import RoomTab from "./RoomTab";
import MemberTab from "./MemberTab";
import PhotosTab from "./PhotosTab";
import FilesTab from "./FilesTab";
import RestrictAccessNotice from "components/sections/RestrictAccessNotice";

const Tabs = (props) => {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row xxs:flex-col border-b border-alpha"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3  rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-alpha"
                    : "text-alpha2 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-info-circle text-base mr-1"></i> Profile
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3  rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-alpha"
                    : "text-alpha2 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-calendar-alt text-base mr-1"></i> Events
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3  rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-alpha"
                    : "text-alpha2 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="fas fa-comments text-base mr-1"></i> Rooms
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3  rounded block leading-normal " +
                  (openTab === 4
                    ? "text-white bg-alpha"
                    : "text-alpha2 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                <i className="fas fa-sitemap text-base mr-1"></i> Members
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3  rounded block leading-normal " +
                  (openTab === 5
                    ? "text-white bg-alpha"
                    : "text-alpha2 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();

                  setOpenTab(5);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fas fa-images text-base mr-1"></i>
                Photos
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3  rounded block leading-normal " +
                  (openTab === 6
                    ? "text-white bg-alpha"
                    : "text-alpha2 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(6);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="fas fa-briefcase text-base mr-1"></i> Files
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-1  rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <AboutTab
                    description={props.description}
                    rules={props.rules}
                    joining_criteria={props.joining_criteria}
                  />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  {openTab === 2 && (
                    <EventTab club_id={props.club_id} isAdmin={props.isAdmin} />
                  )}
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  {props.isJoin ? (
                    <RoomTab club_id={props.club_id} />
                  ) : (
                    <RestrictAccessNotice></RestrictAccessNotice>
                  )}
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  {props.isJoin && openTab === 4 ? (
                    <MemberTab club_id={props.club_id} />
                  ) : (
                    <RestrictAccessNotice></RestrictAccessNotice>
                  )}
                </div>
                <div className={openTab === 5 ? "block" : "hidden"} id="link5">
                  {props.isJoin && openTab === 5 ? (
                    <PhotosTab club_id={props.club_id} photo={props.photo} />
                  ) : (
                    <RestrictAccessNotice></RestrictAccessNotice>
                  )}
                </div>
                <div className={openTab === 6 ? "block" : "hidden"} id="link6">
                  {props.isJoin && openTab === 6 ? (
                    <FilesTab club_id={props.club_id} file={props.file} />
                  ) : (
                    <RestrictAccessNotice></RestrictAccessNotice>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
