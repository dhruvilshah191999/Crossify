import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import demobg from "assets/img/demopf.png";
import Tag from "components/Tag";
import MapContainer from "../../components/Maps/MapCode";
import AskQuestion from "components/Modals/AskQuestion";
import ChatMessage from "components/Cards/ChatMessage";
import EvaulateProfile from "components/Cards/EvaulateProfile";

Modal.defaultStyles = {};

// const Tag = (props) => <span className="tag" {...props} />;
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
          <EvaulateProfile />
        </div>
        <div className="flex items-center justify-end py-2 mb-2 ">
          <button
            className="bg-green-500 text-white active:bg-green-600 mr-2 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
            type="button"
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
            type="button"
          >
            Reject
          </button>
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={ModalManager.close}
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }
}

MyModal.defaultProps = {
  event_name: "Cricket Tournament",
  categories: ["Sports", "Fitness"],
  place: "B-45 AUDA Gardern , R.C. Technical Road ",
  city: "Ahmedabad",
  state: "Gujarat",
  eligibility:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose",
  description:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose",
  starting_date: "12 Feb 2021",
  ending_date: "20 Feb 2021",
  starting_time: "12:00 AM IST",
  ending_time: "20:00 AM IST",
  capacity: 80,
  last_reg_date: "8 Feb 2021",
  photo: demobg,
  tags: ["NightLife", "Tournament", "Competition", "Cricket", "Sports"],
  hostedBy: "Harshil Patel",
  qanda: [
    {
      question: "What special about this one ?",
      answer: "Nothing ! bro we are same.",
    },
    {
      question: "Do they provide drinks and kits?",
      answer:
        "Yes , everything will be available if you want to play with your equipement then you can play with it otherwise most of the things will be available.",
    },
  ],

  chats: [
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: false,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: true,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: false,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: true,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: false,
    },
    {
      msg:
        "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: true,
    },
  ],
};

export default MyModal;
