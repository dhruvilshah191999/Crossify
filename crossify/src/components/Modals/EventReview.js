import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import axios from "axios";
import Moment from "moment";
import demobg from "assets/img/demopf.png";
import Tag from "components/Tag";
import MapContainer from "components/Maps/ViewOnlyMap";
import ChatMessage from "components/Cards/ChatMessage";
import urlObject from "../../config/default.json";
import io from "socket.io-client";
var BackendURL = urlObject.BackendURL;
let socket = io(BackendURL, {
  transport: ["websocket"],
});
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
      message: [],
      loading: false,
      description: null,
      clubId: this.props.club_id,
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
      event_id: this.state.event_data._id,
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
    setTimeout(() => {
      this.setState({ loading: true });
    }, 100);
  }

  handleUpdateTags = (tags) => {
    this.setState({ tags });
  };

  AcceptEvent = async () => {
    const token = localStorage.getItem("jwt");
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const user = await axios.post("/api/profile/get-user", { token }, config);
    var firstName = user.data.data.fname;
    var profile_photo = user.data.data.profile_photo;
    var eventData = this.state.event_data;
    var userId = eventData.oragnizer_id;
    var club_id = this.state.clubId;
    var club = await axios.post("/api/events/getclub", { club_id }, config);
    var clubName = club.data.data.club_name;
    var eventName = this.state.event_data.event_name;
    var des = ` Your Request of Event ${eventName} in  ${clubName} club has been accepted by ${firstName}, BTW we need a pass 😉`;
    socket.emit("sendNotification", {
      date: new Date(),
      description: des,
      title: "Congratulations! your event just got approval🥳",
      profile_photo: profile_photo,
      user_id: userId,
      target_id: this.state.event_data._id,
      target_val: "event",
    });
    var send_data = {
      event_id: this.state.event_data._id,
      user_id: userId,
      token: token,
      profile_photo: profile_photo,
      description: des,
      target_id: this.state.event_data._id,
      target_val: "event",
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
  };

  RejectedEvent = async () => {
    //it is not working properly because need to add description property
    const token = localStorage.getItem("jwt");
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const user = await axios.post("/api/profile/get-user", { token }, config);
    var desC = this.state.description;
    var firstName = user.data.data.fname;
    var profile_photo = user.data.data.profile_photo;
    var club_id = this.state.clubId;
    var club = await axios.post("/api/events/getclub", { club_id }, config);
    var clubName = club.data.data.club_name;
    var userId = this.state.event_data.oragnizer_id;
    var eventName = this.state.event_data.event_name;
    var des = ` Your Request of Event ${eventName} in  ${clubName} club has been rejected by ${firstName}, Bring Something more interesting next time 😊`;
    socket.emit("sendNotification", {
      date: new Date(),
      description: des + desC,
      title: "alas! your event just got rejected ☹️",
      profile_photo: profile_photo,
      user_id: userId,
      target_id: club_id,
      target_val: "club",
    });

    var send_data = {
      event_id: this.state.event_data._id,
      user_id: userId,
      token: token,
      profile_photo: profile_photo,
      description: des,
      feed: desC,
      target_id: club_id,
      target_val: "club",
    };
    const finaldata = await axios.post(
      "/api/admin/rejectedEvent",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
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
                <div className="w-1/4 font-semibold  ">Ending Date & Time </div>
                <div className="text-gray-700  ">
                  {" "}
                  {Moment(this.state.event_data.date).format(
                    "DD MMMM YYYY, h:mm A"
                  )}
                </div>
              </div>
              <div className="flex w-full ml-4 px-4 py-2">
                <div className="w-1/4 font-semibold  ">Last Registeration </div>
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
                    ? this.state.event_data.tags.map((el, index) => (
                        <Tag data={el} key={index}></Tag>
                      ))
                    : ""}
                </div>
              </div>
              <div className="flex w-full">
                <div className="text-lg text-alpha my-4">
                  Frequently Asked Question
                </div>
              </div>

              {this.state.loading
                ? this.state.event_data.faq.map((el, index) =>
                    el.privacy === "public" && el.status === "answered" ? (
                      <>
                        <hr></hr>
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

              <div className={"text-lg text-alpha my-4"}>Feedback</div>
              <div className={""}>
                <hr></hr>
                <div className="flex w-full ml-4 px-4 py-2">
                  <div className="w-1/4 font-semibold  "> Review </div>
                  <div className="text-gray-700 w-3/4 ">
                    <div
                      className="overflow-y"
                      style={{ maxHeight: 320, overflowY: "scroll" }}
                    >
                      {this.state.message.map((el, index) => (
                        <ChatMessage
                          message={el.message}
                          time={el.date}
                          username={el.name}
                          profilePic={el.image}
                          key={index}
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
                onClick={this.RejectedEvent}
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
      msg: "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: false,
    },
    {
      msg: "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: true,
    },
    {
      msg: "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: false,
    },
    {
      msg: "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: true,
    },
    {
      msg: "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: false,
    },
    {
      msg: "This Event is not apporiate in COVID situation so kindly take proper action.",
      time: "12:00 PM , 12 Feb 2021",
      owner: "Harshil Patel",
      photo: demobg,
      isManager: true,
    },
  ],
};

export default MyModal;
