import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class SweetAlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      isJoined: this.props.isJoin,
      club_id: this.props.club_id,
      isRequested: this.props.isRequest,
      isModerator: this.props.isMod,
      isPublic: this.props.isPublic,
      isHeAdmin: this.props.isAdmin, //TODO set according to your need
      isReply: [],
      questions: this.props.question,
      answers: [],
    };
    console.log(this.props);
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
      "/api/club/AddClubMember",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.props.history.go(0);
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
    const finaldata = await axios.post(
      "/api/club/RemoveClubMember",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.props.history.go(0);
    }
  };

  successJoined() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
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

  updateValues = (value, index) => {
    var que = this.state.questions;
    var reply = this.state.isReply;
    var object = {
      question: que[index],
      answer: value,
    };
    reply[index] = object;
    this.setState({
      isReply: reply,
    });
  };

  onCancleRequest = async () => {
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
    const finaldata = await axios.post(
      "/api/club/RemoveRequest",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.props.history.go(0);
    }
  };

  onRecievedInput = async () => {
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
      isReply: this.state.isReply,
    };
    const finaldata = await axios.post(
      "/api/club/AddRequestMember",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.props.history.go(0);
    }
  };
  requestForJoining() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        success
        showCancel
        confirmBtnText="Submit"
        confirmBtnBsStyle="success"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-green-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        title="Fill up the form."
        onConfirm={this.onRecievedInput}
        onCancel={this.hideAlert}
        type={"controlled"}
        dependencies={[this.state.questions]}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        <div>
          <form>
            <div className="flex flex-col ">
              {this.state.questions.map((el, index) => (
                <div>
                  <div className="w-full  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-gray-700 text-base font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        {el}
                      </label>
                      <textarea
                        rows="2"
                        className="bg-gray-100 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        value={this.state.answers[index]}
                        onChange={(e) =>
                          this.updateValues(e.target.value, index)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  removeRegisteration() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        danger
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
        You are leaving this Club. <br />
        You will no longer hold any roles in this club.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  adminLeaveInfo() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        info
        confirmBtnText="OK"
        confirmBtnBsStyle="info"
        title="Action is prohibited."
        focusCancelBtn
        confirmBtnCssClass="text-base rounded bg-beta text-white px-4 py-1"
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.hideAlert}
      >
        Creator can not leave the club. You require to appoint someone as a new
        creator before leaving the club.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  cancleRequest() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        danger
        showCancel
        confirmBtnText="Delete My Request"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.onCancleRequest}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are canceling your request to join this club.
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
            onClick={() =>
              this.state.isHeAdmin
                ? this.adminLeaveInfo()
                : this.removeRegisteration()
            }
          >
            <i className="fas fa-file-signature"></i>
            &nbsp;
            {this.state.isHeAdmin
              ? "Admin"
              : this.state.isModerator
              ? "Moderator"
              : "Member"}
          </button>
        ) : this.state.isRequested ? (
          <button
            className=" w-full  hover:bg-alpha shadow border border-solid  bg-lightalpha text-white active:bg-alpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => this.cancleRequest()}
          >
            <i className="fas fa-envelope"></i>&nbsp; Requested
          </button>
        ) : this.state.isPublic ? (
          <button
            className=" w-full  hover:bg-lightalpha shadow border border-solid  bg-alpha text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => this.successJoined()}
          >
            <i className="fas fa-user-plus "></i>&nbsp; Join
          </button>
        ) : (
          <button
            className=" w-full  hover:bg-orange-300 shadow border border-solid  bg-orange-500 text-white active:bg-orange-300 font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => this.requestForJoining()}
          >
            <i className="fas fa-id-card-alt"></i>&nbsp; Request to join
          </button>
        )}

        {this.state.alert}
      </div>
    );
  }
}

export default withRouter(SweetAlertModal);
