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
    this.props.promoteMember();
    this.setState({ alert: null });
  };
  confirmArrival() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        success
        showCancel
        confirmBtnText="Accept"
        confirmBtnBsStyle="success"
        title="Do you want to Accept ?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-green-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.confirmProcess}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are accepting requests which means they will join the club as Member
        and can see related info.
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
          className="bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => this.confirmArrival()}
        >
          <i class="fas fa-calendar-check "></i> &nbsp;Accept
        </button>

        {this.state.alert}
      </div>
    );
  }
}
