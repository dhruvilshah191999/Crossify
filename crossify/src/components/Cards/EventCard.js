import Moment from "react-moment";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context/usercontext";
import { store } from "react-notifications-component";
import { useHistory } from "react-router-dom";
import { notifyLiked } from "notify";
import { motion } from "framer-motion";
import ShareButton from "components/SweetAlerts/ShareButton";

const EventCard = (props) => {
  let history = useHistory();
  const { users } = useContext(UserContext);
  const [loginstate, setLogin] = useState(false);
  const [like, setLike] = useState(false);
  const token = localStorage.getItem("jwt");

  const showEvents = (event_id) => {
    history.push("/events/event=" + event_id);
  };

  useEffect(() => {
    if (token) {
      setLogin(true);
      const b = users.fav_event.find((e) => e === props.data._id);
      if (b) {
        setLike(true);
      };
    }
  }, [props,token,users]);

  const addlike = async (e) => {
    if (loginstate) {
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
        "/api/events/addlikes",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
        store.addNotification({
          title: "Something went wrong",
          message: "Cannot add to favourite",
          type: "danger",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            // onScreen: true,
          },
        });
      } else {
        notifyLiked();
        users.fav_event.push(props.data._id);
        setLike(true);
      }
    }
  };

  const deletelike = async (e) => {
    if (loginstate) {
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
        users.fav_event.pop(props.data._id);
        setLike(false);
      }
    }
  };
  // 311 for normal screen 345 for larger screen
  return (
    <div
      className="relative"
      style={{
        flex: "1 1 0",
        height: "auto",
        minWidth: 250,
        maxWidth: 320,
      }}
    >
      <div className="rounded overflow-hidden shadow-md hover:shadow-lg">
        <img
          src={props.data.photo}
          style={{ height: "210px", width: "100%" }}
          alt="eventPic"
        />
        <div className="px-2 py-1">
          <div className="text-xs text-gray-600 font-semibold">
            <i className="fas fa-user-shield"></i> : {props.data.club_name}
            {/* props.data.club_data[0].club_name */}
          </div>
          <div
            className="text-xl  mt-1 font-semibold truncate leading-snug"
            style={{
              cursor: "pointer",
            }}
            onClick={() => showEvents(props.data._id)}
          >
            {props.data.event_name}
          </div>
          <div className="text-xs text-gray-600 flex flex-row mt-1 ">
            <div className="truncate max-ch-30">
              <i className="fas fa-map-marker-alt "></i> : {props.data.location}
              ,{props.data.city},{props.data.state}
            </div>
          </div>
          <div className="text-xs text-gray-600 flex flex-row mt-1">
            <div>
              <i className="fas fa-calendar-day"></i> :{" "}
              {<Moment format="DD MMM YYYY" date={props.data.date}></Moment>}
            </div>
            <div className="ml-auto">
              <i className="fas fa-hourglass-start"></i> :{" "}
              {<Moment format="hh:mm" date={props.data.date}></Moment>}
            </div>
          </div>
          <div className="text-xs text-gray-600 flex flex-row mb-1 mt-1"></div>

          <div
            className="absolute top-0 right-0"
            style={{ marginTop: "195px", marginRight: "12px" }}
          >
            <motion.button
              className={
                !like
                  ? "text-red-500 bg-white shadow border border-solid  hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  : "text-white bg-red-500 shadow  hover:bg-white border border-solid border-red-500 hover:text-red-500 active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              }
              type="button"
              style={loginstate ? {} : { cursor: "not-allowed" }}
              onClick={like ? (e) => deletelike(e) : (e) => addlike(e)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i
                className="fas fa-heart"
                // style={{ fontSize: "14px" }}
              ></i>
            </motion.button>
            <ShareButton
              shareUrl={window.location.href + "events/event=" + props.data._id}
              title={props.data.event_name}
              description={props.data.description}
              tags={props.data.tags}
            ></ShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
