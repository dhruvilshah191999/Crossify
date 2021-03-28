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
    this.props.handlePrivate();
    this.setState({ alert: null });
  };
  confirmArrival() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        info
        showCancel
        confirmBtnText="Privatise"
        confirmBtnBsStyle="info"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-blue-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.confirmProcess}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        Selected Question will not be seen by the users.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  render() {
    return (
      <div className="inline-block mr-2 ">
        <button
          className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => this.confirmArrival()}
        >
          <i class="fas fa-lock  "></i>&nbsp; Privatise
        </button>

        {this.state.alert}
      </div>
    );
  }
}
