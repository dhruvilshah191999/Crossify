import React, { Component } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

export default class DeleteMyClub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      club_id: this.props.club_id,
    };
  }

  deleteClub() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        input
        showCancel
        confirmBtnText="Delete Club"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.removeThisClub}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        Deleting your club will remove all of club information from our database
        regarding documents/Chats/Photos. This cannot be undone.
        <br />
        <strong> Write 'DELETE' to proceed. </strong>
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

  removeThisClub = async (answer) => {
    this.setState({
      alert: null,
    });
    if (answer !== "DELETE") {
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
        "/api/club/deleteclub",
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
          onClick={() => this.deleteClub()}
        >
          Delete this Club <i class="fas fa-chevron-right text-xs"></i>
        </button>

        {this.state.alert}
      </>
    );
  }
}
