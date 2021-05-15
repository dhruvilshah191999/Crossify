import React, { Component } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

export default class DeleteMyEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      event_id: this.props.event_id,
    };
  }
  deleteAccount() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        //   danger
        input
        showCancel
        confirmBtnText="Delete Event"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.removeThisEvent}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        <span className="text-base font-normal text-gray-800">
          Deleting your event will remove all registrations and other related
          infomation from the database.
        </span>{" "}
        <br />
        <strong className="mt-2"> Write 'DELETE' to proceed. </strong>
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

  removeThisEvent=async (answer)=> {
    this.setState({
      alert: null,
    });
    if (answer !== "DELETE") {
      return;
    }
    else {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        event_id:this.state.event_id
      };
      const finaldata = await axios.post(
        "/api/events/deleteevent",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        window.location.replace("/");
      }
    }
  }
  render() {
    return (
      <>
        <button
          className="text-red-500 font-semibold mr-1"
          onClick={() => this.deleteAccount()}
        >
          Cancel This Event <i class="fas fa-chevron-right text-xs"></i>
        </button>

        {this.state.alert}
      </>
    );
  }
}
