import React, { Component } from "react";
import MyTag from "components/Tag";
import moment from "moment";

function ProfileClubCard(props) {
  console.log(props);
  return (
    <div
      className="relative bg-white flex-shrink-0 hover:shadow-lg overflow-hidden border-b-4 border-blue-500 mx-2 mb-4 rounded shadow "
      style={{ width: 320, marginLeft: "0.5rem", marginRight: "0.5rem" }}
    >
      <img
        src="https://images.unsplash.com/photo-1573748240263-a4e9c57a7fcd"
        alt="People"
        className="w-full object-cover h-32 sm:h-48 md:h-64"
      />
      <div className="p-4 md:p-6">
        <p className="text-alpha">
          <span className="text-sm font-semibold text-alpha mr-2">
            {(props.date)}
          </span>
        </p>
        <div className="float-right">
          <button
            className="text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            <i className="fas fa-heart"></i>
          </button>
          <button
            className="text-blue-500 bg-white shadow border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            <i class="fas fa-share-alt"></i>
          </button>
        </div>
        <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
          {props.event_name}
        </h3>
        <div className="text-sm flex items-center">
          <i class="fas fa-map-marker-alt text-sm mr-2"></i>
          <p className="leading-none"> {props.place}</p>
        </div>
        <p className="text-blue-500 font-semibold text-xs mb-1 leading-none mt-4">
          {props.tags.map((el, i) => (
            <MyTag data={el}></MyTag>
          ))}
        </p>
      </div>
    </div>
  );
}

ProfileClubCard.defaultProps = {
  club_name: "Badshah Gang",
  tags: ["Tech", "Science"],
  place: "Ahmedabad , GJ",
  date: "July 14",
  duration: "8 PM to 11 PM",
};

export default ProfileClubCard;
