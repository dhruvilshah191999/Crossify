import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import demopf from "assets/img/demopf.png";
import ChatMessage from "components/Cards/ChatMessage";

Modal.defaultStyles = {};

var customModalStyles = {
  content: {
    width: "50%",
    marginTop: "20px",
    transform: "translate(-50%, -50%)",
    height: "550px", // <-- This sets the height
    overlfow: "scroll", // <-- This tells the modal to scrol
  },
};

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

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
            Report by{" "}
            <span className="font-semibold">
              {this.state.data.user_data[0].fname}{" "}
              {this.state.data.user_data[0].lname}
            </span>
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
          <div
            className="overflow-y"
            style={{ maxHeight: 320, overflowY: "scroll" }}
          >
            {this.state.data.reports.map((el) => (
              <ChatMessage
                message={el.report}
                time={el.date}
                username={this.state.data.user_data[0]}
                profilePic={this.state.data.user_data[0].profile_photo}
              />
            ))}
          </div>
          <form>
            <div className="flex items-center mt-4">
              <div className=" font-bold text-sm p-2 absolute right-0 left-0 bottom-0 inline-flex justify-between items-center">
                <div className=" bg-white rounded-lg flex w-full p-2">
                  <div className="w-3/4 ml-2">
                    <textarea
                      rows="3"
                      placeholder="Describe your actions/fixes"
                      className="px-3 py-3  placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  <div className="w-1/4">
                    <div className="flex flex-col w-full">
                      <button
                        className="bg-green-500 text-white active:bg-green-600 mx-4 mb-2 mt-1 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send
                      </button>
                      <button
                        className="bg-red-500 text-white active:bg-green-600 mx-4 mt-1 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                        type="button"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

MyModal.defaultProps = {
  chats: [
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demopf,
      isManager: false,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demopf,
      isManager: true,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demopf,
      isManager: false,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demopf,
      isManager: true,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demopf,
      isManager: false,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demopf,
      isManager: true,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demopf,
      isManager: false,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demopf,
      isManager: true,
    },
  ],
};

export default MyModal;
