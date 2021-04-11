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

export default PlayGround;
