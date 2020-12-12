import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";

export default class Google extends Component {
  responseFacebook = (response) => {
    console.log(response);
  };

  render() {
    let googleContent;
    googleContent = (
      <GoogleLogin
        clientId="368003567815-p9au9e07ev68n06bbjddv77dn4oftbjs.apps.googleusercontent.com"
        onSuccess={this.responseFacebook}
        onFailure={this.responseFacebook}
        buttonText="Google"
      />
    );
    return <div>{googleContent}</div>;
  }
}
