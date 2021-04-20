import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
    };
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  onRecieveInput = (inputValue) => {
    inputValue = inputValue.trim();
    //todo do whatever you want to do with the input value
    this.props.handleBroadcast(inputValue);
    this.setState({
      alert: null,
      question: inputValue,
    });
  };

  BroadcastMessage() {
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
        title="Broadcast to Members"
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
        placeHolder="Broadcasting Message"
        onConfirm={this.onRecieveInput}
        onCancel={this.hideAlert}
      >
        Write the message you want to broadcast to selected Users :
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  }
  render() {
    return (
      <div className="inline-block mr-2">
        <button
          className="bg-orange-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => this.BroadcastMessage()}
        >
          <i className="fas fa-bullhorn "></i> Broadcast{" "}
        </button>
        {this.state.alert}
      </div>
    );
  }
}
