import React from "react";
import ChatMessage from "components/Cards/ChatMessage2.js";
import io from "socket.io-client";
import axios from "axios";

let socket = io("http://localhost:5000", {
  transport: ["websocket", "polling", "flashsocket"],
});

const token = localStorage.getItem("jwt");

export default class RoomTab extends React.Component {
  state = {
    currentTab: 0,
    rooms: [],
    isLoading: false,
    curRoomMsgs: [],
    database: [],
    messagetoSend: "",
  };
  messagesEndRef = React.createRef();

  componentDidMount = async () => {
    const { club_id } = this.props;

    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const allRoomsInfo = await axios.post(
      "/api/club/chat/getRooms",
      { club_id },
      config
    );

    const listOfChannels = allRoomsInfo.data.data.map((el) => el.channel_name);
    //first channel auto selected
    const msgs = allRoomsInfo.data.data[0].messages;

    socket.emit("join", { token, club_id }, (error) => {
      if (error) {
        alert(error);
      }
    });

    this.setState({
      rooms: listOfChannels,
      curRoomMsgs: msgs,
      database: allRoomsInfo.data,
    });
    this.scrollToBottom();
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  renderMsgs = () => {
    var msgs = this.state.curRoomMsgs;

    //appending photo and username from user_id
    msgs.map(async ({ user_id }, index) => {
      if (!msgs[index].username) {
        const config = {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          validateStatus: () => true,
        };
        const userdata = await axios.post(
          "/api/profile/get-user-profile",
          { user_id },
          config
        );
        var username = userdata.data.name;
        var profilePic = userdata.data.profile_photo;
        msgs[index].username = username;
        msgs[index].profilePic = profilePic;
      }
    });
    socket
      .off("Message")
      .on(
        "Message",
        ({ message, user_id, username, profilePic, senttime, room_id }) => {
          const roomInfo = this.state.database.data[this.state.currentTab];
          const cur_id = roomInfo._id;
          const newMsg = {
            message,
            user_id,
            username,
            profilePic,
            senttime,
          };
          if (room_id === cur_id) {
            msgs.push(newMsg);
          } else {
            const relatedRoomIndex = this.state.database.data.findIndex(
              (el, index) => el._id === room_id
            );
            var updatedDatabase = this.state.database;
            var oldRelatedMsgs =
              updatedDatabase.data[relatedRoomIndex].messages;
            oldRelatedMsgs.push(newMsg);
            updatedDatabase.data[relatedRoomIndex].messages = oldRelatedMsgs;
            this.setState({ database: updatedDatabase });
          }
          this.setState({ curRoomMsgs: msgs });
        }
      );
    return msgs.map(({ message, username, profilePic, senttime }) => (
      <ChatMessage
        message={message}
        username={username}
        profilePic={profilePic}
        time={senttime}
      />
    ));
  };

  renderRoomList = () => {
    return this.state.rooms.map((el, index) => (
      <a
        onClick={() => {
          const val = this.state.database.data[index].messages;

          this.setState({
            currentTab: index,
            curRoomMsgs: val,
          });
        }}
      >
        <li
          className={
            this.state.currentTab === index
              ? "p-2 m-2  bg-gray-300 text-gray-700   rounded-lg pointer mb-2"
              : "p-2 m-2 text-gray-900 hover:bg-gray-200  rounded-lg pointer mb-2 "
          }
        >
          <i className="fas fa-hashtag mr-2 text-gray-700"></i>
          <span>{el}</span>
        </li>
      </a>
    ));
  };

  getMessageText = (event) => {
    this.setState({
      messagetoSend: event.target.value,
    });
    console.log(this.state.messagetoSend);
  };

  sendMessage = async () => {
    const index = this.state.currentTab;
    const roomInfo = this.state.database.data[index];
    const room_id = roomInfo._id;
    const messagetext = this.state.messagetoSend;

    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    var send_token = {
      token: token,
    };
    const user = await axios.post("/api/auth", send_token, config);
    console.log(user.data);
    socket.emit(
      "sendMessage",
      {
        message: messagetext,
        room_id: room_id,
        user_id: user.data._id,
        username: user.data.username,
        profilePic: user.data.profile_photo,
        senttime: new Date(),
      },
      console.log("in send message")
    );
    var send_data = {
      club_id: this.props.club_id,
      user_id: user.data._id,
      messagetext: messagetext,
      room_id: room_id,
    };
    axios.post("/api/club/chat/send", send_data, config);
    this.setState({ messagetoSend: "" });
  };
  render() {
    if (this.state.isLoading) {
      return <p>Loading....</p>;
    }
    return (
      <>
        <div className="flex flex-wrap  items-start">
          {/* left side */}
          <div className="w-25">
            <ul className="ml-4 mr-4 rounded-lg border">
              <div className="p-4 font-semibold text-lg mx-3 border-b">
                Rooms
              </div>
              {this.renderRoomList()}
            </ul>
          </div>
          {/* right side */}
          <div
            className="w-75  border border-gray-300 rounded-lg relative"
            style={{ height: 650 }}
          >
            <div className="bg-gray-1000 font-semibold text-lg p-4 mx-3 border-b">
              <h1 className="ml-2">
                {this.state.rooms[this.state.currentTab]}
              </h1>
            </div>
            <div
              style={{
                overflowY: "scroll",
                maxHeight: "525px",
              }}
            >
              {" "}
              {this.renderMsgs()}
              <div ref={this.messagesEndRef} />
            </div>

            <div className=" font-bold text-sm p-2 absolute right-0 left-0 bottom-0 inline-flex justify-between items-center">
              <div className=" bg-gray-200 rounded-lg flex w-full p-1">
                <div className="w-full">
                  <input
                    type="text"
                    className="p-4 ml-2 w-full bg-gray-200 rounded-lg focus:rounded-lg"
                    id="exampleInputPassword1"
                    placeholder="type your message here"
                    onChange={this.getMessageText}
                    // onKeyDown={this.sendMessage}
                    value={this.state.messagetoSend}
                    onKeyPress={(e) => e.key === "Enter" && this.sendMessage}
                  ></input>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={this.sendMessage}
                    className="p-4 ml-auto mr-2 "
                  >
                    <i className="far fa-paper-plane text-xl text-gray-700"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
