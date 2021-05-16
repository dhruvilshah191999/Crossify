import React, { useState, useEffect, useContext } from "react";
import defImg from "../../assets/img/event_1.jpeg";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { UserContext } from "context/usercontext";
import { store } from "react-notifications-component";
import { notifyLiked } from "notify";
import axios from "axios";
import ShareButton from "components/SweetAlerts/ShareButton";

const ClubCard = (props) => {
  let history = useHistory();
  const { users } = useContext(UserContext);
  const [loginstate, setLogin] = useState(false);
  const [like, setLike] = useState(false);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      setLogin(true);
      const b = users.fav_club.find((e) => e === props.data._id);
      if (b) {
        setLike(true);
      }
    }
  }, []);

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
        club_id: props.data._id,
      };
      const finaldata = await axios.post("/api/club/addlikes", object, config);
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
        users.fav_club.push(props.data._id);
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
        club_id: props.data._id,
      };
      const finaldata = await axios.post(
        "/api/club/removelikes",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        users.fav_club.pop(props.data._id);
        setLike(false);
      }
    }
  };

  const showClubs = (club_id) => {
    history.push("/club/" + club_id);
  };

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
          src={props.data.profile_photo}
          style={{ height: "210px", width: "100%" }}
          alt="eventPic"
        />

        <div className="px-2 py-1">
          <div
            className="text-lg mt-1 font-semibold truncate leading-snug max-ch-30"
            onClick={() => showClubs(props.data._id)}
            style={{
              cursor: "pointer",
            }}
          >
            {props.data.club_name}
          </div>
          <div className="text-xs text-gray-600 flex flex-row mt-1">
            <div>
              {" "}
              <i className="fas fa-user-lock"></i> : {props.data.status}
            </div>
            {/* <div className="ml-auto">
              {" "}
              <i className="fas fa-user-friends"></i> : {props.data.member_list.length}
            </div> */}
          </div>
          <div className="text-xs text-gray-600 flex flex-row mt-1 mb-1">
            <div className="truncate" style={{ width: "30ch" }}>
              {" "}
              <i className="fas fa-compass "></i> : {props.data.location},
              {props.data.city}
            </div>
            <div className="ml-auto">
              {" "}
              <i className="fas fa-user-friends"></i> :{" "}
              {props.data.member_list.length}
            </div>
            {/* <div className="ml-auto">
              {" "}
              <i className="fas fa-calendar-check"></i> : {count.event}
            </div> */}
          </div>

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
              <i className="fas fa-heart"></i>
            </motion.button>
            <ShareButton
              shareUrl={window.location.href + "club/" + props.data._id}
              title={props.data.club_name}
              description={props.data.description}
              tags={props.data.tags}
            ></ShareButton>
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
