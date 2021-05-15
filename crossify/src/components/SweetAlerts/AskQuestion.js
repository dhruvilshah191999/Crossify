import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import { store } from "react-notifications-component";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      question: null,
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
      question: inputValue,
      token,
    };
    const finaldata = await axios.post(
      "/api/events/ask-question",
      object,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      store.addNotification({
        title: "Your Question send to the event admin",
        message: "We will provide answer regarding your question",
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
    }
    this.setState({
      // alert: null,
      question: inputValue,
    });
  };

  deleteThisGoal() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        input
        showCancel
        confirmBtnText="Submit"
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        confirmBtnBsStyle="primary"
        title="Ask Question"
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
        placeHolder="Write something"
        onConfirm={this.onRecieveInput}
        onCancel={this.hideAlert}
      >
        Write the questions you have:
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  }
  render() {
    return (
      <div className="sweet-alert-container ">
        <button
          type="button"
          onClick={() => this.deleteThisGoal()}
          className="font-semibold border shadow hover:bg-lightbeta focus:outline-none border-beta hover:border-beta text-white text-sm px-4 py-1 rounded bg-beta"
        >
          <i className="fas fa-user-plus"></i> Ask
        </button>

        {this.state.alert}
      </div>
    );
  }
}
