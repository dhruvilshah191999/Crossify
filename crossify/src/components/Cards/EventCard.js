import Moment from "react-moment";
import moment from "moment";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context/usercontext";
import { useHistory } from "react-router-dom";
import { notifyLiked, notifySomethingWentWrong } from "notify";
import { motion } from "framer-motion";
import ShareButton from "components/SweetAlerts/ShareButton";

const EventCard = (props) => {
  let history = useHistory();
  const { users } = useContext(UserContext);
  const [loginstate, setLogin] = useState(false);
  const [like, setLike] = useState(false);
  const token = localStorage.getItem("jwt");

  var datetoShow = moment(props.data.startdate).utc();
  const showEvents = (event_id) => {
    history.push("/events/event=" + event_id);
  };

  useEffect(() => {
    if (token) {
      setLogin(true);
      const b =
        (users.fav_event &&
          users.fav_event.find((e) => e === props.data._id)) ||
        false;
      if (b) {
        setLike(true);
      }
    }
  }, [props, token, users]);

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
        notifySomethingWentWrong();
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
        notifySomethingWentWrong();
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
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg">
        <img
          src={props.data.photo}
          style={{ height: "210px", width: "100%" }}
          alt="eventPic"
        />
        <div className="px-4 py-2">
          {/* <div className="text-xs text-gray-600 font-semibold">
            <i className="fas fa-user-shield"></i> : {props.data.club_name}
           
          </div> */}
          <div className="text-xs text-gray-600 flex flex-row mt-1 ">
            <div className="truncate max-ch-30 ">
              <i className="fas fa-map-marker-alt mr-1 "></i>{" "}
              {props.data.location} , {props.data.city}
            </div>
          </div>
          <div className="flex">
            <div>
              <div
                className="text-xl  mt-1 font-semibold truncate leading-snug cursor-pointer  "
                onClick={() => showEvents(props.data._id)}
              >
                {props.data.event_name}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                <span className="font-normal">by</span> {props.data.club_name}
              </div>
              <div
                className="text-xs  mt-2 text-gray-600 text-beta"
                style={{ fontWeight: 550 }}
              >
                {props.data.tags.map((tag, index) => {
                  if (index + 1 === props.data.tags.length) {
                    return (
                      <span className="capitalize" key={index + 1}>
                        {tag}{" "}
                      </span>
                    );
                  }
                  return (
                    <span className="capitalize" key={index + 1}>
                      {tag} &bull;{" "}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex ml-auto mr-1 mt-1 flex-col fit-content items-center px-3 calendar-date">
              <div className="text-alpha text-xl font-semibold">
                <Moment format="DD" date={datetoShow}></Moment>
              </div>
              <div className="uppercase text-sm font-semibold tracking-lg text-gray-700">
                <Moment format="MMM" date={datetoShow}></Moment>
              </div>
              <div
                className="uppercase text-sm text-gray-600"
                style={{ fontWeight: 500 }}
              >
                <Moment format="LT" date={datetoShow}></Moment>{" "}
              </div>
            </div>
          </div>

          {/* <div className="text-xs text-gray-600 flex flex-row mt-1 ">
            <div className="truncate max-ch-30">
              <i className="fas fa-map-marker-alt "></i> : {props.data.location}
              ,{props.data.city},{props.data.state}
            </div>
          </div> */}
          <div className="flex  items-center ">
            <div className=" flex flex-col"></div>
          </div>
          {/* <div className="text-xs text-gray-600 flex flex-row mt-1">
            <div>
              <i className="fas fa-calendar-day"></i> :{" "}
              {<Moment format="DD MMM YYYY" date={props.data.date}></Moment>}
            </div>
            <div className="ml-auto">
              <i className="fas fa-hourglass-start"></i> :{" "}
              {<Moment format="hh:mm" date={props.data.date}></Moment>}
            </div>
          </div> */}
          <div className="text-xs text-gray-600 flex flex-row mb-1 mt-1"></div>

          <div
            className="absolute top-0 right-0"
            style={{ marginTop: "195px", marginRight: "12px" }}
          >
            <motion.button
              className={
                !like
                  ? "text-likealpha bg-white shadow border border-solid  hover:bg-alpha hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  : "text-white bg-brightalpha shadow  hover:bg-white border border-solid hover:text-alpha active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
