import { Component } from "materialize-css";
import React from "react";
import defImg from "../../assets/img/event_1.jpeg";
import { motion } from "framer-motion";

const ClubCard = (props) => {
  return (
    <div
      className="relative px-2 mb-4 flex-grow-0 "
      style={{
        width: 311,

        minHeight: "auto",
      }}
    >
      <div className="rounded overflow-hidden shadow-md hover:shadow-lg">
        <img
          src={props.data.profile_photo}
          style={{ height: "210px", width: "355px" }}
          alt="eventPic"
        />

        <div className="px-2 py-1">
          <div className="text-lg mt-1 font-semibold truncate leading-snug">
            {props.data.club_name}
          </div>
          <div className="text-xs text-gray-600 flex flex-row mt-1">
            <div>
              {" "}
              <i class="fas fa-user-lock"></i> : {props.privacy}
            </div>
            <div className="ml-auto">
              {" "}
              <i className="fas fa-user-friends"></i> : {props.data.max_members}
            </div>
          </div>
          <div className="text-xs text-gray-600 flex flex-row mt-1 mb-1">
            <div>
              {" "}
              <i class="fas fa-compass"></i> : {props.data.location},
              {props.data.city}
            </div>
            <div className="ml-auto">
              {" "}
              <i className="fas fa-calendar-check"></i> :{" "}
              {props.eventCompoleted}
            </div>
          </div>

          <div
            className="absolute top-0 right-0"
            style={{ marginTop: "195px", marginRight: "20px" }}
          >
            <motion.button
              className="text-red-500 bg-white shadow border border-solid  hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-heart"></i>
            </motion.button>
            <motion.button
              className="text-blue-500 bg-white shadow border border-solid  hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i class="fas fa-share-alt"></i>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
ClubCard.defaultProps = {
  imgPath: defImg,
  categories: ["Tech", "Sports"],
  test: "hahhahah",
  name: "GreyHat BadAngles",
  privacy: "Public",
  location: "Ahmedabad,IN",
  members: 69,
  eventCompoleted: 10,
};

export default ClubCard;
