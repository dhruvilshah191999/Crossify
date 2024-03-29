import React, { Component } from "react";
import axios from "axios";

import Tag from "components/Tag";

const ClubView = (props) => {
  return (
    <div
      className=" rounded-lg shadow p-2 mr-4 hover:bg-gray-200"
      style={{ flex: "1 1 50%", maxWidth: 350 }}
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

const QA = (props) => {
  return (
    <div className="flex flex-col p-2 first:pt-0">
      <div className="text-xl font-semibold">{props.question}</div>
      <div className="text-base text-gray-700 mt-1">{props.answer}</div>
    </div>
  );
};

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: {}, tag: [], club: [] };
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
        tag: finaldata.data.tag,
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
        club: finaldata2.data.message,
      });
    }
  }

  render() {
    return (
      <div className="flex flex-col mx-8 lg:mx-16 mt-2 ">
        <div className="flex p-4 flex-wrap">
          <div className="mr-8 flex-shrink-0">
            <img
              className="profile-image rounded-full border"
              alt="profilepic"
              src={this.state.profile.profile_photo}
            ></img>
          </div>
          <div className="flex-col w-1/2 ml-6">
            <div className=" relative w-100 flex flex-row flex-wrap mt-2">
              <div className="text-4xl flex-shrink-0 font-semibold ">
                {this.props.fullname}
              </div>
              <div className="text-xl  flex-shrink-0 text-gray-700 xl2:mt-4 xl2:ml-2">
                as <span className="text-alpha">{this.props.username}</span>
              </div>

              {/* </div> */}
            </div>
            <div className="flex flex-wrap">
              <div className="text-gray-600 text-lg flex-shrink-0">
                {this.props.occupation}&nbsp; | &nbsp;
              </div>
              <div className="text-gray-600 text-lg flex-shrink-0">
                Joined {this.props.joining_date}
              </div>
            </div>
            <div className="flex">
              <div className="text-gray-600 mt-1 inline-block text-lg flex-shrink-0">
                <i className="fas fa-map-marker-alt  "></i> {this.props.place}
              </div>
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
                  if (this.state.profile.social_media.facebook !== "") {
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
                  if (this.state.profile.social_media.twitter !== "") {
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
                  if (this.state.profile.social_media.linkedin !== "") {
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
                  if (this.state.profile.social_media.instagram !== "") {
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
            <i className="fas fa-info-circle"></i> About
          </div>
          <hr></hr>
          <div className="p-2 mt-1  text-lg text-gray-800">
            {this.state.profile.about_me}
          </div>
          <div className="text-2xl text-alpha p-2 mt-2 ">
            <i className="fab fa-gratipay "></i> Interests
          </div>
          <hr></hr>
          <div className="p-2 mt-1">
            {this.state.tag.map((el) => (
              <Tag data={el}></Tag>
            ))}
          </div>
          <div className="text-2xl text-alpha p-2 mt-2 ">
            <i className="fas fa-users"></i> Clubs
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
          <div className="text-3xl text-alpha p-2 mt-2 ">
            <i className="fas fa-clipboard-list "></i>&nbsp; Answer Sheet
          </div>
          <hr></hr>
          <div className="p-2 mt-1 flex flex-wrap">
            {this.props.questionsAnswered.map((el) => (
              <QA question={el.question} answer={el.answer}></QA>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileDetails;
