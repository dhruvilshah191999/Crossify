import { withMobileDialog } from "@material-ui/core";
import React from "react";
import Photo from "../../assets/img/team-4-470x470.png";

export default class EventTab extends React.Component {
  render() {
    return (
      <>
        <div className="container px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 relative">
              <a href="register">
                <img
                  src={this.props.bgImage}
                  alt="eventPic"
                  style={{
                    padding: "10px",
                    height: "300px",
                    width: "100%",
                    borderRadius: "20px",
                  }}
                />
                <p
                  className="bg-overlay rounded-lg"
                  style={{
                    position: "absolute",
                    inset: "10px",
                  }}
                >
                  <div className="absolute top-1 text-white text-md font-semibold inset-0">
                    <span className="px-2 inline-block">
                      {this.props.eventTitle}
                    </span>
                    <span className="px-2 inline-block">
                      {this.props.eventTime}
                    </span>
                    <span className="inline-block float-right pr-2 font-bold">
                      {this.props.eventParticipant} Participants
                    </span>
                  </div>
                </p>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// title should be max 45 words include whitespace
EventTab.defaultProps = {
  bgImage: Photo,
  eventTitle: "Introduction To React.js",
  eventTime: "Friday | August 14, 2020 | 6:30 PM",
  eventParticipant: "100",
};
