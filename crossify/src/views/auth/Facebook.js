import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import "assets/styles/facebookbutton.css";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Key from "config/default.json";
import CryptoJS from "crypto-js";

export default function Facebook() {
  var vertical = "top";
  var horizontal = "center";
  let history = useHistory();
  const [errorStatus, setError] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };
  var responseFacebook = async (response) => {
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
      setError(true);
      setMessage(finaldata.data.message);
    } else {
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(finaldata.data),
        Key.Secret
      ).toString();
      localStorage.setItem("email", ciphertext);
      history.push("/auth/register/socialstep2");
    }
  };
  let fbContent;
  fbContent = (
    <FacebookLogin
      cssClass="btnFacebook"
      appId="393912875359725"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon={<i className="fab fa-facebook-f"> </i>}
      textButton="&nbsp;&nbsp;Facebook"
    />
  );
  return (
    <div className="inline-block">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={errorStatus}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
      {fbContent}
    </div>
  );
}
