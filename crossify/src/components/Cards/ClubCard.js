import React from "react";
import defImg from "../../assets/img/event_1.jpeg";

const getCategoriesLine = (categoryArray) => {
  var lastElement = categoryArray.pop();
  var line = "";
  categoryArray.forEach((element) => {
    line = element + " \u2022 "; //this is bullet's unicode
  });
  if (lastElement) {
    line += lastElement;
  }
  return line;
};

const ClubCard = (props) => {
  const categoriesLine = getCategoriesLine(props.categories);

  return (
    <div
      className="relative w-full px-4 mb-4 flex-grow-0"
      style={{ width: "350px" }}
    >
      <div className="rounded overflow-hidden shadow-md">
        <img
          src={props.imgPath}
          className="w-full object-cover"
          alt="eventPic"
        />
        <div className="px-2 py-1">
          <div className="text-xs text-gray-600 font-semibold">
            {categoriesLine}
          </div>
          <div className="text-lg mt-1 font-semibold truncate leading-snug">
            {props.name}
          </div>

          <div className="text-xs text-gray-600 flex flex-row mt-1">
            <div>
              {" "}
              <i className="fas fa-user-lock"></i> : {props.privacy}
            </div>
            <div className="ml-auto">
              {" "}
              <i className="fas fa-user-friends"></i> : {props.members}
            </div>
          </div>
          <div className="text-xs text-gray-600 flex flex-row mt-1 mb-1">
            <div>
              {" "}
              <i className="fas fa-compass"></i> : {props.location}
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
            <button
              className="text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-black hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              <i className="fas fa-heart"></i>
            </button>
            <button
              className="text-blue-500 bg-white shadow border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              <i className="fas fa-share-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ClubCard.defaultProps = {
  imgPath: defImg,
  categories: ["Tech", "Sports"],
  name: "GreyHat Magic",
  privacy: "Public",
  location: "Ahmedabad,IN",
  members: 69,
  eventCompoleted: 10,
};

export default ClubCard;
