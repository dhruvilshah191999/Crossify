import React, { Component } from "react";
import Chat from "components/Message/Message";
class PlayGround extends Component {
  render() {
    return (
      <div className="p-4 border border-black" style={{ padding: "5rem" }}>
        <Chat></Chat>
        <Chat self></Chat>
      </div>
    );
  }
}
//room code temp by bhargav for appending after presentation
// var roomName = this.state.rooms[relatedRoomIndex];
// addNotification({
//   title: "A new Message Received",
//   subtitle: roomName,
//   message: message,
//   native: true,
//   silent: false,
// });
export default PlayGround;
