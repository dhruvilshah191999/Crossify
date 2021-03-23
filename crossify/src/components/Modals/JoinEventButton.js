import React, { Component } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      question: null,
      isRegistered: this.props.check,
      eventid: this.props.eventid,
      current: this.props.current,
      max: this.props.max,
      readonly: this.props.readonly,
      waiting: this.props.waiting
    };
  }

  hideAlert = () => {
    console.log("Hiding alert...");
    this.setState({
      alert: null,
    });
  };

  onRecieveInput = (inputValue) => {
    inputValue = inputValue.trim();
    this.setState({
      alert: null,

      question: inputValue,
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
      event_id: this.state.eventid,
      current_participants: this.state.current,
    };
    var finaldata;
    if (this.state.current < this.state.max) {
      finaldata = await axios.post(
        "/api/events/participate-event",
        send_data,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        this.setState({
          alert: null,
          isRegistered: finaldata.data.participated,
        });
        this.setState({ current: this.state.current + 1 });
      }
    } else {
      finaldata = await axios.post(
        "/api/events/participate-event2",
        send_data,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        this.setState({
          alert: null,
          isRegistered: finaldata.data.participated,
          waiting:true,
        });
      }
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
      event_id: this.state.eventid,
      current_participants: this.state.current,
    };
    const finaldata = await axios.post(
      "/api/events/undo-participation-event",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({ alert: null, isRegistered: finaldata.data.participated });
      this.setState({ current: this.state.current - 1 });
    }
  };
  successJoined() {
    const getAlert = () => (
      <SweetAlert
        success
        title="Woot!"
        confirmBtnText="Got It !"
        confirmBtnCssClass="text-base rounded px-4 px-2 overwrite-success-btn"
        confirmBtnStyle={{ backgroundColor: "##28a745" }}
        onConfirm={this.onJoining}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You successfully registered for the Event.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  removeRegisteration() {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, Remove me!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        // onConfirm={this.deleteFile}
        // onCancel={this.onCancel}
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.removeThisMember}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are cancling your registeration
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  render() {
    return (
      <>
        <div className="w-full">
          {this.state.isRegistered ? (
            <button
              className={
                this.state.waiting
                  ? "w-full h-12 hover:text-white hover:bg-yellow shadow border border-solid  bg-lightalpha  text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  : " w-full h-12 hover:text-white hover:bg-alpha shadow border border-solid  bg-lightalpha  text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              }
              type="button"
              onClick={
                this.state.readonly ? "" : () => this.removeRegisteration()
              }
            >
              <i class="fas fa-file-signature"></i>{" "}
              {this.state.waiting ? "Waiting List" : "Joined"}
            </button>
          ) : (
            <button
              className="w-full h-12 hover:text-white hover:bg-lightalpha shadow border border-solid  bg-alpha text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={this.state.readonly ? "" : () => this.successJoined()}
            >
              <i class="fas fa-user-plus "></i> Attend
            </button>
          )}

          {this.state.alert}
        </div>
      </>
    );
  }
}
