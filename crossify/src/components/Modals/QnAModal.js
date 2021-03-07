import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      question: null,
      answer: null,
    };
  }
  componentDidMount() {
    this.setState({ question: this.props.question, answer: this.props.answer });
  }
  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };
  onRecievedInput = () => {
    const updatedQ = this.state.question;
    const updatedA = this.state.answer;
    //todo GOLU we have question and answer in state you just make any axios request to update the current value
    this.setState({
      alert: null,
      question: null,
      answer: null,
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
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-green-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        title="Edit Answer/Question"
        onConfirm={this.onRecievedInput}
        onCancel={this.hideAlert}
        type={"controlled"}
        dependencies={[this.state.question, this.state.answer]}
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
          <i class="fas fa-edit text-green-500 text-lg focus:outline-none"></i>
        </button>

        {this.state.alert}
      </>
    );
  }
}
