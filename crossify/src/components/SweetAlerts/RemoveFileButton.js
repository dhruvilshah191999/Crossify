import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      club_id: this.props.club_id,
      link: this.props.link,
    };
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  confirmProcess = async () => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      club_id: this.state.club_id,
      link: this.state.link,
    };
    const finaldata = await axios.post("/api/admin/DeleteFile", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
  };

  confirmArrival() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        danger
        showCancel
        confirmBtnText="Remove"
        confirmBtnBsStyle="danger"
        title="Do you want to remove  ?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-2 py-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.confirmProcess}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are removing the file from shared directory.
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
          className="text-red-500  text-lg  "
          type="button"
          onClick={() => this.confirmArrival()}
        >
          <i class="fas fa-trash-alt  "></i>
        </button>

        {this.state.alert}
      </div>
    );
  }
}
