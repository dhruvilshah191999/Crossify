import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import City from "./states-and-districts.json";
import { usePosition } from "use-position";
import Key from "config/default.json";
import CryptoJS from "crypto-js";
import { Formik } from "formik";
import moment from "moment";

export default function SocialRegister2() {
  let history = useHistory();
  const watch = true;
  let { latitude, longitude } = usePosition(watch);
  const [statename, setStateName] = useState("");
  const [usernameStatus, setUsername] = useState(false);
  const [username, setusername] = useState(null);
  const [cityname, setCityName] = useState("");
  const [formData, setformData] = useState({
    address: "",
    pincode: "",
    password: "",
    dob: "",
    occupation: "",
    about_me: "",
    repassword: "",
  });

  var decryptedData;
  var RegisterData = localStorage.getItem("RegisterData");
  if (RegisterData) {
    var bytes = CryptoJS.AES.decrypt(RegisterData, Key.Secret);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    history.push("/auth/register");
  }

  var { address, pincode, password, repassword, dob, about_me, occupation } =
    formData;

  var onUsernameChange = (e) => {
    setusername(e.target.value);
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
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  var districts = [];
  if (statename !== "") {
    const citylist = City.states.find((city) => city.state === statename);
    districts = citylist.districts;
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full mt-10">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-700 text-2xl font-semibold">
                    <i className="far fa-address-card text-2xl"></i>&nbsp;
                    Personal Info
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
                    }
                    if (!password) {
                      errors.password = "Password is required !";
                    } else if (password.length < 6) {
                      errors.password = "Minimim 6 characters are required !";
                    } else if (!repassword) {
                      errors.repassword = "Re-Password is required !";
                    } else if (password !== repassword) {
                      errors.repassword = "Password does not match !";
                    }
                    if (!address) {
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
                    } else if (pincode.length !== 6) {
                      errors.pincode = "Pin code should be in 6 digits !!!";
                    }
                    if (!dob) {
                      errors.dob = "Date of Birth is required !";
                    }
                    if (!occupation) {
                      errors.occupation = "Occupation is required !";
                    }
                    if (!about_me) {
                      errors.about_me = "About me is required !";
                    } else if (about_me.length < 30) {
                      errors.about_me = "Minimum 30 words are required !!!";
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
                      address,
                      pincode,
                      dob,
                      city: cityname,
                      state: statename,
                      lat: latitude,
                      long: longitude,
                      email: decryptedData.email,
                      occupation,
                      photo: decryptedData.photo,
                      socialId: decryptedData.socialId,
                      about_me,
                      fname: decryptedData.fname,
                      lname: decryptedData.lname,
                      password,
                    };
                    var ciphertext = CryptoJS.AES.encrypt(
                      JSON.stringify(data),
                      Key.Secret
                    ).toString();
                    localStorage.setItem("RegisterData", ciphertext);
                    history.push("/auth/register/step3");
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
                          onChange={(e) => onUsernameChange(e)}
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
                          htmlFor="reg-country"
                        >
                          Date Of Birth
                        </label>
                        <input
                          id="reg-country"
                          type="date"
                          name="dob"
                          max={moment(new Date()).format("YYYY-MM-DD")}
                          value={dob}
                          onChange={(e) => onChange(e)}
                          className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Select Your Date Of Birth"
                          onBlur={handleBlur}
                        />
                        <p className="FormError">
                          {errors.dob && touched.dob && errors.dob}
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

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="reg-country"
                        >
                          Occupation
                        </label>
                        <input
                          id="reg-country"
                          type="text"
                          name="occupation"
                          value={occupation}
                          onChange={(e) => onChange(e)}
                          className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Enter Your Occupation"
                          onBlur={handleBlur}
                        />
                        <p className="FormError">
                          {errors.occupation &&
                            touched.occupation &&
                            errors.occupation}
                        </p>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="reg-address"
                        >
                          About Me
                        </label>
                        <textarea
                          id="reg-address"
                          name="about_me"
                          onChange={(e) => onChange(e)}
                          onBlur={handleBlur}
                          value={about_me}
                          className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Write About Yourself."
                        />
                        <p className="FormError">
                          {errors.about_me &&
                            touched.about_me &&
                            errors.about_me}
                        </p>
                      </div>

                      <div className="-mx-3 md:flex mt-6">
                        <div className="md:w-1/2 md:mb-0 w-full w-1/2 mr-3">
                          <button
                            className="bg-lightalpha hover:bg-alpha text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
