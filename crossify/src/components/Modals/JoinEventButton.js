import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      question: null,
      isRegistered: false,
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

  onJoining = () => {
    this.setState({ alert: null, isRegistered: true });
  };
  removeThisMember = () => {
    //do all the query to remove the user from event
    this.setState({ alert: null, isRegistered: false });
  };
  successJoined() {
    const getAlert = () => (
      <SweetAlert
        success
        title="Woot!"
        confirmBtnText="Got It !"
        confirmBtnCssClass="text-base rounded px-4 px-2 overwrite-success-btn"
        confirmBtnStyle={{ backgroundColor: "##28a745" }}
        onConfirm={this.onJoining}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You successfully registered for the Event.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  removeRegisteration() {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, Remove me!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        // onConfirm={this.deleteFile}
        // onCancel={this.onCancel}
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.removeThisMember}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are cancling your registeration
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }
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
      <div className="w-full">
        {this.state.isRegistered ? (
          <button
            className=" w-full h-12 hover:text-alpha hover:bg-white shadow border border-solid  bg-lightalpha  text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => this.removeRegisteration()}
          >
            <i class="fas fa-file-signature"></i> Joined
          </button>
        ) : (
          <button
            className="w-full h-12 hover:text-alpha hover:bg-white shadow border border-solid  bg-alpha text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => this.successJoined()}
          >
            <i class="fas fa-user-plus "></i> Attend
          </button>
        )}

        {this.state.alert}
      </div>
    );
  }
}

{
  /* <button
                  className=" w-full h-12 hover:text-alpha hover:bg-white shadow border border-solid  bg-alpha text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i class="fas fa-user-plus "></i> Attend
                </button> */
}
{
  /* */
}
{
  /* <button
                  className=" w-full h-12 hover:text-alpha hover:bg-white shadow border border-solid  bg-lightalpha  text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i class="fas fa-file-signature"></i> Joined
                </button> */
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
