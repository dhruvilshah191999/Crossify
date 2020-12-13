import React, { Component } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

var vertical = "top";
var horizontal = "center";
export default class Google extends Component {
  state = {
    error: false,
    message: "",
  };

  changeState = (message) => {
    this.setState({
      error: true,
      message,
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ error: false });
  };

  responseFacebook = async (response) => {
    //console.log(response.profileObj);
    const data = {
      socialId: response.googleId,
      email: response.profileObj.email,
      fname: response.profileObj.givenName,
      lname: response.profileObj.familyName,
      photo: response.profileObj.imageUrl,
    };
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const finaldata = await axios.post("/api/socialsignup", data, config);
    if (finaldata.data.is_error) {
      this.changeState(finaldata.data.message);
    } else {
      console.log(finaldata.data);
    }
  };

  render() {
    let googleContent;
    googleContent = (
      <GoogleLogin
        clientId="368003567815-p9au9e07ev68n06bbjddv77dn4oftbjs.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            style={{
              background: "white",
              border: " 0px transparent",
              width: "107px",
              height: "42px",
              textAlign: "center",
              borderRadius: "4px",
              marginTop: "3px",
              marginBottom: "3px",
              paddingBottom: "2px",
              fontWeight: "500",
            }}
          >
            <i className="fab fa-google"></i> &nbsp;&nbsp;Google
          </button>
        )}
        onSuccess={this.responseFacebook}
        onFailure={this.responseFacebook}
        cookiePolicy={"single_host_origin"}
      />
    );
    return (
      <div className="inline-block mr-2">
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={this.state.error}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <Alert severity="error" onClose={this.handleClose}>
            {this.state.message}
          </Alert>
        </Snackbar>
        {googleContent}
      </div>
    );
  }
}
