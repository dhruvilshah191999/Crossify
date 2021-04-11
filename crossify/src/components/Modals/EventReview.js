import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import axios from "axios";
import Moment from "moment";
import { withRouter } from "react-router-dom";
import demobg from "assets/img/demopf.png";
import Tag from "components/Tag";
import MapContainer from "components/Maps/ViewOnlyMap";
import AskQuestion from "components/SweetAlerts/AskQuestion";
import ChatMessage from "components/Cards/ChatMessage";

Modal.defaultStyles = {};

var customModalStyles = {
  content: {
    width: "70%",
    marginTop: "20px",
    transform: "translate(-50%, -50%)",
    height: "570px", // <-- This sets the height
    overlfow: "scroll", // <-- This tells the modal to scrol
  },
};

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      event_data: this.props.eventData,
      loading: false,
      description:null,
    };
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: true });
    }, 100);
    // const config = {
    //    method: "POST",
    //    header: {
    //      "Content-Type": "application/json",
    //    },
    //    validateStatus: () => true,
    //  };
    //  var send_data = {
    //    event_id: this.state.event_id,
    //  };
    //  const finaldata = await axios.post(
    //    "/api/admin/getEvent",
    //    send_data,
    //    config
    //  );
    //  if (finaldata.data.is_error) {
    //    console.log(finaldata.data.message);
    //  } else {
    //    this.setState({ event_data: finaldata.data.data });
       
    //  }
  }

  handleUpdateTags = (tags) => {
    this.setState({ tags });
  };

  AcceptEvent = async () => {
    const config = {
       method: "POST",
       header: {
         "Content-Type": "application/json",
       },
       validateStatus: () => true,
     };
     var send_data = {
       event_id: this.state.event_data._id,
     };
     const finaldata = await axios.post(
       "/api/admin/acceptEvent",
       send_data,
       config
     );
     if (finaldata.data.is_error) {
       console.log(finaldata.data.message);
     } else {
       window.location.reload();
     }
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
            <h3 className="text-2xl font-semibold">Event Review</h3>
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
            <form>
              <div className="flex flex-col ">
                <div className="mb-4">
                  <img
                    alt="eventPic"
                    src={this.state.event_data.photo}
                    className=" rounded-lg "
                  />
                </div>
                <div className="text-lg mb-2 text-alpha">Basic Infomation</div>
                <hr></hr>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  ">Event Name</div>
                  <div className="text-gray-700  ">
                    {" "}
                    {this.state.event_data.event_name}
                  </div>
                </div>

                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  ">Total Spots </div>
                  <div className="text-gray-700  ">
                    {" "}
                    {this.state.event_data.maximum_participants}
                  </div>
                </div>

                <div className="text-lg text-alpha my-4">Time and Place</div>
                <hr></hr>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  ">
                    Starting Date & Time
                  </div>
                  <div className="text-gray-700">
                    {" "}
                    {Moment(this.state.event_data.startdate).format(
                      "DD MMMM YYYY, h:mm A"
                    )}
                  </div>
                </div>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  ">
                    Ending Date & Time{" "}
                  </div>
                  <div className="text-gray-700  ">
                    {" "}
                    {Moment(this.state.event_data.date).format(
                      "DD MMMM YYYY, h:mm A"
                    )}
                  </div>
                </div>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  ">
                    Last Registeration{" "}
                  </div>
                  <div className="text-gray-700  ">
                    {" "}
                    {Moment(
                      this.state.event_data.ending_date_registration
                    ).format("DD MMMM YYYY")}
                  </div>
                </div>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  ">Location </div>
                  <div className="text-gray-700  ">
                    {" "}
                    {this.state.event_data.location}
                  </div>
                </div>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  ">City </div>
                  <div className="text-gray-700  ">
                    {" "}
                    {this.state.event_data.city}
                  </div>
                </div>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  ">State </div>
                  <div className="text-gray-700  ">
                    {" "}
                    {this.state.event_data.state}
                  </div>
                </div>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  ">Map </div>
                  <div className="text-gray-700 w-3/4 ">
                    {this.state.loading ? (
                      <MapContainer data={this.state.event_data}></MapContainer>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="text-lg text-alpha my-4">Event Details</div>
                <hr></hr>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold flex-shrink-0 ">
                    Eligibility{" "}
                  </div>
                  <div className="text-gray-700  ">
                    {" "}
                    {this.state.event_data.eligibility}
                  </div>
                </div>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  flex-shrink-0 ">
                    Description{" "}
                  </div>
                  <div className="text-gray-700  ">
                    {" "}
                    {this.state.event_data.description}
                  </div>
                </div>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  "> Tags </div>
                  <div className="text-gray-700  ">
                    {" "}
                    {this.state.loading
                      ? this.state.event_data.tags.map((el) => (
                          <Tag data={el}></Tag>
                        ))
                      : ""}
                  </div>
                </div>
                <div className="flex w-full">
                  <div className="text-lg text-alpha my-4">
                    Frequently Asked Question
                  </div>
                </div>
                <hr></hr>

                {this.state.loading
                  ? this.state.event_data.faq.map((el, index) =>
                      el.privacy === "public" && el.status === "answered" ? (
                        <>
                          <div className="flex w-full ml-4 px-4 py-2">
                            <div className="w-1/4 font-semibold flex-shrink-0 ">
                              Q {index})
                            </div>
                            <div className="font-semibold"> {el.question}</div>
                          </div>
                          <div className="flex w-full ml-4 px-4 py-2">
                            <div className="w-1/4 font-semibold flex-shrink-0 ">
                              A {index})
                            </div>
                            <div className="text-gray-700  "> {el.answer}</div>
                          </div>
                        </>
                      ) : (
                        ""
                      )
                    )
                  : ""}

                <div className="text-lg text-alpha my-4">Feedback</div>
                <hr></hr>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  "> Review </div>
                  <div className="text-gray-700 w-3/4 ">
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
                    <form>
                      <div className="flex items-center mt-4"></div>
                    </form>
                    <textarea
                      rows="4"
                      placeholder="Give proper feedback to this request explaining the decision you are taking and any improvement required from the organization side"
                      className="px-3 py-3 w-full placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      defaultValue={this.state.description}
                      onChange={(e) => {
                        this.setState({ description: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  className="bg-green-500 text-white active:bg-green-600 mr-2 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                  type="button"
                  onClick={this.AcceptEvent}
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
            </form>
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
