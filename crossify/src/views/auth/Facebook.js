import React, { Component } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import "assets/styles/facebookbutton.css";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

var vertical = "top";
var horizontal = "center";

export default class Facebook extends Component {
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
    var splitname = response.name.split(" ");
    var fname, lname;
    if (splitname.length === 2) {
      fname = splitname[0];
      lname = splitname[1];
    } else if (splitname.length === 3) {
      fname = splitname[0];
      lname = splitname[2];
    }
    const data = {
      socialId: response.userID,
      email: response.email,
      fname: fname,
      lname: lname,
      photo: response.picture.data.url,
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
    return (
      <div className="inline-block">
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
        {fbContent}
      </div>
    );
  }
}
