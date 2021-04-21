import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import City from "./states-and-districts.json";
import { usePosition } from "use-position";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Key from "config/default.json";
import CryptoJS from "crypto-js";
import { Formik, useField } from "formik";

export default function SocialRegister2() {
  var vertical = "top";
  var horizontal = "center";
  let history = useHistory();
  const watch = true;
  const [errorStatus, setError] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };
  let { latitude, longitude } = usePosition(watch);
  const [statename, setStateName] = useState("");
  const [usernameStatus, setUsername] = useState(false);
  const [cityname, setCityName] = useState("");
  const [formData, setformData] = useState({
    username: "",
    address: "",
    pincode: "",
    password: "",
    repassword: "",
  });
  var decryptedData;
  var localemail = localStorage.getItem("email");
  if (localemail) {
    var bytes = CryptoJS.AES.decrypt(localemail, Key.Secret);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    history.push("/auth/register");
  }

  var { username, address, pincode, password, repassword } = formData;
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };

    axios
      .post("/api/manage/UserNameCheck", { username: e.target.value }, config)
      .then((res) => {
        if (!res.data.is_error) {
          setUsername(true);
        } else {
          setUsername(false);
        }
      });
  };

  var districts = [];
  if (statename !== "") {
    const citylist = City.states.find((city) => city.state === statename);
    districts = citylist.districts;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (latitude === undefined || longitude === undefined) {
      longitude = 0;
      latitude = 0;
    }

    if (
      username === "" ||
      password === "" ||
      repassword === "" ||
      pincode === "" ||
      address === ""
    ) {
      setError(true);
      setMessage("Please Enter Your Details");
    } else if (
      cityname === "Select Option" ||
      statename === "Select Option" ||
      cityname === "" ||
      statename === ""
    ) {
      setError(true);
      setMessage("Please Select the State,City");
    } else if (password !== repassword) {
      setError(true);
      setMessage("Password and Re-type Password Not Matched");
    } else {
      var data = {
        username,
        password,
        address,
        pincode,
        city: cityname,
        state: statename,
        lat: latitude,
        long: longitude,
        email: decryptedData.email,
      };
      try {
        const config = {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          validateStatus: () => true,
        };
        const finaldata = await axios.post("/api/socialstep2", data, config);
        if (finaldata.data.is_error) {
          setError(true);
          setMessage(finaldata.data.message);
        } else {
          history.push("/auth/register/step3");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full mt-10">
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
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-700 text-sm font-bold">
                    For Your Better Experience
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Formik
                  initialValues={formData}
                  validate={() => {
                    const errors = {};
                    if (!username) {
                      errors.username = "Username is required !";
                    } else if (usernameStatus) {
                      errors.username = "Username is already exists !";
                    } else if (!password) {
                      errors.password = "Password is required !";
                    } else if (password.length < 6) {
                      errors.password = "Minimim 6 characters are required !";
                    } else if (!repassword) {
                      errors.repassword = "Re-Password is required !";
                    } else if (password != repassword) {
                      errors.repassword = "Password does not match !";
                    } else if (!address) {
                      errors.address = "Address is required !";
                    } else if (
                      statename === "Select Option" ||
                      statename === ""
                    ) {
                      errors.state = "State name is required !";
                    } else if (
                      cityname === "Select Option" ||
                      cityname === ""
                    ) {
                      errors.cityname = "City name is required !";
                    } else if (!pincode) {
                      errors.pincode = "Pin code is required !";
                    } else if (pincode.length != 6) {
                      errors.pincode = "Pin code should be in 6 digits !!!";
                    }
                    return errors;
                  }}
                  onSubmit={async ({ setSubmitting }) => {
                    if (latitude === undefined || longitude === undefined) {
                      longitude = 0;
                      latitude = 0;
                    }

                    var data = {
                      username,
                      password,
                      address,
                      pincode,
                      city: cityname,
                      state: statename,
                      lat: latitude,
                      long: longitude,
                      email: decryptedData.email,
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
                        "/api/socialstep2",
                        data,
                        config
                      );
                      if (finaldata.data.is_error) {
                        setError(true);
                        setMessage(finaldata.data.message);
                      } else {
                        history.push("/auth/register/step3");
                      }
                    } catch (err) {
                      console.log(err);
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
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="reg-country"
                        >
                          Username
                        </label>
                        <input
                          id="reg-country"
                          type="text"
                          name="username"
                          value={username}
                          onChange={(e) => onChange(e)}
                          onBlur={handleBlur}
                          className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Enter Username"
                          required
                        />
                        <p className="FormError">
                          {errors.username &&
                            touched.username &&
                            errors.username}
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
                        ></input>
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
                        ></input>
                        <p className="FormError">
                          {errors.repassword &&
                            touched.repassword &&
                            errors.repassword}
                        </p>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="reg-address"
                        >
                          address
                        </label>
                        <textarea
                          id="reg-address"
                          name="address"
                          onChange={(e) => onChange(e)}
                          onBlur={handleBlur}
                          value={address}
                          className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        />
                        <p className="FormError">
                          {errors.address && touched.address && errors.address}
                        </p>
                      </div>

                      <div className="-mx-6 md:flex">
                        <div className="md:w-1/2 md:mb-0 w-full w-1/2 mb-3 mr-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="reg-state"
                          >
                            State
                          </label>
                          <select
                            id="reg-state"
                            name="state"
                            autoComplete="state"
                            className="w-full rounded py-3 px-3 text-gray-700 bg-white shadow focus:outline-none focus:shadow-outline text-sm ease-linear transition-all duration-150"
                            onChange={(e) => setStateName(e.target.value)}
                            onBlur={handleBlur}
                          >
                            {City.states.map((city) => (
                              <option value={city.state} key={city.state}>
                                {city.state}
                              </option>
                            ))}
                          </select>
                          <p className="FormError">{errors.state}</p>
                        </div>

                        <div className="md:w-1/2 md:mb-0 w-full w-1/2 mb-3 mr-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="reg-city"
                          >
                            City
                          </label>
                          <select
                            id="reg-city"
                            name="city"
                            autoComplete="city"
                            className="w-full rounded py-3 px-3 text-gray-700 bg-white shadow focus:outline-none focus:shadow-outline text-sm ease-linear transition-all duration-150"
                            onChange={(e) => setCityName(e.target.value)}
                            onBlur={handleBlur}
                          >
                            {districts.map((element) => (
                              <option value={element} key={element}>
                                {element}
                              </option>
                            ))}
                          </select>
                          <p className="FormError">{errors.cityname}</p>
                        </div>

                        <div className="md:w-1/2 md:mb-0 w-full w-1/2 mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="reg-pin-code"
                          >
                            pin code
                          </label>
                          <input
                            id="reg-pin-code"
                            type="number"
                            name="pincode"
                            value={pincode}
                            onChange={(e) => onChange(e)}
                            onBlur={handleBlur}
                            className="w-full rounded py-3 px-3 text-gray-700 bg-white shadow focus:outline-none focus:shadow-outline text-sm ease-linear transition-all duration-150"
                          />
                          <p className="FormError">
                            {errors.pincode &&
                              touched.pincode &&
                              errors.pincode}
                          </p>
                        </div>
                      </div>

                      <div className="-mx-3 md:flex mt-6">
                        <div className="md:w-1/2 md:mb-0 w-full w-1/2 mr-3">
                          <button
                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleSubmit}
                          >
                            Next
                          </button>
                        </div>
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
