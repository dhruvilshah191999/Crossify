import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      club_id: this.props.club_id,
      user_id:this.props.user_id,
      isModerator:this.props.isModerator
    };
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  confirmProcess =async () => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      club_id: this.state.club_id,
      user_id: this.state.user_id,
    };
    const finaldata = await axios.post("/api/admin/Promotion", object, config);
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
        {this.state.isModerator ? (
          <button
            className="text-lg mr-2 "
            type="button"
          >
            <i class="fas fa-chess-rook text-green-500 text-lg focus:outline-none"></i>
          </button>
        ) : (
          <button
            className="text-lg mr-2 "
            type="button"
            onClick={() => this.confirmArrival()}
          >
            <i class="fas fa-chess-rook text-green-500 text-lg focus:outline-none"></i>
          </button>
        )}
        {this.state.alert}
      </div>
    );
  }
}
