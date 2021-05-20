import React from "react";
import demopf from "assets/img/profilepic.jpg";
import Tag from "components/Tag";
import DeleteMyClub from "components/SweetAlerts/DeleteMyClubButton";
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
                  src={props.clubData.profile_photo}
                  className="shadow-xl rounded-lg h-auto align-middle border-none absolute -m-18 -ml-22 lg:-ml-16 "
                  style={{ maxWidth: 200 }}
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                    {props.count.member}
                  </span>
                  <span className="text-sm text-gray-500">Members</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                    {props.count.event}
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
              {props.clubData.club_name}
            </h2>
            <div className="mb-2 text-gray-700 ">
              {props.categoriesList.map((el, index) => (
                <Tag data={el} key={index}></Tag>
              ))}
            </div>

            {/* <h5 className="text-sm">by </h5>
            <h3 className="text-md  leading-normal mb-2 text-gray-700 mb-2">
              {props.ownerName}
            </h3> */}
            <div className="text-sm leading-normal mt-0 mb-4 text-gray-500 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
              {props.clubData.city},{props.clubData.state}
            </div>
            <div>
              <DeleteMyClub club_id={props.club_id} />
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
  categoriesList: ["Sports", "Tech"],
};
