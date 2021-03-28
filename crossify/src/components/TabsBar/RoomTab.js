import React,{useEffect,useState} from "react";
import ChatMessage from "components/Cards/ChatMessage.js";
import io from "socket.io-client";
import axios from "axios";
let socket=io();
export default class RoomTab extends React.Component {
  
  state = {
    currentTab: 0,
    rooms: [],
  };
  componentDidMount() {
    const fetchedRoom=[]
      
      fetch('/api/club/chat/getRooms?club_id=605c51d4ccb6bf2a3c2b5db2')
      .then(res => res.json())
      .then(data => {console.log(data)   
        const roomIds = data.channel_list;
        for(var i in roomIds){
          fetch(`/api/club/chat/getParticularroom?room_id=${i}`)
          .then(res=>res.json())
          .then(data=>{console.log(data)
            fetchedRoom.push(data.message.channel_name);
          })
          
        } });
      
      
     //const fetchedRoom = ["C++", "Java", "Python", "WebDev"];
    
    this.setState({
      rooms: fetchedRoom,
    });
  }
  renderRoomList() {
    return this.state.rooms.map((el, index) => (
      <a
        onClick={() => {
          this.setState({
            currentTab: index,
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
  }
     
  
  render() {
    async function sendMessage(){
      
      //socket.emit('sendMessage')
    //   const config = {
    //     method: "POST",
    //     header: {
    //       "Content-Type": "application/json",
    //     },
    //     validateStatus: () => true,
    //   };
    //   var send_data = {
    //     club_id: id,
    //     token,
    //   };
    //   const finaldata = await axios.post(
    //     "/api/club/chat/send",
    //     send_data,
    //     config
    //   );
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
              <h1 className="ml-2">{this.currentTab}</h1>{/*how to put current index */}
            </div>
            <ChatMessage
              username="hackershil"
              profilePic="https://source.unsplash.com/random"
              time="12 Feb 2021 at 9:43 PM"
              message="Lorem Ipsum Source is built for use in small, low-traffic applications. For production uses, we recommend the official Unsplash API which has more robust features and supports high-traffic use cases."
            ></ChatMessage>
            <ChatMessage
              username="hackershil"
              profilePic="https://source.unsplash.com/random"
              time="12 Feb 2021 at 9:43 PM"
              message="Lorem Ipsum Source is built for use in small, low-traffic applications. For production uses, we recommend the official Unsplash API which has more robust features and supports high-traffic use cases."
            ></ChatMessage>
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
                  <button type="button" onClick={sendMessage} className="p-4 ml-auto mr-2 ">
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
