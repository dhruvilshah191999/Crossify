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
    height: "500px", // <-- This sets the height
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
          <h3 className="text-xl">
            Status of EventName{" "}
            {/* <span className="text-xl text-orange-500 mx-2 mr-2 font-semibold">
              Pending
            </span> */}
            <span className="text-xl text-red-500 mx-2 mr-2 font-semibold">
              Rejected
            </span>
            {/* <span className="text-xl text-green-500 mx-2 mr-2 font-semibold">
              Apporved
            </span> */}
            {/* if pending then donot show evaluated by segment (after evaulation show that thing to inform the Manager) */}
            evaluated by
            <span className="font-semibold ml-2">ModeratorName</span>
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
        <div className="px-6 py-4">
          <div
            className="overflow-y"
            style={{ maxHeight: 320, overflowY: "scroll" }}
          >
            {this.props.chats.map((el) => (
              <ChatMessage
                message={el.msg}
                time={el.time}
                username={el.owner}
                profilePic={el.photo}
              />
            ))}
          </div>
        </div>
        <form>
          <div className="flex items-center ">
            <div className=" font-bold text-sm p-2 absolute right-0 left-0 bottom-0 inline-flex justify-between items-center">
              <div className=" bg-gray-200 rounded-lg flex w-full p-1">
                <div className="w-full">
                  <input
                    type="text"
                    className="p-4 ml-2 w-full bg-gray-200 rounded-lg focus:rounded-lg"
                    id="exampleInputPassword1"
                    placeholder="type your message here"
                  ></input>
                </div>
                <div>
                  <button type="button" className="p-4 ml-auto mr-2 ">
                    <i className="far fa-paper-plane text-xl text-gray-700"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
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
  ],
};

export default MyModal;
