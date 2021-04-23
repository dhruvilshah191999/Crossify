import React from "react";
import ChatMessage from "components/Message/Message";
import urlObject from "../../config/default.json";
import io from "socket.io-client";
import axios from "axios";
var BackendURL = urlObject.BackendURL;
let socket = io(BackendURL, {
  transport: ["websocket", "polling", "flashsocket"],
});

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const token = localStorage.getItem("jwt");

export default class RoomTab extends React.Component {
  state = {
    currentTab: 0,
    myid: "",
    username: "",
    myProfilePic: "",
    userlevel: "",
    rooms: [],
    privacyOfChannels: [],
    isLoading: false,
    curRoomMsgs: [],
    database: [],
    users: [],
    messagetoSend: "",
    pageonChat: [],
    fetchMore: [],
  };
  messagesEndRef = React.createRef();

  componentDidMount = async () => {
    const token = localStorage.getItem("jwt");
    const { club_id } = this.props;
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
    var page = 1;
    var limit = 30;
    const user = await axios.post("/api/auth", send_token, config);
    const user_id = user.data._id;
    const allRoomsInfo = await axios.post(
      "/api/club/chat/getMsgWithUsers",
      { club_id, user_id, page, limit },
      config
    );
    const listOfChannels = allRoomsInfo.data.roomsData.map((el) => {
      return el.channel_name;
    });
    const privacyOfChannels = allRoomsInfo.data.roomsData.map(
      (el) => el.is_writable
    );
    var fetchInitial = [];
    var pagesInitial = [];
    var temp = 0;
    allRoomsInfo.data.roomsData.forEach((el) => {
      if (el.messages.length >= limit) {
        fetchInitial[temp] = true;
        pagesInitial[temp] = 1;
      } else {
        fetchInitial[temp] = false;
        pagesInitial[temp] = 1;
      }
      temp++;
    });
    var uniqueUsers = {};
    allRoomsInfo.data.roomsData.forEach((el) => {
      el.users.forEach(({ _id, profile_photo, username }) => {
        if (!uniqueUsers.hasOwnProperty(_id)) {
          uniqueUsers[_id] = {
            profile_photo,
            username,
          };
        }
      });
    });
    const userLevel = allRoomsInfo.data.level;
    const msgs = allRoomsInfo.data.roomsData[0].messages || [];

    socket.emit("join", { user_id, club_id }, (error) => {
      if (error) {
        alert(error);
      }
    });
    this.setState({
      fetchMore: fetchInitial,
      rooms: listOfChannels,
      curRoomMsgs: msgs,
      database: allRoomsInfo.data,
      users: uniqueUsers,
      myid: user_id,
      username: user.data.username,
      myProfilePic: user.data.profile_photo,
      privacyOfChannels: privacyOfChannels,
      userlevel: userLevel,
      pageonChat: pagesInitial,
    });
    this.scrollToBottom();
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  handleScroll = async (e) => {
    let element = e.target;
    if (element.scrollTop === 0) {
      const index = this.state.currentTab;
      var fetch = this.state.fetchMore;
      const { club_id } = this.props;
      const openDatabase = this.state.database;
      const user_id = this.state.myid;
      const msgs = this.state.curRoomMsgs;
      var pages = this.state.pageonChat;
      const limit = 30;
      console.log(fetch[index]);
      if (fetch[index]) {
        pages[index]++;
        const config = {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          validateStatus: () => true,
        };
        var page = pages[index];
        const allRoomsInfo = await axios.post(
          "/api/club/chat/getMsgWithUsers",
          { club_id, user_id, page, limit },
          config
        );
        console.log(allRoomsInfo);
        var newMessages = allRoomsInfo.data.roomsData[index].messages;
        console.log(newMessages);
        if (newMessages === null) {
          fetch[index] = false;
          this.setState({
            fetchMore: fetch,
            pageonChat: pages,
          });
        } else {
          newMessages.map(({ user_id }, index) => {
            const { username, profile_photo } = this.state.users[user_id];
            msgs[index].username = username;
            msgs[index].profilePic = profile_photo;
          });
          console.log(openDatabase);
          var updatedArray = newMessages.concat(
            openDatabase.roomsData[index].messages
          );
          openDatabase.roomsData[index].messages = updatedArray;
          console.log(openDatabase);
          var concetedMessages = newMessages.concat(msgs);
          console.log(concetedMessages);
          this.setState({
            curRoomMsgs: concetedMessages,
            database: openDatabase,
            pageonChat: pages,
          });
        }
      }
    }
  };
  renderMsgs = () => {
    var msgs = this.state.curRoomMsgs;
    msgs.map(({ user_id }, index) => {
      const { username, profile_photo } = this.state.users[user_id];
      msgs[index].username = username;
      msgs[index].profilePic = profile_photo;
    });
    socket
      .off("Message")
      .on(
        "Message",
        ({ message, user_id, username, profilePic, senttime, room_id }) => {
          const roomInfo = this.state.database.roomsData[this.state.currentTab];
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
            const relatedRoomIndex = this.state.database.roomsData.findIndex(
              (el, index) => el._id === room_id
            );
            var updatedDatabase = this.state.database;
            var oldRelatedMsgs =
              updatedDatabase.roomsData[relatedRoomIndex].messages;
            oldRelatedMsgs.push(newMsg);
            updatedDatabase.roomsData[
              relatedRoomIndex
            ].messages = oldRelatedMsgs;
            this.setState({ database: updatedDatabase });
          }
          this.setState({ curRoomMsgs: msgs });
        }
      );
    return msgs.map(({ message, username, profilePic, senttime, user_id }) => (
      <ChatMessage
        self={username === this.state.username}
        message={message}
        userId={user_id}
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
          const val = this.state.database.roomsData[index].messages;

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
  };

  sendMessage = async () => {
    const index = this.state.currentTab;
    const oldMsgs = this.state.curRoomMsgs;
    const roomInfo = this.state.database.roomsData[index];
    const room_id = roomInfo._id;
    const messagetext = this.state.messagetoSend;
    const current_user_id = this.state.myid;
    const current_user_name = this.state.username;
    const current_user_profile = this.state.myProfilePic;
    var { users } = this.state;

    if (!users.hasOwnProperty(current_user_id)) {
      users[current_user_id] = {
        profile_photo: current_user_profile,
        username: current_user_name,
      };
    }

    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };

    socket.emit("sendMessage", {
      club_id: this.props.club_id,
      message: messagetext,
      room_id: room_id,
      user_id: current_user_id,
      username: current_user_name,
      profilePic: current_user_profile,
      senttime: new Date(),
    });
    var newMessage = {
      message: messagetext,
      user_id: current_user_id,
      username: current_user_name,
      profilePic: current_user_profile,
      senttime: new Date(),
    };
    oldMsgs.push(newMessage);
    var send_data = {
      club_id: this.props.club_id,
      user_id: current_user_id,
      messagetext: messagetext,
      room_id: room_id,
    };
    axios.post("/api/club/chat/send", send_data, config);
    this.setState({ messagetoSend: "", curRoomMsgs: oldMsgs, users: users });
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
              className="px-4"
              style={{
                flex: 1,
                overflowY: "scroll",
                maxHeight: "525px",
              }}
              onScroll={this.handleScroll}
            >
              {" "}
              {this.renderMsgs()}
              <div ref={this.messagesEndRef} />
            </div>

            <div className=" font-bold text-sm p-2 absolute right-0 left-0 bottom-0 inline-flex justify-between items-center">
              {this.state.userlevel === "member" ? (
                this.state.privacyOfChannels[this.state.currentTab] ? (
                  <div className=" bg-gray-200 rounded-lg flex w-full p-1">
                    <div className="w-full">
                      <input
                        type="text"
                        className="p-4 ml-2 w-full bg-gray-200 rounded-lg focus:rounded-lg"
                        id="exampleInputPassword1"
                        placeholder="type your message here"
                        onChange={this.getMessageText}
                        value={this.state.messagetoSend}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            {
                              this.sendMessage();
                            }
                          }
                        }}
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
                ) : (
                  <div className=" bg-gray-200 rounded-lg flex w-full p-4">
                    <div className="flex justify-center items-center w-full">
                      Only Authorized Persons are allowed to write.
                    </div>
                  </div>
                )
              ) : (
                <div className=" bg-gray-200 rounded-lg flex w-full p-1">
                  <div className="w-full">
                    <input
                      type="text"
                      className="p-4 ml-2 w-full bg-gray-200 rounded-lg focus:rounded-lg"
                      id="exampleInputPassword1"
                      placeholder="type your message here"
                      onChange={this.getMessageText}
                      value={this.state.messagetoSend}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          {
                            this.sendMessage();
                          }
                        }
                      }}
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
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
