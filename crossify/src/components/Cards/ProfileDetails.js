import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Moment from "moment";
import demopp from "assets/img/pp1.jpg";
import Tag from "components/Tag";

const ClubView = (props) => {
  return (
    <div
      className=" rounded-lg shadow p-2 mr-4 hover:bg-gray-200"
      style={{ width: 250 }}
    >
      <div className="flex flex-row">
        <div>
          <img
            src={props.club_img}
            alt="HostedClubImage"
            className="rounded mini-club-image mr-4"
          />
        </div>
        <div className="flex flex-col ">
          <div className="font-semibold text-lg">{props.club_name}</div>
          <div className="text-sm text-gray-700">{"Admin"}</div>
        </div>
      </div>
    </div>
    //   </div>
    //
    //
    // </div>
  );
};

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: {},tag:[],club:[] };
  }

  async componentDidMount() {
    const token = localStorage.getItem("jwt");
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    var send_data = {
      token,
    };
    const finaldata = await axios.post(
      "/api/profile/MyProfile",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({
        profile: finaldata.data.data,
        tag:finaldata.data.tag
      });
    }

    const finaldata2 = await axios.post(
      "/api/profile/get-photo-name",
      send_data,
      config
    );
    if (finaldata2.data.is_error) {
      console.log(finaldata2.data.message);
    } else {
      this.setState({
        club:finaldata2.data.message
      });
    }
  }

  render() {
    return (
      <div className="flex flex-col mx-16 mt-2 ">
        <div className="flex p-4">
          <div className="mr-8">
            <img
              className="profile-image rounded-full border"
              alt="profilepic"
              src={this.state.profile.profile_photo}
            ></img>
          </div>
          <div className="flex-col ml-6">
            <div className=" relative w-100 flex flex-row mt-2">
              <div className="text-4xl font-semibold ">
                {this.state.profile.fname} {this.state.profile.lname}
              </div>
              <div className="text-xl ml-2 pt-4 text-gray-700">
                as{" "}
                <span className="text-alpha">
                  {this.state.profile.username}
                </span>
              </div>

              {/* </div> */}
            </div>
            <div
              className="text-gray-600 text-lg"
              style={
                this.state.profile.occupation
                  ? { display: "" }
                  : { display: "none" }
              }
            >
              {this.state.profile.occupation}&nbsp; | &nbsp;Joined{" "}
              {Moment(this.state.profile.date).format("MMM YYYY")}
            </div>
            <div
              className="text-gray-600 text-lg"
              style={
                this.state.profile.occupation
                  ? { display: "none" }
                  : { display: "" }
              }
            >
              Joined {Moment(this.state.profile.date).format("MMM YYYY")}
            </div>
            <div className="text-gray-600 mt-1 text-lg">
              <i class="fas fa-map-marker-alt  "></i> {this.state.profile.city}{" "}
              , {this.state.profile.state}
            </div>
            <div
              className=" mt-4 "
              style={
                this.state.profile.social_media
                  ? { display: "" }
                  : { display: "none" }
              }
            >
              {/* <div className="mt-2"> */}
              <button
                className="bg-blue-600 text-white w-8 h-8 rounded-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => {
                  if (this.state.profile.social_media.facebook != "") {
                    window.open(
                      this.state.profile.social_media.facebook,
                      "_blank"
                    );
                    return false;
                  }
                }}
              >
                <i className="fab fa-facebook-f"></i>
              </button>
              <button
                className="bg-blue-400 text-white w-8 h-8 rounded-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => {
                  if (this.state.profile.social_media.twitter != "") {
                    window.open(
                      this.state.profile.social_media.twitter,
                      "_blank"
                    );
                    return false;
                  }
                }}
              >
                <i className="fab fa-twitter"></i>
              </button>
              <button
                className="bg-linkedin text-white w-8 h-8 rounded-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => {
                  if (this.state.profile.social_media.linkedin != "") {
                    window.open(
                      this.state.profile.social_media.linkedin,
                      "_blank"
                    );
                    return false;
                  }
                }}
              >
                <i className="fab fa-linkedin"></i>
              </button>

              <button
                className="bg-instagram text-white w-8 h-8 rounded-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => {
                  if (this.state.profile.social_media.instagram != "") {
                    window.open(
                      this.state.profile.social_media.instagram,
                      "_blank"
                    );
                    return false;
                  }
                }}
              >
                <i className="fab fa-instagram"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-2xl text-alpha p-2 ">
            <i class="fas fa-info-circle"></i> About
          </div>
          <hr></hr>
          <div className="p-2 mt-1  text-lg text-gray-800">
            {this.state.profile.about_me}
          </div>
          <div className="text-2xl text-alpha p-2 mt-2 ">
            <i class="fab fa-gratipay "></i> Interests
          </div>
          <hr></hr>
          <div className="p-2 mt-1">
            {this.state.tag.map((el) => (
              <Tag data={el}></Tag>
            ))}
          </div>
          <div className="text-2xl text-alpha p-2 mt-2 ">
            <i class="fas fa-users"></i> Clubs
          </div>
          <hr></hr>
          <div className="p-2 mt-1 flex flex-wrap mb-2">
            {this.state.club.map((el) => (
              <ClubView
                club_name={el.club_name}
                club_img={el.profile_photo}
              ></ClubView>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ProfileDetails.defaultProps = {
  fname: "Harshil",
  lname: "Patel",
  username: "hackershil",
  occupation: "Software Engineer",
  joining_date: "Apr 2020",
  tags: ["Football", "Fitness", "Sports", "Coding"],
  clubs: [
    { club_name: "Grey Hat badshah", designation: "Admin" },
    { club_name: "Decoy Boy", designation: "Member" },
  ],
  place: "Ahmedabad , GJ",
  bio:
    "If you’re comparing sports management platforms, OpenSports is in a league of its own. OpenSports is the first 3-in-one web and app platform that features support for leagues, tournaments, pickup games (and even eSports!). OpenSports makes organization, management and registration effortless for admins and fun for players!",
};

export default ProfileDetails;
