import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import MultiSelect from "../Forms/MultiSelect";
import MapContainer from "../../components/Maps/MapCode";
import "./style.css";
import { InputTagsContainer } from "react-input-tags";
import TagsInput from "components/Inputs/TagsInput";
Modal.defaultStyles = {};

const Tag = (props) => <span className="tag" {...props} />;
const Delete = (props) => <button className="delete" {...props} />;
const Help = (props) => <span className="help" {...props} />;

var customModalStyles = {
  content: {
    width: "70%",
    marginTop: "20px",
    transform: "translate(-50%, -50%)",
    height: "650px", // <-- This sets the height
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
          <h3 className="text-2xl font-semibold">Apply for a Event</h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={ModalManager.close}
          >
            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        <div className="px-6 py-4 bg-gray-200">
          <form>
            <div className="flex flex-col">
              <div className="mb-3 pt-0">
                <label className="ml-1"> Event Name</label>
                <input
                  type="text"
                  placeholder="Event Name"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                />
              </div>
              <div className="mb-3 pt-0">
                <label className="ml-1"> Categories</label>
                <MultiSelect></MultiSelect>
              </div>
              <div className="mb-3 pt-0">
                <label className="ml-1"> Location</label>
                <input
                  type="text"
                  placeholder="Event Name"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                />
              </div>
              <div className="w-full flex flex-row">
                <div className="mb-3 w-6/12 pt-0 mr-2 ">
                  <label className="ml-1"> State</label>
                  <input
                    type="text"
                    placeholder="Event Name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="mb-3 w-6/12 pt-0">
                  <label className="ml-1"> City</label>
                  <input
                    type="text"
                    placeholder="Event Name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="mb-3 pt-0">
                <label className="ml-1"> Eligibility</label>
                <textarea
                  rows="4"
                  placeholder="Event Name"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                />
              </div>
              <div className="mb-3 pt-0">
                <label className="ml-1"> Description</label>
                <textarea
                  rows="4"
                  placeholder="Event Name"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                />
              </div>

              <div className="w-full flex flex-row">
                <div className="mb-3 w-6/12 pt-0 mr-2 ">
                  <label className="ml-1"> Event Date</label>
                  <input
                    type="date"
                    placeholder="Event Name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="mb-3 w-6/12 pt-0  ">
                  <label className="ml-1"> Last Registeration Date</label>
                  <input
                    type="date"
                    placeholder="Event Name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="mb-3 pt-0">
                <label className="ml-1"> Photo</label>
                <input
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  type="file"
                />
              </div>
              <div className="mb-3 pt-0">
                <label className="ml-1"> Tags</label>
                <InputTagsContainer
                  tags={this.state.tags}
                  handleUpdateTags={this.handleUpdateTags}
                />
              </div>
              <div className="mb-3 pt-0">
                <label className="ml-1"> Maps</label>
                <div>
                  <MapContainer></MapContainer>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={ModalManager.close}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

export default MyModal;
