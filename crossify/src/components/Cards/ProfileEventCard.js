import React, { useState, useEffect } from "react";
import Moment from "moment";
import axios from "axios";
import MyTag from "components/Tag";

function ProfileClubCard(props) {
  const token = localStorage.getItem("jwt");
  const [checklike, setcheck] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function getData() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        token: token,
        event_id: props.data._id,
      };
      const finaldata = await axios.post(
        "/api/events/checklikes",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
        setTimeout(setloading(true), 1000);
      } else {
        setcheck(finaldata.data.Like);
        setTimeout(setloading(true), 1000);
      }
    }

    getData();
  });

  const addlike = async (e) => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      token: token,
      event_id: props.data._id,
    };
    const finaldata = await axios.post("/api/events/addlikes", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      setcheck(true);
      window.location.reload();
    }
  };

  const deletelike = async (e) => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      token: token,
      event_id: props.data._id,
    };
    const finaldata = await axios.post(
      "/api/events/deletelikes",
      object,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      setcheck(false);
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="relative bg-white hover:shadow-lg overflow-hidden border-b-4 border-blue-500 mx-4 mb-2 rounded shadow lg:w-1by3">
        <img
          src={props.data.photo}
          alt="People"
          className="w-full object-cover h-32 sm:h-48 md:h-64"
        />
        <div className="p-4 md:p-6">
          <p className="text-alpha">
            <span className="text-sm font-semibold text-alpha mr-2">
              {Moment(props.data.date).format("MMM DD")}
            </span>
            |
            <span className="text-sm font-semibold text-gray-700 text-alpha px-2">
              {props.duration}
            </span>
          </p>
          <div className="float-right">
            {checklike ? (
              <button
                className="bg-red-500 text-white shadow border border-solid border-red-500 hover:text-red-500 hover:bg-white active:text-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => deletelike(e)}
              >
                <i className="fas fa-heart"></i>
              </button>
            ) : (
              <button
                className="text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => addlike(e)}
              >
                <i className="fas fa-heart"></i>
              </button>
            )}

            <button
              className="text-blue-500 bg-white shadow border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              <i class="fas fa-share-alt"></i>
            </button>
          </div>
          <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
            {props.data.event_name}
          </h3>
          <div className="text-sm flex items-center">
            <i class="fas fa-map-marker-alt text-sm mr-2"></i>
            <p className="leading-none">
              {" "}
              {props.data.location},{props.data.city}
            </p>
          </div>
          <p className="text-blue-500 font-semibold text-xs mb-1 leading-none mt-4">
            {props.data.tags.map((el, i) => (
              <MyTag data={el}></MyTag>
            ))}
          </p>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

ProfileClubCard.defaultProps = {
  club_name: "Badshah Gang",
  tags: ["Tech", "Science"],
  place: "Ahmedabad , GJ",
  date: "July 14",
  duration: "8 PM to 11 PM",
};

export default ProfileClubCard;
