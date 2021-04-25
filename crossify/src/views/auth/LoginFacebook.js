import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "context/usercontext";
import FacebookLogin from "react-facebook-login";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { notifySuccessLogin } from "notify";

export default function Facebook() {
  var vertical = "top";
  var horizontal = "center";
  const { islogin_dispatch, dispatch } = useContext(UserContext);
  const [errorStatus, setError] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };
  var responseFacebook = async (response) => {
    if (!response.error) {
      const data = {
        socialId: response.userID,
        email: response.email,
      };
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      };
      const finaldata = await axios.post("/api/socialsignin", data, config);
      if (finaldata.data.is_error) {
        setError(true);
        setMessage(finaldata.data.message);
      } else {
        localStorage.setItem("jwt", finaldata.data.token);
        islogin_dispatch({ type: "Login-Status", status: true });
        dispatch({ type: "ADD_USER", payload: finaldata.data.data });
        window.location.replace("/");
        const name =
          finaldata.data.data.fname + " " + finaldata.data.data.lname;
        notifySuccessLogin(name);
      }
    }
  };
  let fbContent;
  fbContent = (
    <FacebookLogin
      cssClass="btnFacebook hover:shadow-lg "
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
