import React, { useState, useEffect } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import MultiSelect from "components/Inputs/EventMultiSelect";
import axios from "axios";
import MapContainer from "../Maps/AddMapCode";
import { usePosition } from "use-position";
import UploadPic from "components/Inputs/UploadPic";
import City from "../../views/auth/states-and-districts.json";
import { InputTagsContainer } from "react-input-tags";
import { Formik } from "formik";
import moment from "moment";

Modal.defaultStyles = {};

var customModalStyles = {
  content: {
    width: "70%",
    marginTop: "20px",
    transform: "translate(-50%, -50%)",
    height: "600px", // <-- This sets the height
    overlfow: "scroll", // <-- This tells the modal to scrol
  },
};

function MyModal(props) {
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [newlatitude, setlatitude] = useState(23.106517);
  const [newlongitude, setlongitude] = useState(72.59482);
  const [statename, setStateName] = useState("");
  const [cityname, setCityName] = useState("");
  const [formData, SetformData] = useState({
    event_name: "",
    privacy: "Public",
    address: "",
    postalcode: "",
    description: "",
    eligibility: "",
    capacity: 0,
    last_registraiton_date: null,
    starting_date: props.startDate || null,
    ending_date: props.endDate || null,
    starting_time: null,
    ending_time: null,
  });

  const {
    event_name,
    privacy,
    address,
    postalcode,
    description,
    eligibility,
    capacity,
    last_registraiton_date,
    starting_date,
    ending_date,
    starting_time,
    ending_time,
  } = formData;

  const onChange = (e) =>
    SetformData({ ...formData, [e.target.name]: e.target.value });

  var districts = [];
  if (statename !== "") {
    const citylist = City.states.find((city) => city.state === statename);
    districts = citylist.districts;
  }
  let { latitude, longitude } = usePosition(true);
    useEffect(() => {
      setTimeout(() => {
        setLoading(true);
      }, 100);
    }, []);

  const handleUpdateTags = (tags) => {
    setTags(tags);
  };

  const handleCategory = (childData) => {
    setCategory(childData);
  };

  const handleCallback = (childData) => {
    setlatitude(childData.lat);
    setlongitude(childData.lng);
  };

  const handlePhotoCallback = (childData) => {
    setPhoto(childData);
  };

  const { onRequestClose } = props;

  if (loading) {
    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.RotateFromBottom3D}
        style={customModalStyles}
      >
        <div className="flex items-start justify-between p-5 ml-1 border-b border-solid bg-gray-600 border-gray-300 rounded-t">
          <h3 className="text-2xl font-semibold">Apply for a Event</h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={ModalManager.close}
          >
            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        <div className="px-6 py-4 bg-gray-200">
          <Formik
            initialValues={formData}
            validate={() => {
              const errors = {};
              if (!event_name) {
                errors.event_name = "Club name is required !";
              } else if (category.length === 0) {
                errors.category = "Category is required !";
              } else if (!address) {
                errors.address = "Address is required !";
              } else if (!statename) {
                errors.statename = "State is required !";
              } else if (!cityname) {
                errors.cityname = "City is required !";
              } else if (!cityname) {
                errors.cityname = "City is required !";
              } else if (!postalcode) {
                errors.postalcode = "PostalCode is required !";
              } else if (postalcode.length !== 6) {
                errors.postalcode = "PostalCode should be in 6 digits !";
              } else if (capacity === "0") {
                errors.capacity = "Valid Capacity is required !";
              } else if (!(capacity > 0)) {
                errors.capacity = "Capacity should be greater than zero !";
              } else if (!last_registraiton_date) {
                errors.last_registraiton_date = "Last date is required !";
              } else if (
                new Date(last_registraiton_date) > new Date(starting_date) ||
                new Date(starting_date) < new Date(last_registraiton_date)
              ) {
                errors.last_registraiton_date =
                  "Give proper last registration date with respect to starting date.!";
              } else if (!starting_date) {
                errors.starting_date = "Starting date is required !";
              } else if (!ending_date) {
                errors.ending_date = "Ending date is required !";
              } else if (
                new Date(starting_date) > new Date(ending_date) ||
                new Date(ending_date) < new Date(starting_date)
              ) {
                errors.ending_date = "Give proper ending date !";
              } else if (!starting_time) {
                errors.starting_time = "Starting time is required !";
              } else if (!ending_time) {
                errors.ending_time = "Ending time is required !";
              } else if (
                new Date(starting_date).getDate() ===
                  new Date(ending_date).getDate() &&
                new Date(starting_date).getMonth() ===
                  new Date(ending_date).getMonth() &&
                new Date(starting_date).getFullYear() ===
                  new Date(ending_date).getFullYear() &&
                moment(starting_time, "h:mma").isAfter(
                  moment(ending_time, "h:mma")
                )
              ) {
                errors.ending_time = "Give proper ending time!";
              } else if (!description) {
                errors.description = "Description is required !";
              } else if (!eligibility) {
                errors.eligibility = "Eligibility is required !";
              }
              return errors;
            }}
            onSubmit={async ({ setSubmitting }) => {
              const token = localStorage.getItem("jwt");
              if (photo != null) {
                var url =
                  "https://api.cloudinary.com/v1_1/crossify/image/upload/";
                var path = "Event/" + photo.name;
                var data = new FormData();
                data.append("file", photo);
                data.append("upload_preset", "crossify-project");
                data.append("public_id", path);
                const config = {
                  headers: { "X-Requested-With": "XMLHttpRequest" },
                };
                axios
                  .post(url, data, config)
                  .then(async (res) => {
                    var object = {
                      event_name,
                      privacy,
                      address,
                      state: statename,
                      city: cityname,
                      latitude: newlatitude,
                      longitude: newlongitude,
                      postalcode,
                      description,
                      eligibility,
                      last_registraiton_date,
                      starting_date,
                      starting_time,
                      ending_date,
                      ending_time,
                      club_id: props.club_id,
                      tags,
                      token,
                      photo: res.data.url,
                      capacity,
                      category,
                      isAdmin: props.isAdmin,
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
                        "/api/club/create-event",
                        object,
                        config
                      );
                      if (finaldata.data.is_error) {
                        console.log(finaldata.data.message);
                      } else {
                        window.location.reload();
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
              handleReset,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
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
                        placeholder="Enter the Event Name"
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
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Categories
                      </label>
                      <MultiSelect
                        placeholder="Select your relevant Categories"
                        parentCallback={handleCategory}
                        category={props.category}
                      ></MultiSelect>
                    </div>
                    <p className="FormError">
                      {/* {errors.category &&
                                touched.category && errors.category} */}
                      {category.length === 0 ? errors.category : ""}
                    </p>
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
                        placeholder="Enter the address"
                        value={address}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.address && touched.address && errors.address}
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
                        placeholder="Enter the postal code"
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
                      {latitude ? (
                        <MapContainer
                          lat={latitude}
                          long={longitude}
                          parentCallback={handleCallback}
                        ></MapContainer>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-gray-400" />

                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  Capacity and Timing
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
                        name="capacity"
                        value={capacity}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.capacity && touched.capacity && errors.capacity}
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
                        name="last_registraiton_date"
                        value={last_registraiton_date}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.last_registraiton_date &&
                          touched.last_registraiton_date &&
                          errors.last_registraiton_date}
                      </p>
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
                        name="starting_date"
                        value={starting_date}
                        onChange={(e) => onChange(e)}
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.starting_date &&
                          touched.starting_date &&
                          errors.starting_date}
                      </p>
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
                        name="ending_date"
                        value={ending_date}
                        onChange={(e) => onChange(e)}
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.ending_date &&
                          touched.ending_date &&
                          errors.ending_date}
                      </p>
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
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.starting_time &&
                          touched.starting_time &&
                          errors.starting_time}
                      </p>
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
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.ending_time &&
                          touched.ending_time &&
                          errors.ending_time}
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  Event Details
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Profile Photo
                      </label>
                      <UploadPic
                        parentCallback={handlePhotoCallback}
                      ></UploadPic>
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-gray-400" />

                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  About Event
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        description
                      </label>
                      <textarea
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        rows="6"
                        name="description"
                        placeholder="Enter the Description"
                        value={description}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      ></textarea>
                      <p className="FormError">
                        {errors.description &&
                          touched.description &&
                          errors.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Eligibility
                      </label>
                      <textarea
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        rows="6"
                        name="eligibility"
                        placeholder="Enter the Eligibility"
                        value={eligibility}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      ></textarea>
                      <p className="FormError">
                        {errors.eligibility &&
                          touched.eligibility &&
                          errors.eligibility}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Tags
                      </label>
                      <InputTagsContainer
                        tags={tags}
                        handleUpdateTags={handleUpdateTags}
                        name="tags"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={ModalManager.close}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    );
  } else {
    return <></>;
  }
}

export default MyModal;
