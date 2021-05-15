import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { store } from "react-notifications-component";
import axios from "axios";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      complain: null,
      event_id: this.props.event_id,
    };
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  onRecieveInput = async (inputValue) => {
    this.setState({ alert: null });
    const token = localStorage.getItem("jwt");
    inputValue = inputValue.trim();
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      event_id: this.state.event_id,
      token,
      description: inputValue,
    };
    const finaldata = await axios.post("/api/events/reports", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      store.addNotification({
        title: "Event Reported  !",
        message: "Event Owner and Club Moderator can see your complain",
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          // onScreen: true,
        },
      });
      this.setState({
        // alert: null,
        complain: inputValue,
      });
    }
  };

  reportThisEvent() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        input
        showCancel
        confirmBtnText="Report"
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        confirmBtnBsStyle="primary"
        title="Report the Event"
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
        placeHolder="Write something"
        onConfirm={this.onRecieveInput}
        onCancel={this.hideAlert}
      >
        Explain reason for Report :
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  }
  render() {
    return (
      <div className="sweet-alert-container inline-block">
        <button
          className="ml-2"
          title="Report this Event"
          onClick={() => this.reportThisEvent()}
        >
          <i className="fas fa-flag text-sm text-gray-500 hover:text-red-500" />
        </button>

        {this.state.alert}
      </div>
    );
  }
}
