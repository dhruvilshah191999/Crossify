import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { UserContext } from "context/usercontext";
import { notifySuccessLogin } from "notify";
import Key from "config/default.json";
import CryptoJS from "crypto-js";

export default function LoginGoogle() {
  var vertical = "top";
  var horizontal = "center";
  let history = useHistory();
  const { islogin_dispatch, dispatch } = useContext(UserContext);
  const [errorStatus, setError] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };
  var responseGoogle = async (response) => {
    if (!response.error) {
      const data = {
        socialId: response.googleId,
        email: response.profileObj.email,
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
        history.push("/");
        const name = finaldata.data.data.fname + " " + finaldata.data.data.lname;
        notifySuccessLogin(name);
      }
    }
  };
  let googleContent;
  googleContent = (
    <GoogleLogin
      clientId="368003567815-p9au9e07ev68n06bbjddv77dn4oftbjs.apps.googleusercontent.com"
      render={(renderProps) => (
        <button
          className="hover:shadow-md bg-white rounded"
          onClick={renderProps.onClick}
          style={{
            width: "107px",
            height: "42px",
            textAlign: "center",

            marginBottom: "3px",
          }}
        >
          <i className="fab fa-google text-lg" style={{ height: 18 }}></i>
          &nbsp;&nbsp;Google
        </button>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  );
  return (
    <div className="inline-block mr-2">
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
      {googleContent}
    </div>
  );
}
