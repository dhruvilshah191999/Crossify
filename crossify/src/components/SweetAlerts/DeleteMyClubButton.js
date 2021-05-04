import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

export default class DeleteMyClub extends Component {
  state = { alert: null };
  deleteAccount() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        //   danger
        input
        showCancel
        confirmBtnText="Delete Club"
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
        Deleting your club will remove all of club information from our database
        regarding documents/Chats/Photos. This cannot be undone.
        <br />
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

  removeThisUser(answer) {
    if (answer !== "DELETE") {
      return;
    }
    //TODO HERE GRAB THE ID OF USER AND DO DELETE QUERY
  }
  render() {
    return (
      <>
        <button
          className="text-red-500 font-semibold mb-4 text-sm"
          onClick={() => this.deleteAccount()}
        >
          Delete this Club <i class="fas fa-chevron-right text-xs"></i>
        </button>

        {this.state.alert}
      </>
    );
  }
}
