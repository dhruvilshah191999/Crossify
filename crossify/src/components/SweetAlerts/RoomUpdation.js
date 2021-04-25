import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      name: this.props.name,
      description: this.props.description,
      readable: this.props.readable ? "Member" : "Moderator",
      writable: this.props.writable ? "Member" : "Moderator",
      id: this.props.id,
    };
  }
  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  onRecievedInput = async () => {
    this.props.parentCallback(true);
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      channel_id: this.state.id,
      name: this.state.name,
      readable: this.state.readable,
      writable: this.state.writable,
      description: this.state.description,
    };
    const finaldata = await axios.post(
      "/api/admin/Updatechannel",
      object,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({ alert: null });
      window.location.reload();
    }
  };

  confirmProcess = () => {
    this.props.updateRoom();
    this.setState({ alert: null });
  };
  confirmArrival() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        success
        showCancel
        confirmBtnText="Update"
        confirmBtnBsStyle="success"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-blue-500 "
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        title="Update Room Info"
        onConfirm={this.onRecievedInput}
        onCancel={this.hideAlert}
        type={"controlled"}
        dependencies={[
          this.state.name,
          this.state.readable,
          this.state.writable,
          this.state.description,
        ]}
      >
        <div>
          <form>
            <div className="flex flex-wrap ">
              <div className="w-full  px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    name
                  </label>
                  <input
                    type="name"
                    className="bg-gray-100 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={this.state.name}
                    onChange={(e) => {
                      this.setState({ name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="w-full  px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Readable
                  </label>
                  <select
                    className="bg-gray-100 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={this.state.readable}
                    onChange={(e) => {
                      this.setState({ readable: e.target.value });
                    }}
                  >
                    <option value="Member">All</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                </div>
              </div>
              <div className="w-full  px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Writable
                  </label>
                  <select
                    className="bg-gray-100 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={this.state.writable}
                    onChange={(e) => {
                      this.setState({ writable: e.target.value });
                    }}
                  >
                    <option value="Member">All</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="bg-gray-100 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={this.state.description}
                    onChange={(e) => {
                      this.setState({ description: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  render() {
    return (
      <>
        <button title="Edit" onClick={() => this.confirmArrival()}>
          <i className="fas fa-edit text-blue-500 text-lg focus:outline-none mr-4 "></i>
        </button>

        {this.state.alert}
      </>
    );
  }
}
