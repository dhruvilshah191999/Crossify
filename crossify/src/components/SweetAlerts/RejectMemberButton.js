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

  confirmProcess = () => {
    this.setState({ alert: null });
    this.props.handleRejection();
  };
  confirmArrival() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        danger
        showCancel
        confirmBtnText="Reject"
        confirmBtnBsStyle="danger"
        title="Do you want to reject?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-2 py-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.confirmProcess}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are rejecting joining request of selected users.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  render() {
    return (
      <div className="inline-block">
        <button
          className="bg-red-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 ml-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => this.confirmArrival()}
        >
          <i className="fas fa-window-close "></i> &nbsp;Reject
        </button>

        {this.state.alert}
      </div>
    );
  }
}
