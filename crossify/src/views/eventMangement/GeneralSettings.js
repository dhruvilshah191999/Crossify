import React, { useState, useEffect } from "react";
import UploadPic from "components/Inputs/UploadPic";
import { useParams } from "react-router";
import Moment from "moment";
import City from "../auth/states-and-districts.json";
import axios from "axios";
import Sidebar from "components/Sidebar/ManageEventSidebar.js";
import MapContainer from "components/Maps/MapCode";
import dummyPF from "assets/img/demopf.png";
import { Formik } from "formik";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import ViewFeedback from "components/Modals/ViewFeedback";
import ScaleLoader from "react-spinners/ScaleLoader";

var vertical = "top";
var horizontal = "center";
export default function GeneralSettings(props) {
  const openModal = () => {
    ModalManager.open(<ViewFeedback onRequestClose={() => true} />);
  };
  const [successStatus, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const [latitude, setlatitude] = useState(23.106517);
  const [longitude, setlongitude] = useState(72.59482);
  const [statename, setStateName] = useState("");
  const [cityname, setCityName] = useState("");
  const [formData, SetformData] = useState({
    event_name: "",
    privacy: "",
    address: "",
    postalcode: "",
    starting_date: null,
    ending_date: null,
    starting_time: null,
    ending_time: null,
    maximum_participants: "",
  });

  const {
    event_name,
    privacy,
    address,
    postalcode,
    starting_date,
    ending_date,
    starting_time,
    ending_time,
    maximum_participants,
  } = formData;

  const onChange = (e) =>
    SetformData({ ...formData, [e.target.name]: e.target.value });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  var districts = [];
  if (statename !== "") {
    const citylist = City.states.find((city) => city.state === statename);
    districts = citylist.districts;
  }

  useEffect(() => {
    async function fetchData() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        event_id: id,
      };
      const finaldata = await axios.post(
        "/api/profile/event-details",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        SetformData({
          event_name: finaldata.data.event_data.event_name,
          privacy: finaldata.data.event_data.visibility,
          address: finaldata.data.event_data.location,
          postalcode: finaldata.data.event_data.pincode,
          starting_date: Moment(finaldata.data.event_data.startdate).format(
            "YYYY-MM-DD"
          ),
          ending_date: Moment(finaldata.data.event_data.date).format(
            "YYYY-MM-DD"
          ),
          starting_time: Moment(finaldata.data.event_data.startdate).format(
            "HH:mm"
          ),
          ending_time: Moment(finaldata.data.event_data.date).format("HH:mm"),
          maximum_participants: finaldata.data.event_data.maximum_participants,
        });
        setlatitude(finaldata.data.event_data.latitude);
        setlongitude(finaldata.data.event_data.longitude);
        setStateName(finaldata.data.event_data.state);
        setCityName(finaldata.data.event_data.city);
        setTimeout(() => {
          setloading(true);
        }, 100);
      }
    }
    fetchData();
  }, []);

  const handleCallback = (childData) => {
    setlatitude(childData.lat);
    setlongitude(childData.lng);
  };
  return (
    <>
      <Sidebar />
      <div className={loading?"flex flex-wrap":""}>
        {loading ? (
          <Formik
            initialValues={formData}
            validate={() => {
              const errors = {};
              if (!event_name) {
                errors.event_name = "Event Name is Required!!!";
              } else if (!address) {
                errors.address = "Address is Required !!!";
              } else if (!statename || statename === "Select Option") {
                errors.statename = "State is Required !!!";
              } else if (!cityname || cityname === "Select Option") {
                errors.cityname = "City is Required !!!";
              } else if (!postalcode) {
                errors.postalcode = "PostalCode is Required !!!";
              } else if (postalcode.length != 6) {
                errors.postalcode = "Pin Code Should Be in 6 Digits !!!";
              } else if (
                !maximum_participants ||
                maximum_participants === " "
              ) {
                errors.maximum_participants = "Capacity is Required !!!";
              }
              return errors;
            }}
            onSubmit={async ({ setSubmitting }) => {
              var object = {
                event_id: id,
                event_name,
                visibility: privacy,
                address,
                city: cityname,
                state: statename,
                pincode: postalcode,
                latitude,
                longitude,
                starting_date,
                ending_date,
                starting_time,
                ending_time,
                maximum_participants,
              };

              const config = {
                method: "POST",
                header: {
                  "Content-Type": "application/json",
                },
              };

              const finaldata = await axios.post(
                "/api/manage/general-update",
                object,
                config
              );
              if (finaldata.data.is_error) {
                console.log(finaldata.data.message);
              } else {
                setSuccess(true);
                setMessage("Event Updated Successfully !!!");
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleReset,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <div className="w-full  px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                  <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                      <h6 className="text-gray-800 text-xl font-bold">
                        Event Status :
                        {/* <i className="fas fa-circle text-orange-500 p-2 text-xs text-center"></i> */}
                        <span className="text-lg text-orange-500 ml-2 font-semibold">
                          Pending
                        </span>
                        <button
                          className="text-orange-500 text-sm ml-2"
                          onClick={() => openModal()}
                        >
                          <i className="fas fa-info-circle"></i>
                        </button>
                      </h6>
                      <button
                        className="bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Save &nbsp; <i className="fas fa-save"></i>
                      </button>
                    </div>
                  </div>

                  <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={successStatus}
                    style={{ marginLeft: "120px" }}
                    autoHideDuration={2000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose}>{message}</Alert>
                  </Snackbar>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                      <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                        Event Information
                      </h6>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-8/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Event Name
                            </label>
                            <input
                              type="text"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              name="event_name"
                              value={event_name}
                              onChange={(e) => onChange(e)}
                              onBlur={handleBlur}
                            />
                            <p style={{ color: "#3182ce" }}>
                              {errors.event_name &&
                                touched.event_name &&
                                errors.event_name}
                            </p>
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Privacy
                            </label>
                            <select
                              class="block shadow focus:shadow-outline pr-2  text-sm appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2half px-4 pr-8 rounded ease-linear transition-all duration-150"
                              id="grid-state"
                              placeholder="Select your relevant Categories"
                              style={{ outline: "none" }}
                              name="privacy"
                              value={privacy}
                              onChange={(e) => onChange(e)}
                            >
                              <option>Public</option>
                              <option>Private</option>
                              <option>Closed</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <hr className="mt-6 border-b-1 border-gray-400" />

                      <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                        place Information
                      </h6>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              name="address"
                              value={address}
                              onChange={(e) => onChange(e)}
                              onBlur={handleBlur}
                            />
                            <p style={{ color: "#3182ce" }}>
                              {errors.address &&
                                touched.address &&
                                errors.address}
                            </p>
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
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
                              value={statename}
                            >
                              {City.states.map((city) => (
                                <option value={city.state} key={city.state}>
                                  {city.state}
                                </option>
                              ))}
                            </select>
                            <p style={{ color: "#3182ce" }}>
                              {errors.statename}
                            </p>
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
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
                              value={cityname}
                            >
                              {districts.map((element) => (
                                <option value={element} key={element}>
                                  {element}
                                </option>
                              ))}
                            </select>
                            <p style={{ color: "#3182ce" }}>
                              {errors.cityname}
                            </p>
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Postal Code
                            </label>
                            <input
                              type="number"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              name="postalcode"
                              value={postalcode}
                              onChange={(e) => onChange(e)}
                              onBlur={handleBlur}
                            />
                            <p style={{ color: "#3182ce" }}>
                              {errors.postalcode &&
                                touched.postalcode &&
                                errors.postalcode}
                            </p>
                          </div>
                        </div>
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Map
                            </label>
                            <MapContainer
                              lat={latitude}
                              long={longitude}
                              parentCallback={handleCallback}
                            />
                          </div>
                        </div>
                      </div>

                      <hr className="mt-6 border-b-1 border-gray-400" />

                      <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                        Capacity & Timing
                      </h6>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Total Slots (Capacity)
                            </label>
                            <input
                              type="number"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              name="maximum_participants"
                              value={maximum_participants}
                              onChange={(e) => onChange(e)}
                              onBlur={handleBlur}
                            />
                            <p style={{ color: "#3182ce" }}>
                              {errors.maximum_participants &&
                                touched.maximum_participants &&
                                errors.maximum_participants}
                            </p>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Last Registraiton Date
                            </label>
                            <input
                              type="date"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Starting Date
                            </label>
                            <input
                              type="date"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              name="starting_date"
                              value={starting_date}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Ending Date
                            </label>
                            <input
                              type="date"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              name="ending_date"
                              value={ending_date}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Starting Time
                            </label>
                            <input
                              type="time"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              name="starting_time"
                              value={starting_time}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Ending Time
                            </label>
                            <input
                              type="time"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              name="ending_time"
                              value={ending_time}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        ) : (
          <div
            className="flex justify-center items-center"
            style={{ height: "60vh" }}
          >
            <ScaleLoader color="#825ee4" size={60} />
          </div>
        )}
      </div>
    </>
  );
}
GeneralSettings.defaultProps = {
  club_name: "Badshah gang",
  description: "je baat je baat",
  tags: ["this", "that"],
  rules: "There is one rule there is no rule at all.",
  profile_photo: dummyPF,
  place: "b-34 ganeshpark-1 ghatlodia ahmedabad",
  max_members: 100,
  joining_criteria: "have to be a good person",
  category_list: ["Cricket", "Sports"],
  privacy: "Public",
};
