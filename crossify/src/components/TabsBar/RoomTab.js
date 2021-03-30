import React, { useEffect, useState } from "react";
import ChatMessage from "components/Cards/ChatMessage.js";
import io from "socket.io-client";
import axios from "axios";
import demobg from "assets/img/pp1.jpg";

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

  componentDidMount = async () => {
    var sendData = {
      club_id: "605c51d4ccb6bf2a3c2b5db2",
    };
    var club_id = "605c51d4ccb6bf2a3c2b5db2";
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const allRoomsInfo = await axios.post(
      "/api/club/chat/getRooms",
      sendData,
      config
    );
    console.log("DATA : ", allRoomsInfo);
    const listOfChannels = allRoomsInfo.data.data.map((el) => el.channel_name);
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
  };

  renderMsgs = () => {
    const msgs = this.state.curRoomMsgs;

    msgs.map(({ user_id, message, senttime }, index) => {
      if (!msgs[index].username) {
        const config = {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          validateStatus: () => true,
        };
        const userdata = axios
          .post("/api/profile/get-user-profile", { user_id }, config)
          .then((userdata) => {
            var username = userdata.data.name;
            var profilePic = userdata.data.profile_photo;
            msgs[index].username = username;
            msgs[index].profilePic = profilePic;
          });
      }
    });
    socket
      .off("Message")
      .on("Message", ({ message, user_id, username, profilePic, senttime }) => {
        var socketMessage = {
          message: message,
          user_id: user_id,
          username: username,
          profilePic: profilePic,
          senttime: senttime,
        };
        console.log("socket data received");
        msgs.push(socketMessage);
      });
    return msgs.map(({ message, username, profilePic, senttime }) => (
      <ChatMessage
        message={message}
        username={username}
        profilePic={profilePic}
        time={senttime}
      />
    ));
  };
  // renderChatOnSocket = () => {
  //   socket.on('Message',(message,user_id,username,profilePic,senttime)=>{
  //     return ((message,username,profilePic,senttime)=>(

  //     ));
  //   })
  // }
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

  // renderChats = () => {
  //   const index = this.state.currentTab;
  //   const roomInfo = this.state.database[index];
  //   console.log(roomInfo);
  //   const curRoom = roomInfo.data.message.channel_name;
  //   const msgs = roomInfo.data.message.messages;

  //   msgs.map(({ user_id, message, senttime }, index) => {
  //     const config = {
  //       method: "POST",
  //       header: {
  //         "Content-Type": "application/json",
  //       },
  //       validateStatus: () => true,
  //     };
  //     const userdata = axios.post(
  //       "/api/profile/get-user-profile",
  //       { user_id },
  //       config
  //     );
  //     console.log("userdata:", userdata);
  //     //msgs[index].username=userdata.
  //   });
  // };
  getMessageText = (event) => {
    this.setState({
      messagetoSend: event.target.value,
    });
    console.log(this.state.messagetoSend);
  };
  sendMessage = async () => {
    //socket.emit('sendMessage')
    console.log(this.state.database);
    const index = this.state.currentTab;
    const oldMsgs = this.state.curRoomMsgs;
    console.log(token);
    console.log(oldMsgs);
    const roomInfo = this.state.database.data[index];
    const room_id = roomInfo._id;
    const messagetext = this.state.messagetoSend;
    console.log(room_id);
    console.log(messagetext);

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
      club_id: "605c51d4ccb6bf2a3c2b5db2",
      user_id: user.data._id,
      messagetext: messagetext,
      room_id: room_id,
    };
    const finaldata = axios.post("/api/club/chat/send", send_data, config);
    var newMessage = {
      message: messagetext,
      userid: user.data.user_id,
      username: user.data.username,
      profilePic: user.data.profile_photo,
      senttime: new Date(),
    };
    oldMsgs.push(newMessage);
    this.setState({
      curRoomMsgs: oldMsgs,
    });
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
          <div className="w-75  border border-gray-300 rounded-lg relative h-screen">
            <div className="bg-gray-1000 font-semibold text-lg p-4 mx-3 border-b">
              {/* <h1 className="ml-2">{this.renderChat().RoomTab}</h1> */}
              {/*current index */}
            </div>
            {this.renderMsgs()}
            {/* {this.renderChats()} */}
            <div className=" font-bold text-sm p-2 absolute right-0 left-0 bottom-0 inline-flex justify-between items-center">
              <div className=" bg-gray-200 rounded-lg flex w-full p-1">
                <div className="w-full">
                  <input
                    type="text"
                    className="p-4 ml-2 w-full bg-gray-200 rounded-lg focus:rounded-lg"
                    id="exampleInputPassword1"
                    placeholder="type your message here"
                    onChange={this.getMessageText}
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
