import React, { Component } from "react";

import noAcitivityIcon from "assets/img/snooze.png";

class NoPreview extends Component {
  render() {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        {" "}
        <div>
          <img src={noAcitivityIcon} alt="snooze" />
        </div>
        <div className="font-bold mt-1 ">No Preview Available</div>
      </div>
    );
  }
}

export default NoPreview;
