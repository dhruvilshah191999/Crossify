import React, { useState } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Formik } from "formik";

var vertical = "top";
var horizontal = "center";

function ChangePassword() {
  const [formData, setData] = useState({
    email: "",
    password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [errorStatus, setError] = useState(false);
  const [submitted, isSubmitting] = useState(false);
  const [successStatus, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const { email, password, new_password, confirm_new_password } = formData;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setSuccess(false);
  };

  const onChange = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="container mx-auto px-4 h-full">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={errorStatus}
        style={{ marginLeft: "120px" }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={successStatus}
        style={{ marginLeft: "120px" }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose}>{message}</Alert>
      </Snackbar>

      <div className="flex flex-row justify-center">
        <div className="relative flex flex-col min-w-0 break-words justify-center w-full md:w-1/2 mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">
                Change Password
              </h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-2">
            <Formik
              initialValues={formData}
              validate={() => {
                const errors = {};
                if (!email) {
                  errors.email = "Email is required !";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
                ) {
                  errors.email = "Invalid email address !";
                }
                if (!password) {
                  errors.password = "Old password is required !";
                }
                if (!new_password) {
                  errors.new_password = "New password is required !";
                } else if (password === new_password) {
                  errors.new_password =
                    "New password is same as old password !";
                }
                if (!confirm_new_password) {
                  errors.confirm_new_password = "Confirm password required !";
                } else if (new_password !== confirm_new_password) {
                  errors.confirm_new_password =
                    "Confirm password does not match !";
                }
                return errors;
              }}
              onSubmit={async ({ setSubmitting }) => {
                isSubmitting(true);
                var object = {
                  email,
                  password,
                  new_password,
                };
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
                  isSubmitting(false);
                  setError(true);
                  setMessage(finaldata.data.message);
                } else {
                  setSuccess(true);
                  setMessage("Password Successfully Updated !!!");
                  setTimeout(function () {
                    window.location.reload();
                  }, 300);
                }
                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
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
                      onBlur={handleBlur}
                    />
                    <p className="FormError">
                      {errors.email && touched.email && errors.email}
                    </p>
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
                      onBlur={handleBlur}
                    />
                    <p className="FormError">
                      {errors.password && touched.password && errors.password}
                    </p>
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
                      onBlur={handleBlur}
                    />
                    <p className="FormError">
                      {errors.new_password &&
                        touched.new_password &&
                        errors.new_password}
                    </p>
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
                      onBlur={handleBlur}
                    />
                    <p className="FormError">
                      {errors.confirm_new_password &&
                        touched.confirm_new_password &&
                        errors.confirm_new_password}
                    </p>
                  </div>

                  <div className="text-center mt-6">
                    {submitted ? (
                      <PulseLoader color="#4299e1" size={10} />
                    ) : (
                      <button
                        className="bg-blue-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        SUBMIT
                      </button>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default ChangePassword;
