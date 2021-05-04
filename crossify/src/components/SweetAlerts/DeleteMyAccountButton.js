import React, { Component } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

export default class DeleteMyAccount extends Component {
  state = { alert: null };
  deleteAccount() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        //   danger
        input
        showCancel
        confirmBtnText="Delete Account"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        // onConfirm={this.deleteFile}
        // onCancel={this.onCancel}
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.removeThisUser}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        Deleting your account will remove all of your information from our
        database. This cannot be undone. <br />
        <strong> Write 'DELETE' to proceed. </strong>
      </SweetAlert>
    );
    console.log(getAlert());
    this.setState({
      alert: getAlert(),
    });
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  removeThisUser=async(answer)=> {
    if (answer !== "DELETE") {
      return;
    }
    else {
      const token = localStorage.getItem("jwt");
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        token,
      };
      const finaldata = await axios.post(
        "/api/deleteuser",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        window.localStorage.removeItem("jwt");
        window.location.replace("/");
      }
    }
  }
  render() {
    return (
      <>
        <button
          className="text-red-500 font-semibold"
          onClick={() => this.deleteAccount()}
        >
          Deactivate your account <i class="fas fa-chevron-right text-xs"></i>
        </button>

        {this.state.alert}
      </>
    );
  }
}
