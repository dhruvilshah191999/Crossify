import Moment from "react-moment";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { store } from "react-notifications-component";

const EventCard = (props) => {
  const [loginstate, setLogin] = useState(false);
  const [like, setLike] = useState(false);
  const [clubname, Setclub] = useState("");
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    console.clear();
    async function fetchData() {
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
        setLike(finaldata.data.Like);
      }
    }

    async function fetchclub() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        club_id: props.data.club_id,
      };
      const finaldata = await axios.post("/api/events/getclub", object, config);
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        if (finaldata.data.data != null) Setclub(finaldata.data.data.club_name);
      }
    }

    if (token) {
      setLogin(true);
      fetchData();
    }
    fetchclub();
  }, []);

  const notifyCopied = () => {
    store.addNotification({
      title: "Succesfully Copied to Clipboard",
      message: "Share the event with your friends ! ",
      type: "info",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        // onScreen: true,
      },
    });
  };

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
        store.addNotification({
          title: "Added to Favourites !",
          message: "You can access with ease in your profile.",
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
        setLike(false);
      }
    }
  };
  return (
    <div
      className="relative px-4 mb-4 flex-grow-0 "
      style={{
        width: 345,
        minHeight: "auto",
      }}
    >
      <div className="rounded overflow-hidden shadow-md hover:shadow-lg">
        <img
          src={props.data.photo}
          style={{ height: "210px", width: "355px" }}
          alt="eventPic"
        />
        <div className="px-2 py-1">
          <div className="text-xs text-gray-600 font-semibold">
            <i className="fas fa-user-shield"></i> : {clubname}
          </div>
          <div className="text-xl  mt-1 font-semibold truncate leading-snug">
            {props.data.event_name}
          </div>
          <div className="text-xs text-gray-600 flex flex-row mt-1">
            <div>
              <i class="fas fa-map-marker-alt"></i> : {props.data.location},
              {props.data.city},{props.data.state}
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
            className="absolute top-0 right-0 pl-4"
            style={{ paddingRight: "20px", paddingTop: "5px" }}
          ></div>
          <div
            className="absolute top-0 right-0"
            style={{ marginTop: "195px", marginRight: "20px" }}
          >
            <button
              className={
                !like
                  ? "text-red-500 bg-white shadow border border-solid  hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  : "text-white bg-red-500 shadow  hover:bg-white border border-solid border-red-500 hover:text-red-500 active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              }
              type="button"
              style={loginstate ? {} : { cursor: "not-allowed" }}
              onClick={like ? (e) => deletelike(e) : (e) => addlike(e)}
            >
              <i
                className="fas fa-heart"
                // style={{ fontSize: "14px" }}
              ></i>
            </button>
            <CopyToClipboard
              text={window.location.href + "events/event=" + props.data._id}
            >
              <button
                className="text-blue-500 bg-white shadow border border-solid  hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                type="button"
                onClick={notifyCopied}
              >
                <i
                  class="fas fa-share-alt"
                  // style={{ fontSize: "14px" }}
                ></i>
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
