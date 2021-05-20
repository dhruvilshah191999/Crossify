import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import demobg from "assets/img/demopf.png";
import axios from "axios";
import EvaulateProfile from "components/Cards/MemberProfileDetails";
import urlObject from "../../config/default.json";
import io from "socket.io-client";
var BackendURL = urlObject.BackendURL;
let socket = io(BackendURL, {
  transport: ["websocket"],
});
Modal.defaultStyles = {};

var customModalStyles = {
  content: {
    width: "70%",
    marginTop: "20px",
    transform: "translate(-50%, -50%)",
    height: "600px", // <-- This sets the height
    overlfow: "scroll", // <-- This tells the modal to scrol
  },
};

class MyModal extends Component {
  state = {
    tags: [],
  };

  handleUpdateTags = (tags) => {
    this.setState({ tags });
  };

  acceptRequest = async () => {
    const token = localStorage.getItem("jwt");
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    const user = await axios.post("/api/profile/get-user", { token }, config);
    var firstName = user.data.data.fname;
    var profile_photo = user.data.data.profile_photo;
    var club_id = this.props.club_id;
    var club = await axios.post("/api/events/getclub", { club_id }, config);
    var clubName = club.data.data.club_name;
    var des = ` Your Request of joining ${clubName} club has been accepted by ${firstName}`;
    socket.emit("sendNotification", {
      date: new Date(),
      description: des,
      title: "Congratulations! On your new role 🥳",
      profile_photo: profile_photo,
      user_id: this.props.user_id,
      target_id: club_id,
      target_val: "club",
    });
    var object = {
      club_id: this.props.club_id,
      user_id: this.props.user_id,
      token: token,
      profile_photo: profile_photo,
      description: des,
      target_id: club_id,
      target_val: "club",
    };
    const finaldata = await axios.post(
      "/api/admin/AcceptRequested",
      object,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
  };

  RejectedRequest = async () => {
    const token = localStorage.getItem("jwt");
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    const user = await axios.post("/api/profile/get-user", { token }, config);
    var firstName = user.data.data.fname;
    var profile_photo = user.data.data.profile_photo;
    var club_id = this.props.club_id;
    var club = await axios.post("/api/events/getclub", { club_id }, config);
    var clubName = club.data.data.club_name;
    var des = ` Your Request of joining ${clubName} club has been rejected by ${firstName}`;
    socket.emit("sendNotification", {
      date: new Date(),
      description: des,
      title: "offo..! You request has been rejected ☹️",
      profile_photo: profile_photo,
      user_id: this.props.user_id,
      target_id: club_id,
      target_val: "club",
    });
    var object = {
      club_id: this.props.club_id,
      user_id: this.props.user_id,
      token: token,
      profile_photo: profile_photo,
      description: des,
      target_id: club_id,
      target_val: "club",
    };
    const finaldata = await axios.post(
      "/api/admin/RemoveRequested",
      object,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
  };

  render() {
    const { onRequestClose } = this.props;

    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.RotateFromBottom3D}
        style={customModalStyles}
      >
        <div className="flex items-start justify-between p-5 ml-1 border-b border-solid bg-gray-600 border-gray-300 rounded-t">
          <h3 className="text-2xl">
            View Profile of{" "}
            <span className="font-semibold">{this.props.name}</span>
            {/* {this.props.username} */}
          </h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={ModalManager.close}
          >
            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        <div className="px-6 py-4 ">
          <EvaulateProfile
            user_id={this.props.user_id}
            club_id={this.props.club_id}
          />
        </div>
        <div className="flex items-center justify-end py-2 mb-2 ">
          <button
            className="bg-green-500 text-white active:bg-green-600 mr-2 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
            type="button"
            onClick={this.acceptRequest}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
            type="button"
            onClick={this.RejectedRequest}
          >
            Reject
          </button>
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={ModalManager.close}
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }
}
export default MyModal;
