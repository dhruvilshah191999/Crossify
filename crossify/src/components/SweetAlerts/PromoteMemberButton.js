import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import urlObject from "../../config/default.json";
import io from "socket.io-client";

import { notifyIncorrectInput } from "notify";
var BackendURL = urlObject.BackendURL;
let socket = io(BackendURL, {
  transport: ["websocket", "polling", "flashsocket"],
});

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      club_id: this.props.club_id,
      user_id: this.props.user_id,
      isModerator: this.props.isModerator,
      creator_id: this.props.creatorId,
    };
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  confirmProcess = async () => {
    this.setState({ alert: null });
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
    var club_id = this.state.club_id;
    var club = await axios.post("/api/events/getclub", { club_id }, config);
    var clubName = club.data.data.club_name;
    var des = `Congratulations! You got Promoted in ${clubName} club by ${firstName}`;
    socket.emit("sendNotification", {
      date: new Date(),
      description: des,
      title: "yaay..! You got promotion 🤩",
      profile_photo: profile_photo,
      user_id: this.state.user_id,
      target_id: club_id,
      target_val: "club",
    });
    var object = {
      club_id: this.state.club_id,
      user_id: this.state.user_id,
      token: token,
      description: des,
      target_id: club_id,
      target_val: "club",
    };
    const finaldata = await axios.post("/api/admin/Promotion", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
  };
  confirmArrival = () => {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        success
        showCancel
        confirmBtnText="Promote"
        confirmBtnBsStyle="success"
        title="Do you want to Promote?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-2 py-2 bg-green-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.confirmProcess}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are promoting {this.props.name} to Moderator role.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  };
  giveUpThrone = () => {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        input
        showCancel
        confirmBtnText="Resign as Creator"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.resignAndPromote}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You will be demoted to Moderator. <br />
        {this.props.name} will be promoted to the Creator role.
        <br />
        <strong>
          {" "}
          Write{" "}
          <span class="font-semibold">
            'RESIGN AND PROMOTE {this.props.name}'
          </span>{" "}
          to proceed.{" "}
        </strong>
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  };

  resignAndPromote = async (answer) => {
    this.setState({ alert: null });
    if (answer !== "RESIGN AND PROMOTE " + this.props.name) {
      notifyIncorrectInput();
      return;
    } else {
      const token = localStorage.getItem("jwt");
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      const user = await axios.post("/api/profile/get-user", { token }, config);
      var userId = user.data.data._id;
      if (this.state.creator_id === userId) {
        var firstName = user.data.data.fname;
        var profile_photo = user.data.data.profile_photo;
        var club_id = this.state.club_id;
        var club = await axios.post("/api/events/getclub", { club_id }, config);
        var clubName = club.data.data.club_name;
        var des = `Hardwork always pays off, You bacame Admin of ${clubName} club by ${firstName}`;
        socket.emit("sendNotification", {
          date: new Date(),
          description: des,
          title: "yaay..! You became Admin ❤️",
          profile_photo: profile_photo,
          user_id: this.state.user_id,
          target_id: club_id,
          target_val: "club",
        });
        var object = {
          club_id: this.state.club_id,
          user_id: this.state.user_id,
          token: token,
          description: des,
          target_id: club_id,
          target_val: "club",
        };
        const finaldata = await axios.post(
          "/api/admin/promoteAndResign",
          object,
          config
        );
        if (finaldata.data.is_error) {
          console.log(finaldata.data.message);
        } else {
          window.location.reload();
        }
      } else {
        alert("you are not an admin");
      }
      // * isHeAdmin = Regarding the current user who is operating (is he admin)
      // * isAdmin = is the selected dude is moderator or not
      // TODO UPDATE HERE THE QUERY TO MAKE THE SELECTED DUDE CREATOR AND THE CURRENT ADMIN TO MODERATOR
      //   const finaldata = await axios.post(
      //     "/api/club/YOURAPINAME",
      //     object,
      //     config
      //   );
      //   if (finaldata.data.is_error) {
      //     console.log(finaldata.data.message);
      //   } else {
      //     window.location.replace("/");
      //   }
    }
  };

  render() {
    const { isModerator } = this.props;
    const shouldRun = true
      ? isModerator
        ? this.giveUpThrone
        : this.confirmArrival
      : isModerator
      ? () => console.log("NOT ALLOWED") //can show alert like you did in leaving club
      : this.confirmArrival;
    return (
      <div>
        <button className="text-lg mr-2 " type="button" onClick={shouldRun}>
          <i className="fas fa-chess-rook text-green-500 text-lg focus:outline-none"></i>
        </button>
        {this.state.alert}
      </div>
    );
  }
}
