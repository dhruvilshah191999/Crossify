import React, { useState, useContext } from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Facebook from "./LoginFacebook";
import Google from "./LoginGoogle";
import { Link } from "react-router-dom";
import { UserContext } from "context/usercontext";
import { notifySuccessLogin } from "notify";
import { Formik } from "formik";

var vertical = "top";
var horizontal = "center";

function Login() {
  const { islogin_dispatch, dispatch } = useContext(UserContext);
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  const [errorStatus, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { email, password } = formData;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const sendMail = async () => {
    var data = {
      email: email,
      url: window.location.origin,
    };
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    await axios.post("/api/manage/ResendMail", data, config);
    setError(false);
  };

  const onChange = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={errorStatus}
          autoHideDuration={
            message.split(" ")[0].toLowerCase() === "verify" ? 10000 : 3000
          }
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose}>
            {message}
            {message.split(" ")[0].toLowerCase() === "verify" && (
              <button
                className="font-semibold ml-2 text-beta border-b-beta"
                onClick={sendMail}
              >
                {" "}
                Resend Mail
              </button>
            )}
          </Alert>
        </Snackbar>
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-4 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center">
                  <h1 className="text-gray-600 text-sm font-bold">
                    Sign in with
                  </h1>
                </div>
                <div className="btn-wrapper text-center ">
                  <Google />
                  <Facebook />
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Formik
                  initialValues={formData}
                  validate={() => {
                    const errors = {};
                    if (!email) {
                      errors.email = "Email or username is required !";
                    } else if (!password) {
                      errors.password = "Password is required !";
                    }
                    return errors;
                  }}
                  onSubmit={async ({ setSubmitting }) => {
                    const Credentials = {
                      login_username: email,
                      password,
                    };
                    try {
                      const config = {
                        method: "POST",
                        header: {
                          "Content-Type": "application/json",
                        },
                        validateStatus: () => true,
                      };
                      const res = await axios.post(
                        "/api/login",
                        Credentials,
                        config
                      );
                      if (res.data.is_error) {
                        setError(true);
                        setMessage(res.data.message);
                      } else {
                        localStorage.setItem("jwt", res.data.token);
                        islogin_dispatch({
                          type: "Login-Status",
                          status: true,
                        });
                        dispatch({
                          type: "ADD_USER",
                          payload: res.data.data,
                        });
                        window.location.replace("/");
                        const name =
                          res.data.data.fname + " " + res.data.data.lname;
                        notifySuccessLogin(name);
                      }
                    } catch (error) {
                      console.log(error);
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
                          Username or Email
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
                          Password
                        </label>
                        <input
                          type="password"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={(e) => onChange(e)}
                          onBlur={handleBlur}
                        />
                        <p className="FormError">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-lightalpha hover:bg-alpha text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="flex flex-wrap relative text-lg font-semibold">
              <div className="w-1/2">
                <Link to="/auth/forgotpassword" className="text-gray-300">
                  <small>Forgot password ?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-gray-300">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    </>
  );
}

export default Login;
