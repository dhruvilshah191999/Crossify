import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

var vertical = "top";
var horizontal = "center";

function ChangePassword() {
  const [formData, setData] = useState({
    email: "",
    password: "",
    new_password: "",
    confirm_new_password:""
  });

  const [errorStatus, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { email, password, new_password, confirm_new_password } = formData;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const onChange = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (new_password != confirm_new_password) {
      setError(true);
      setMessage("New Passoword Not Matched to Confirm Password");
    }
    else {
      var object = {
        email,
        password,
        new_password
      }
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      const finaldata = await axios.post(
        "/api/profile/update-password",
        object,
        config
      );
      if (finaldata.data.is_error) {
        setError(true);
        setMessage(finaldata.data.message);
      } else {
        window.location.reload();
      }
    }
  };
  return (
    <div className="container mx-auto px-4 h-full">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={errorStatus}
        style={{marginLeft:"120px"}}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
      <div className="flex flex-row justify-center">
        <div className="relative flex flex-col min-w-0 break-words justify-center w-1/2 mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">
                Change Password
              </h6>
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Settings
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-2">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="text"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  placeholder="Old Password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  New Password
                </label>
                <input
                  type="password"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  placeholder="New Password"
                  name="new_password"
                  value={new_password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  placeholder="Re-enter New password"
                  name="confirm_new_password"
                  value={confirm_new_password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="text-center mt-6">
                <button
                  className="bg-blue-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default ChangePassword;
