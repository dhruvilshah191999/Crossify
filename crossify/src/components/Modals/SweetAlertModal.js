import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      question: null,
    };
  }

  hideAlert = () => {
    console.log("Hiding alert...");
    this.setState({
      alert: null,
    });
  };

  onRecieveInput = (inputValue) => {
    inputValue = inputValue.trim();
    this.setState({
      alert: null,
      question: inputValue,
    });
  };

  deleteThisGoal() {
    const getAlert = () => (
      <SweetAlert
        input
        showCancel
        confirmBtnText="Submit"
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        confirmBtnBsStyle="primary"
        title="Ask Question"
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
        placeHolder="Write something"
        onConfirm={this.onRecieveInput}
        onCancel={this.hideAlert}
      >
        Write the questions you have:
      </SweetAlert>
      //   <SweetAlert success title="Woot!" onConfirm={() => this.hideAlert()}>
      //     Hello world!
      //   </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  }
  render() {
    return (
      <div className="sweet-alert-container">
        <button
          onClick={() => this.deleteThisGoal()}
          className="font-semibold border shadow hover:bg-lightbeta focus:outline-none border-beta hover:border-beta text-white text-sm px-4 py-1 rounded bg-beta"
        >
          <i class="fas fa-user-plus"></i> Ask
        </button>

        {this.state.alert}
      </div>
    );
  }
}

// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import swal from "sweetalert";

// const DEFAULT_INPUT_TEXT = "Thating";

// export default class MyInput extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       text: DEFAULT_INPUT_TEXT,
//     };
//   }

//   changeText(e) {
//     let text = e.target.value;

//     this.setState({
//       text,
//     });

//     /*
//      * This will update the value that the confirm
//      * button resolves to:
//      */
//     swal.setActionValue(text);
//   }

//   render() {
//     return (
//       <input value={this.state.text} onChange={this.changeText.bind(this)} />
//     );
//   }
// }

// // We want to retrieve MyInput as a pure DOM node:
// let wrapper = document.createElement("div");
// ReactDOM.render(<MyInput />, wrapper);
// let el = wrapper.firstChild;

// swal({
//   text: "Write something here:",
//   content: el,
//   buttons: {
//     confirm: {
//       /*
//        * We need to initialize the value of the button to
//        * an empty string instead of "true":
//        */
//       value: DEFAULT_INPUT_TEXT,
//     },
//   },
// }).then((value) => {
//   swal(`You typed: ${value}`);
// });
