import React, { Component } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

//todo GOLU all the things are created you just have to make backend code for api/join-club and api/undo-join-club

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      isJoined: this.props.check,
      club_id: this.props.clubid,
    };
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  onJoining = async () => {
    const token = localStorage.getItem("jwt");
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    var send_data = {
      token,
      club_id: this.state.club_id,
    };
    console.log(send_data);
    const finaldata = await axios.post(
      "/api/club/join-club",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({ alert: null, isJoined: finaldata.data.participated });
    }
  };
  removeThisMember = async () => {
    const token = localStorage.getItem("jwt");
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    var send_data = {
      token,
      club_id: this.state.club_id,
    };
    console.log(send_data);
    const finaldata = await axios.post(
      "/api/club/undo-join-club",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({
        alert: null,
        isJoined: finaldata.data.participated || false,
      });
    }
  };
  successJoined() {
    const getAlert = () => (
      <SweetAlert
        success
        title={"Welcome to the club !"}
        confirmBtnText="Got It !"
        confirmBtnCssClass="text-base rounded px-4 px-2 overwrite-success-btn"
        confirmBtnStyle={{ backgroundColor: "##28a745" }}
        onConfirm={this.onJoining}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You successfully joined{" "}
        <span className="font-semibold">{this.props.clubName}</span> as a
        Member.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
      isJoined: true,
    });
  }

  removeRegisteration() {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Leave"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.removeThisMember}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are cancling your Club Membership.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  render() {
    return (
      <div className="w-full">
        {this.state.isJoined ? (
          <button
            className=" w-full  hover:bg-lightalpha shadow border border-solid  bg-lightalpha text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => this.removeRegisteration()}
          >
            <i class="fas fa-file-signature"></i> Member
            {/* //todo GOLU here just
           // get the designation of the person and put it here */}
          </button>
        ) : (
          <button
            className=" w-full  hover:bg-lightalpha shadow border border-solid  bg-alpha text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => this.successJoined()}
          >
            <i class="fas fa-user-plus "></i> Join
          </button>
        )}

        {this.state.alert}
      </div>
    );
  }
}
