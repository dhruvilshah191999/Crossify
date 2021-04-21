import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      question: null,
      answer: null,
      event_id: null,
    };
  }
  componentDidMount() {
    this.setState({
      question: this.props.question,
      event_id: this.props.event_id,
    });
  }
  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };
  onRecievedInput = async () => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      event_id: this.state.event_id,
      question: this.state.question,
      answer: this.state.answer,
    };
    const finaldata = await axios.post("/api/manage/answer", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
  };
  confirmProcess = () => {
    this.props.handleRejection();
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
        customClass="text-black"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-blue-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        title="Edit Answer/Question"
        onConfirm={this.onRecievedInput}
        onCancel={this.hideAlert}
        type={"controlled"}
        dependencies={[this.state.question]}
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
                    Question
                  </label>
                  <textarea
                    rows="4"
                    type="text"
                    className="bg-gray-100 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={this.state.question}
                    onChange={(e) => {
                      this.setState({ question: e.target.value });
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Answer
                  </label>
                  <textarea
                    rows="4"
                    className="bg-gray-100 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={this.state.answer}
                    onChange={(e) => {
                      this.setState({ answer: e.target.value });
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
        <button title="Arrived" onClick={() => this.confirmArrival()}>
          <i className="fas fa-edit text-blue-500 text-lg focus:outline-none"></i>
        </button>

        {this.state.alert}
      </>
    );
  }
}
