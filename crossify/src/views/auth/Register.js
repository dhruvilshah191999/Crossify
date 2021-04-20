import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Facebook from "./Facebook";
import Google from "./Google";
import Key from "config/default.json";
import CryptoJS from "crypto-js";
import { Formik, useField } from "formik";

var vertical = "top";
var horizontal = "center";

export default function Register() {
  let history = useHistory();
  const [image, setImage] = useState("");
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
    repassword: "",
    fname: "",
    lname: "",
  });
  const { email, password, repassword, fname, lname } = formData;

  const onChange = (e) =>
    SetFormData({ ...formData, [e.target.name]: e.target.value });

  const [checked, setChecked] = useState(false);
  const handleCheck = (e) => setChecked(!checked);
  const [errorStatus, setError] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };
  function photoName(event) {
    //var name = ;
    document.getElementById(
      "DP_Name"
    ).textContent = `${event.target.files[0].name}`;

    //$("#my_image").attr("src", "second.jpg");

    document.getElementById("my_image").src =
      "../../assets/img/bg_crossify.png";
    // console.log(`Selected file - ${event.target.files[0].name}`);
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
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
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-700 text-sm font-bold">
                    Sign Up With
                  </h6>
                </div>
                <div className="btn-wrapper text-center ">
                  <Google />
                  <Facebook />
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-600 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <Formik
                  initialValues={formData}
                  validate={() => {
                    const errors = {};
                    if (!fname) {
                      errors.fname = "First name is required !";
                    } else if (!lname) {
                      errors.lname = "Last name is required !";
                    } else if (!email) {
                      errors.email = "Email is Required !";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
                    ) {
                      errors.email = "Invalid email address !";
                    } else if (!password) {
                      errors.password = "Password is required !";
                    } else if (password.length < 6) {
                      errors.password = "Minimim 6 characters are required !";
                    } else if (!repassword) {
                      errors.repassword = "Re enter your password !";
                    } else if (password != repassword) {
                      errors.repassword = "Password does not match !";
                    } else if (!checked) {
                      errors.checkbox =
                        "You must have to agree our terms and conditions";
                    }
                    return errors;
                  }}
                  onSubmit={async ({ setSubmitting }) => {
                    if (image === "") {
                      setError(true);
                      setMessage("Please Enter Your Details");
                    } else {
                      var emailname = email.split("@");
                      var url =
                        "https://api.cloudinary.com/v1_1/crossify/image/upload/";
                      var path = "User_Profile/" + emailname[0];
                      var data = new FormData();
                      data.append("file", image);
                      data.append("upload_preset", "crossify-project");
                      data.append("public_id", path);
                      const config = {
                        headers: { "X-Requested-With": "XMLHttpRequest" },
                      };
                      axios
                        .post(url, data, config)
                        .then(async (res) => {
                          const userdata = {
                            fname,
                            lname,
                            email,
                            password,
                            photo: res.data.url,
                          };
                          try {
                            const config = {
                              method: "POST",
                              header: {
                                "Content-Type": "application/json",
                              },
                              validateStatus: () => true,
                            };
                            const finaldata = await axios.post(
                              "/api/signup",
                              userdata,
                              config
                            );
                            if (finaldata.data.is_error) {
                              setError(true);
                              setMessage(finaldata.data.message);
                            } else {
                              var ciphertext = CryptoJS.AES.encrypt(
                                JSON.stringify(finaldata.data),
                                Key.Secret
                              ).toString();
                              localStorage.setItem("email", ciphertext);
                              history.push("/auth/register/step2");
                            }
                          } catch (err) {
                            console.log(err);
                          }
                        })
                        .catch((err) => console.log(err));
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
                    <form>
                      <div className="-mx-3 md:flex">
                        <div className="md:w-1/2 md:mb-0 w-full w-1/2 mb-3 mr-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="reg-fname"
                          >
                            First Name
                          </label>
                          <input
                            id="reg-fname"
                            type="text"
                            className="w-full rounded py-3 px-3 text-gray-700 bg-white shadow focus:outline-none focus:shadow-outline text-sm ease-linear transition-all duration-150"
                            placeholder="First Name"
                            name="fname"
                            value={fname}
                            onChange={(e) => onChange(e)}
                            onBlur={handleBlur}
                          />
                          <p className="FormError">
                            {errors.fname && touched.fname && errors.fname}
                          </p>
                        </div>
                        <div className="md:w-1/2 md:mb-0 w-full w-1/2 m3-6">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="reg-lname"
                          >
                            Last Name
                          </label>
                          <input
                            id="reg-lname"
                            type="text"
                            className="w-full rounded py-3 px-3 text-gray-700 bg-white shadow focus:outline-none focus:shadow-outline text-sm ease-linear transition-all duration-150"
                            placeholder="Last Name"
                            name="lname"
                            value={lname}
                            onChange={(e) => onChange(e)}
                            onBlur={handleBlur}
                          />
                          <p className="FormError">
                            {errors.lname && touched.lname && errors.lname}
                          </p>
                        </div>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="reg-email"
                        >
                          Email
                        </label>
                        <input
                          id="reg-email"
                          type="email"
                          className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
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
                          htmlFor="reg-password"
                        >
                          Password
                        </label>
                        <input
                          id="reg-password"
                          type="password"
                          className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
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

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="reg-re-password"
                        >
                          Re-Type Password
                        </label>
                        <input
                          id="reg-re-password"
                          type="password"
                          className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Re-Type Password"
                          name="repassword"
                          value={repassword}
                          onChange={(e) => onChange(e)}
                          onBlur={handleBlur}
                        />
                        <p className="FormError">
                          {errors.repassword &&
                            touched.repassword &&
                            errors.repassword}
                        </p>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="reg-photo"
                        >
                          <span className="fa-stack fa-2x mt-3 mb-2">
                            <i className="fas fa-circle fa-stack-2x" />
                            <i className="fas fa-angle-double-up fa-stack-1x fa-inverse" />
                          </span>
                          Upload Profile Photo
                          <span
                            id="DP_Name"
                            style={{
                              float: "right",
                              marginTop: "24px",
                              marginRight: "10px",
                            }}
                          >
                            <img id="my_image" src=""></img>
                          </span>
                        </label>

                        <input
                          id="reg-photo"
                          type="file"
                          accept="image/*"
                          className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          onChange={(e) => setImage(e.target.files[0])}
                          onChange={photoName}
                          required
                          hidden
                        />
                      </div>

                      <img
                        src={
                          "file:///E:/CROSSIFY/Crossify%20Web%20App/crossify/src/assets/logos/google.png"
                        }
                      ></img>

                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            name="checkbox"
                            value={checked}
                            onChange={(e) => handleCheck(e)}
                            onBlur={handleBlur}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            I agree with the{" "}
                            <a
                              href="#pablo"
                              className="text-blue-500"
                              onClick={(e) => e.preventDefault()}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                        <p className="FormError">{errors.checkbox}</p>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-lightalpha hover:bg-alpha text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          Create Account
                        </button>
                      </div>

                      <div className="text-center mt-6">
                        Already A Member ?
                        <a className="text-blue-500" href="login">
                          {" "}
                          Log In
                        </a>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
