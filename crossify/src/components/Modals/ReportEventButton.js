import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { store } from "react-notifications-component";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      complain: null,
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
      complain: inputValue,
    });
    //todo GOLU process the this thing and if succecess run this
    store.addNotification({
      title: "Event Reported  !",
      message: "Event Owner and Club Moderator can see your complain",
      type: "danger",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        // onScreen: true,
      },
    });
  };

  reportThisEvent() {
    const getAlert = () => (
      <SweetAlert
        input
        showCancel
        confirmBtnText="Report"
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        confirmBtnBsStyle="primary"
        title="Report the Event"
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
        placeHolder="Write something"
        onConfirm={this.onRecieveInput}
        onCancel={this.hideAlert}
      >
        Explain reason for Report :
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  }
  render() {
    return (
      <div className="sweet-alert-container inline-block">
        <button
          className="ml-2"
          title="Report this Event"
          onClick={() => this.reportThisEvent()}
        >
          <i className="fas fa-flag text-sm text-gray-500" />
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
