import React from "react";
import demopf from "assets/img/profilepic.jpg";
// components

export default function CardProfile(props) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src={props.profilePic}
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                    {props.memberSize}
                  </span>
                  <span className="text-sm text-gray-500">Members</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                    {props.eventSize}
                  </span>
                  <span className="text-sm text-gray-500">Events</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                    {props.channelSize}
                  </span>
                  <span className="text-sm text-gray-500">Channels</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center ">
            <h2 className="text-2xl font-semibold leading-normal  text-gray-800 mb-2">
              {props.club_name}
            </h2>
            <div className="mb-2 text-gray-700 ">
              <i class="fas fa-hashtag mr-2 text-lg text-gray-500"></i>
              {props.categoriesList}
            </div>
            <h5 className="text-sm">by </h5>
            <h3 className="text-md  leading-normal mb-2 text-gray-700 mb-2">
              {props.ownerName}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-4 text-gray-500 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
              {props.location}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CardProfile.defaultProps = {
  club_name: "Badshaho ki Gang",
  profilePic: demopf,
  memberSize: 40,
  eventSize: 10,
  channelSize: 2,
  ownerName: "Harshil Patel",
  location: "Ahmedabad , IN",
  categoriesList: "Sports , Tech",
};
