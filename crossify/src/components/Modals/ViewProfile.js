import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";

import MemberProfileDetails from "components/Cards/MemberProfileDetails";

Modal.defaultStyles = {};

var customModalStyles = {
  content: {
    width: "70%",
    marginTop: "20px",
    transform: "translate(-50%, -50%)",
    height: "600px", // <-- This sets the height
    overlfow: "scroll", // <-- This tells the modal to scrol
  },
};

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      user_id:this.props.user_id
    };
  }
  render() {
    const { onRequestClose } = this.props;

    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.RotateFromBottom3D}
        style={customModalStyles}
      >
        <div className="flex items-start justify-between p-5 ml-1 border-b border-solid bg-gray-600 border-gray-300 rounded-t">
          <h3 className="text-2xl">
            View Profile of{" "}
            <span className="font-semibold">{this.state.name}</span>
            {/* {this.props.username} */}
          </h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={ModalManager.close}
          >
            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        <div className="px-6 py-4 ">
          <MemberProfileDetails user_id={ this.state.user_id}/>
        </div>
      </Modal>
    );
  }
}

export default MyModal;
