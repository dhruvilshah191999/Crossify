import React, { Component } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

export default class MakeCreatorButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      club_id: this.props.club_id,
    };
  }

  giveUpThrone() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        input
        showCancel
        confirmBtnText="Resign As Creator"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.resignAndPromote}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        Your will be no longer hold the position of creator & all the extra
        privileges will be given to 'Selected' Modertor and your will serve as
        Moderator.
        <br />
        <strong> Write 'I FULLY RESIGN' to proceed. </strong>
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  resignAndPromote = async (answer) => {
    if (answer !== "I FULLY RESIGN") {
      return;
    } else {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        club_id: this.state.club_id,
      };
      const finaldata = await axios.post(
        "/api/club/YOURAPINAME",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        window.location.replace("/");
      }
    }
  };
  render() {
    return (
      <>
        <button
          className="text-red-500 font-semibold mb-4 text-sm"
          onClick={() => this.giveUpThrone()}
        >
          Delete this Club <i class="fas fa-chevron-right text-xs"></i>
        </button>

        {this.state.alert}
      </>
    );
  }
}
