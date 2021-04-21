import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import urlObject from "../../config/default.json";
import io from "socket.io-client";
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
    };
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  confirmProcess = async () => {
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
    console.log(club);
    var clubName = club.data.data.club_name;
    var des = `Congratulations! You got Promoted in ${clubName} club by ${firstName}`;
    socket.emit("sendNotification", {
      date: new Date(),
      description: des,
      title: "yaay..! You got promotion 🤩",
      profile_photo: profile_photo,
      user_id: this.state.user_id,
    });
    var object = {
      club_id: this.state.club_id,
      user_id: this.state.user_id,
      token: token,
      description: des,
    };
    const finaldata = await axios.post("/api/admin/Promotion", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
  };
  confirmArrival() {
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
  }

  render() {
    return (
      <div>
        {this.state.isModerator ? (
          <button className="text-lg mr-2 " type="button">
            <i class="fas fa-chess-rook text-green-500 text-lg focus:outline-none"></i>
          </button>
        ) : (
          <button
            className="text-lg mr-2 "
            type="button"
            onClick={() => this.confirmArrival()}
          >
            <i className="fas fa-chess-rook text-green-500 text-lg focus:outline-none"></i>
          </button>
        )}
        {this.state.alert}
      </div>
    );
  }
}
