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
    this.props.demoteMember();
    this.setState({ alert: null });
  };
  confirmArrival() {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Demote"
        confirmBtnBsStyle="warning"
        title="Do you want to Demote?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-2 py-2 bg-orange-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.confirmProcess}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are demoting Moderator {this.props.name} to Member.
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
          className=" text-lg mr-2 "
          type="button"
          onClick={() => this.confirmArrival()}
        >
          <i class="fas fa-level-down-alt text-orange-500 text-lg"></i>
        </button>

        {this.state.alert}
      </div>
    );
  }
}
