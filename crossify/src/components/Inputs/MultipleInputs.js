import React, { Component } from "react";

class MultipleInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: props.questions.length ? props.questions : [" "],
    };
  }
  addBelow = (index) => {
    var arr = this.state.questions;
    if (arr[arr.length - 1] === "") {
      return;
    }
    arr.splice(index + 1, 0, "");
    this.setState({ questions: arr });
  };
  removeCurrent = (index) => {
    if (this.state.questions.length === 1) {
      return;
    }
    var arr = this.state.questions;
    arr.splice(index, 1);
    this.setState({ questions: arr });
    this.props.parentCallback(arr);
  };
  updateValues = (value, index) => {
    var arr = this.state.questions;
    arr[index] = value;
    this.setState({
      questions: arr,
    });
    this.props.parentCallback(arr);
  };
  render() {
    return (
      <div className="w-full  px-4 mb-2">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Questions
          </label>
          {this.state.questions.map((el, index) => (
            <div className="flex mb-2 ">
              <input
                type="text"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                value={this.state.questions[index]}
                onChange={(e) => this.updateValues(e.target.value, index)}
              />
              <button
                className="p-2 ml-2"
                type="button"
                onClick={() => this.addBelow(index)}
              >
                <i className="fas fa-plus-square text-green-500 text-xl"></i>
              </button>
              <button
                className="p-2"
                type="button"
                onClick={() => this.removeCurrent(index)}
              >
                <i className="fas fa-minus-square text-red-500 text-xl"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MultipleInputs;

MultipleInputs.defaultProps = {
  questions: [""],
};
