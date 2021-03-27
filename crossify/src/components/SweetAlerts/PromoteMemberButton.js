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
        <button
          className="text-lg mr-2 "
          type="button"
          onClick={() => this.confirmArrival()}
        >
          <i class="fas fa-chess-rook text-green-500 text-lg focus:outline-none"></i>
        </button>

        {this.state.alert}
      </div>
    );
  }
}
