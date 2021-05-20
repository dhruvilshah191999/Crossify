import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import axios from "axios";
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
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      message: [],
      event_id: this.props.event_id,
      event_name: this.props.event_name,
      description: null,
    };
  }

  async componentDidMount() {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    var send_data = {
      event_id: this.state.event_id,
    };
    const finaldata = await axios.post(
      "/api/admin/getRejectedMessage",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({ message: finaldata.data.data });
    }
  }

  RejectedEvent = async () => {
    const token = localStorage.getItem("jwt");
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    var send_data = {
      event_id: this.state.event_id,
      description: this.state.description,
      token,
    };
    const finaldata = await axios.post(
      "/api/admin/addMessage",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
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
            Status of {this.state.event_name}{" "}
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
            {/* evaluated by
            <span className="font-semibold ml-2">ModeratorName</span>
            {this.props.username} */}
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
            {this.state.message.map((el) => (
              <ChatMessage
                message={el.message}
                time={el.date}
                username={el.name}
                profilePic={el.image}
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
                    defaultValue={this.state.description}
                    onChange={(e) => {
                      this.setState({ description: e.target.value });
                    }}
                  ></input>
                </div>
                <div>
                  <button
                    type="button"
                    className="p-4 ml-auto mr-2 "
                    onClick={this.RejectedEvent}
                  >
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
export default MyModal;
