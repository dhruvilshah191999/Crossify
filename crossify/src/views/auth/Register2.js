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

export default function Register2() {
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
  const [cityname, setCityName] = useState("");
  const [formData, setformData] = useState({
    username: "",
    address: "",
    pincode: "",
  });
  var decryptedData;
  var localemail = localStorage.getItem("email");
  if (localemail) {
    var bytes = CryptoJS.AES.decrypt(localemail, Key.Secret);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    history.push("/auth/register");
  }

  var { username, address, pincode } = formData;
  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  var districts = [];
  if (statename !== "") {
    const citylist = City.states.find((city) => city.state === statename);
    districts = citylist.districts;
  }

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
                      errors.username = "User Name is Required !!!";
                    } else if (!address) {
                      errors.address = "Address is Required !!!";
                    } else if (
                      statename === "Select Option" ||
                      statename === ""
                    ) {
                      errors.statename = "State Name is Required !!!";
                    } else if (
                      cityname === "Select Option" ||
                      cityname === ""
                    ) {
                      errors.cityname = "City Name is Required !!!";
                    } else if (!pincode) {
                      errors.pincode = "Pin Code is Required !!!";
                    } else if (pincode.length != 6) {
                      errors.pincode = "Pin Code Should Be in 6 Digits !!!";
                    }
                    return errors;
                  }}
                  onSubmit={async ({ setSubmitting }) => {
                    if (latitude === undefined || longitude === undefined) {
                      longitude = 0;
                      latitude = 0;
                    } else {
                      var data = {
                        username,
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
                          "/api/step2",
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
                          className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Enter Username"
                          onBlur={handleBlur}
                        />
                        <p style={{ color: "#fb8090" }}>
                          {errors.username &&
                            touched.username &&
                            errors.username}
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
                        <p style={{ color: "#fb8090" }}>
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
                        </div>
                      </div>

                      <div className="text-center">
                        <p style={{ color: "#fb8090" }}>
                          {errors.statename}
                          {errors.cityname}
                          {errors.pincode && touched.pincode && errors.pincode}
                        </p>
                      </div>
                      <div className="-mx-3 md:flex mt-6">
                        <div className="md:w-1/2 md:mb-0 w-full w-1/2 mr-3">
                          <button
                            className="bg-lightalpha hover:bg-alpha text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
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
