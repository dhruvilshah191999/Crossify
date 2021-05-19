import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Moment from "moment";
import City from "../auth/states-and-districts.json";
import axios from "axios";
import Sidebar from "components/Sidebar/ManageEventSidebar.js";
import MapContainer from "components/Maps/MapCode";
import dummyPF from "assets/img/demopf.png";
import { Formik } from "formik";
import { ModalManager } from "react-dynamic-modal";
import ViewFeedback from "components/Modals/ViewFeedback";
import ScaleLoader from "react-spinners/ScaleLoader";
import PulseLoader from "react-spinners/PulseLoader";
import DeleteMyEvent from "components/SweetAlerts/DeleteMyEventButton";
import MultipleSelect from "components/Inputs/MultiSelect";

export default function GeneralSettings(props) {
  let history = useHistory();
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setloading] = useState(false);
  const [submitloading, setsubmitLoading] = useState(false);
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
    endregister_date: null,
    maximum_participants: "",
  });

  const {
    event_name,
    privacy,
    address,
    postalcode,
    starting_date,
    endregister_date,
    ending_date,
    starting_time,
    ending_time,
    maximum_participants,
  } = formData;

  const openModal = () => {
    ModalManager.open(
      <ViewFeedback
        onRequestClose={() => true}
        event_id={id}
        event_name={event_name}
      />
    );
  };

  const handleCategory = (childData) => {
    setCategory(childData);
  };

  const onChange = (e) =>
    SetformData({ ...formData, [e.target.name]: e.target.value });

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
        if (
          new Date(finaldata.data.event_data.date) > new Date() &&
          finaldata.data.event_data.is_active
        ) {
          setStatus("approved");
        } else if (
          new Date(finaldata.data.event_data.date) < new Date() &&
          finaldata.data.event_data.is_active
        ) {
          setStatus("completed");
        } else if (
          finaldata.data.event_data.visibility !== "rejected" &&
          !finaldata.data.event_data.is_active
        ) {
          setStatus("pending");
        } else {
          setStatus("rejected");
        }

        SetformData({
          event_name: finaldata.data.event_data.event_name,
          privacy: finaldata.data.event_data.visibility,
          address: finaldata.data.event_data.location,
          postalcode: finaldata.data.event_data.pincode,
          endregister_date: Moment(
            finaldata.data.event_data.ending_date_registration
          ).format("YYYY-MM-DD"),
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
        setCategory(finaldata.data.event_data.category_list);
        console.log(finaldata.data.event_data.category_list);

        setTimeout(() => {
          setloading(true);
        }, 100);
      }
    }
    fetchData();
  }, [id]);
  const handleCallback = (childData) => {
    setlatitude(childData.lat);
    setlongitude(childData.lng);
  };

  var color = "orange";
  if (status === "rejected") {
    color = "red";
  } else if (status === "completed") {
    color = "blue";
  } else if (status === "approved") {
    color = "green";
  }
  return (
    <>
      <Sidebar />
      <div className={loading ? "flex flex-wrap" : ""}>
        {loading ? (
          <Formik
            initialValues={formData}
            validate={() => {
              const errors = {};
              if (!event_name) {
                errors.event_name = "Event name is required !";
              } else if (!address) {
                errors.address = "Address is required !";
              } else if (!statename || statename === "Select Option") {
                errors.statename = "State is required !";
              } else if (!cityname || cityname === "Select Option") {
                errors.cityname = "City is required !";
              } else if (!postalcode) {
                errors.postalcode = "PostalCode is required !";
              } else if (
                !maximum_participants ||
                maximum_participants === " "
              ) {
                errors.maximum_participants = "Capacity is required !";
              }
              return errors;
            }}
            onSubmit={async ({ setSubmitting }) => {
              setsubmitLoading(true);
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
                ending_date_registration: endregister_date,
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
                history.go(0);
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
                        <span
                          className={
                            "text-lg text-" +
                            color +
                            "-500 ml-2 font-semibold capitalize"
                          }
                        >
                          {status}
                        </span>
                        <button
                          className={
                            status === "rejected"
                              ? "text-red-500 text-sm ml-2"
                              : "hidden"
                          }
                          onClick={() => openModal()}
                        >
                          <i className="fas fa-info-circle"></i>
                        </button>
                      </h6>
                      {submitloading ? (
                        <div align="center">
                          <PulseLoader color="#48bb78" size={10} />
                        </div>
                      ) : (
                        <button
                          className="bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Save &nbsp; <i className="fas fa-save"></i>
                        </button>
                      )}
                    </div>
                  </div>
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
                            <p className="FormError">
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
                              className="block shadow focus:shadow-outline pr-2  text-sm appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2half px-4 pr-8 rounded ease-linear transition-all duration-150"
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
                            <p className="FormError">
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
                            <p className="FormError">{errors.statename}</p>
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
                            <p className="FormError">{errors.cityname}</p>
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
                            <p className="FormError">
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
                            <p className="FormError">
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
                              name="endregister_date"
                              value={endregister_date}
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
                        {/* here */}
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Categories
                            </label>
                            <MultipleSelect
                              selectedValues={category}
                              parentCallback={handleCategory}
                            ></MultipleSelect>
                          </div>
                        </div>
                        {/* to here */}
                      </div>
                    </form>
                    <div className="px-4 mt-2 text-right">
                      <DeleteMyEvent event_id={id} />
                    </div>
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
