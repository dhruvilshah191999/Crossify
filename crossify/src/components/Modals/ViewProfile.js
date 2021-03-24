import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import MultiSelect from "../Forms/MultiSelect";
import MapContainer from "../Maps/MapCode";
import UploadPic from "components/Inputs/UploadPic";

import { InputTagsContainer } from "react-input-tags";
import Profile from "views/profile/MyProfile";
import ProfileDetails from "components/Cards/ProfileDetails";

Modal.defaultStyles = {};

const Tag = (props) => <span className="tag" {...props} />;
const Delete = (props) => <button className="delete" {...props} />;
const Help = (props) => <span className="help" {...props} />;

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
  state = {
    tags: [],
  };

  handleUpdateTags = (tags) => {
    this.setState({ tags });
  };
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
            View Profile of <span className="font-semibold">hackershil</span>
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
          <ProfileDetails />
        </div>
      </Modal>
    );
  }
}

export default MyModal;
