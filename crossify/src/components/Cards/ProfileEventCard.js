import React, { useState, useEffect } from "react";
import MyTag from "components/Tag";
import Moment from "moment";
import axios from "axios";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import ShareButton from "components/SweetAlerts/ShareButton";
function ProfileClubCard(props) {
  let history = useHistory();
  const token = localStorage.getItem("jwt");
  const [checklike, setcheck] = useState(false);
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
      } else {
        setcheck(finaldata.data.Like);
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
      history.go(0);
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
      history.go(0);
    }
  };

  return (
    <div
      className="relative bg-white flex-shrink-0 hover:shadow-lg overflow-hidden border-b-4 border-blue-500 mx-2 mb-4 rounded shadow "
      style={{ width: 310, marginLeft: "0.5rem", marginRight: "0.5rem" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
    >
      <img
        src={props.data.photo}
        alt="People"
        className="w-full object-cover h-32 sm:h-48 md:h-64"
      />
      <div className="p-4 md:p-6">
        <p className="text-alpha">
          <span className="text-sm font-semibold text-alpha mr-2">
            {Moment(props.data.date).format("MMM DD YYYY")}
          </span>
        </p>
        <div className="float-right">
          {checklike ? (
            <motion.button
              className="bg-red-500 text-white shadow border border-solid border-red-500 hover:text-red-500 hover:bg-white active:text-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={(e) => deletelike(e)}
            >
              <i className="fas fa-heart"></i>
            </motion.button>
          ) : (
            <motion.button
              className="text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={(e) => addlike(e)}
            >
              <i className="fas fa-heart"></i>
            </motion.button>
          )}
          <ShareButton
            shareUrl={window.location.host + "/events/event=" + props.data._id}
            title={props.data.event_name}
            tags={props.data.tags}
          ></ShareButton>
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
}

ProfileClubCard.defaultProps = {
  data: {
    club_name: "Badshah Gang",
    tags: ["Tech", "Science"],
    photo:"1.jpg",
    place: "Ahmedabad , GJ",
    date: "July 14",
    photo: "1.jpg",
    duration: "8 PM to 11 PM",
  },
};

export default ProfileClubCard;
