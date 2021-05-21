import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Member = (props) => {
  return (
    //todo GOLU set profile link in this one
    <Link
      className="flex items-center justify-between my-2 hover:bg-gray-300 rounded-lg pl-8 py-2"
      style={{ flex: "1 1 25%", maxWidth: 265, minWidth: 200 }}
      to={"/profilepage/" + props.user_id}
    >
      <div className="w-16">
        <img className="w-16 h-16 rounded-full" src={props.image} alt="img" />
      </div>
      <div className="flex-1 pl-4">
        <div className="text-gray-700 font-semibold">{props.name}</div>
        <div className="text-gray-600 font-normal text-base">Member</div>
      </div>
    </Link>
  );
};

class RegisteredMembers extends Component {
  constructor(props) {
    super(props);
    this.state = { eventid: this.props.eventid, members: [], final: [] };
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
      event_id: this.state.eventid,
    };
    const finaldata = await axios.post(
      "/api/events/get-profiles-of-events",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
    } else {
      this.setState({
        members: finaldata.data.event_data,
        final: finaldata.data.event_data,
      });
    }
  }
  searchHandler = (event) => {
    let searcjQery = event.target.value.toLowerCase(),
      displayedContacts = this.state.final.filter((el) => {
        let searchValue = el.name.toLowerCase();
        if (searchValue.indexOf(searcjQery) !== -1) {
          return true;
        }
        return false;
      });
    this.setState({
      members: displayedContacts,
    });
  };
  render() {
    return (
      <div className="mt-1 text-lg text-gray-800 font-semibold lg:w-3/4 leading-relaxed">
        <div className="flex flex-row">
          <div className="mt-2">
            {this.state.members.length + " / " + this.props.capacity} slots
            booked so far
          </div>
          <div className="relative flex w-1/2 flex-wrap items-stretch mb-2 ml-auto">
            <span className=" h-full leading-snug font-normal z-2 text-center text-gray-700 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="Find your friends..."
              className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 search"
              onChange={this.searchHandler}
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap overflow-x-auto max-h-300-px mt-2 ">
          {this.state.members.map((el, index) => {
            return (
              <Member
                image={el.profile_photo}
                name={el.name}
                user_id={el.user_id}
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default RegisteredMembers;
