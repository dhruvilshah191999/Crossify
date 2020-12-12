import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import "assets/styles/facebookbutton.css";

export default class Facebook extends Component {
  responseFacebook = (response) => {
    console.log(response);
  };

  render() {
    let fbContent;
    fbContent = (
      <FacebookLogin
        cssClass="btnFacebook"
        appId="393912875359725"
        autoLoad={false}
        fields="name,email,picture"
        callback={this.responseFacebook}
        icon={<i className="fab fa-facebook-f"> </i>}
        textButton="&nbsp;&nbsp;Facebook"
      />
    );
    return <div>{fbContent}</div>;
  }
}
