import UploadPic from "components/Inputs/UploadPic";
import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      file: null,
      description: null,
    };
  }
  componentDidMount() {
    this.setState({
      file: this.props.file,
      description: this.props.description,
    });
  }
  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };
  onRecievedInput = () => {
    const updatedQ = this.state.file;
    const updatedA = this.state.description;
    //todo GOLU we have file and description in state you just make any axios request to update the current value
    this.setState({
      alert: null,
      file: null,
      description: null,
    });
  };
  confirmProcess = () => {
    this.props.handleRejection();
    this.setState({ alert: null });
  };
  confirmArrival() {
    const getAlert = () => (
      <SweetAlert
        success
        showCancel
        confirmBtnText="Update"
        confirmBtnBsStyle="success"
        title="Are you sure?"
        focusCancelBtn
        customClass="w-800px"
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-blue-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        title="Edit Media"
        onConfirm={this.onRecievedInput}
        onCancel={this.hideAlert}
        type={"controlled"}
        dependencies={[this.state.file, this.state.description]}
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
                    Media
                  </label>
                  <UploadPic></UploadPic>
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
          <i class="fas fa-edit text-blue-500 text-lg focus:outline-none mr-4 "></i>
        </button>

        {this.state.alert}
      </>
    );
  }
}
