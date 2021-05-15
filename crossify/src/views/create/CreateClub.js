import Navbar from "components/Navbars/ClubNavbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import InputTagsContainer from "components/Inputs/InputTags";
import { notifySuccessClub } from "notify";
import PulseLoader from "react-spinners/PulseLoader";
import { usePosition } from "use-position";
import MapContainer from "components/Maps/AddMapCode";
import City from "../auth/states-and-districts.json";
import dummyPF from "../../assets/img/demopf.png";
import MultiSelect from "components/Inputs/MultiSelect";
import UploadPic from "components/Inputs/UploadPic";
import MultipleInputs from "components/Inputs/MultipleInputs";
import { Formik } from "formik";

function CreateClub(props) {
  let history = useHistory();
  const [tags, setTags] = useState([]);
  const [question1, setquestion] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitloading, setsubmitLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [newlatitude, setlatitude] = useState(23.106517);
  const [newlongitude, setlongitude] = useState(72.59482);
  const [statename, setStateName] = useState("");
  const [cityname, setCityName] = useState("");
  const [formData, SetformData] = useState({
    club_name: "",
    privacy: "Public",
    address: "",
    postalcode: "",
    description: "",
    criteria: "",
    rules: "",
  });
  const {
    club_name,
    privacy,
    address,
    postalcode,
    description,
    criteria,
    rules,
  } = formData;

  let { latitude, longitude } = usePosition(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 100);
  }, []);

  var districts = [];
  if (statename !== "") {
    const citylist = City.states.find((city) => city.state === statename);
    districts = citylist.districts;
  }

  const onChange = (e) =>
    SetformData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdateTags = (tags) => {
    console.log(tags);
    setTags(tags);
  };

  const handleCategory = (childData) => {
    setCategory(childData);
  };

  const handleQuestion = (childData) => {
    setquestion(childData);
  };

  const handleCallback = (childData) => {
    setlatitude(childData.lat);
    setlongitude(childData.lng);
  };

  const handlePhotoCallback = (childData) => {
    setPhoto(childData);
  };

  return (
    <>
      <Navbar></Navbar>
      <div
        className="flex flex-row justify-center "
        style={{ backgroundColor: "#F7FAFC", marginTop: "4.1rem" }}
      >
        <div className="py-4 mx-4 container">
          <div
            className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg  border-0"
            style={{ backgroundColor: "#F7FAFC" }}
          >
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-800 text-xl font-bold ml-4">
                  Fill up your Club Information
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <Formik
                initialValues={formData}
                validate={() => {
                  const errors = {};
                  if (!club_name) {
                    errors.club_name = "Club name is required !";
                  } else if (category.length === 0) {
                    errors.category = "Category required !";
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
                    errors.postalcode = "PostalCode should be in 6 digits !!!";
                  } else if (!description) {
                    errors.description = "Description is required !";
                  } else if (description.length < 20) {
                    errors.description = "Minimum 20 words are required";
                  } else if (!criteria) {
                    errors.criteria = "Joining criteria is required !";
                  } else if (criteria.length < 20) {
                    errors.criteria = "Minimum 20 words are required";
                  } else if (!rules) {
                    errors.rules = "Rules are required !";
                  } else if (rules.length < 20) {
                    errors.rules = "Minimum 20 words are required";
                  }
                  return errors;
                }}
                onSubmit={async ({ setSubmitting }) => {
                  setsubmitLoading(true);
                  const token = localStorage.getItem("jwt");
                  if (photo != null) {
                    var url =
                      "https://api.cloudinary.com/v1_1/crossify/image/upload/";
                    var path = "Club/" + photo.name;
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
                          club_name,
                          privacy,
                          address,
                          state: statename,
                          city: cityname,
                          latitude: newlatitude,
                          longitude: newlongitude,
                          postalcode,
                          description,
                          rules,
                          criteria,
                          category,
                          tags,
                          token,
                          photo: res.data.secure_url,
                          question: question1,
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
                            "/api/club/create-club",
                            object,
                            config
                          );
                          if (finaldata.data.is_error) {
                            console.log(finaldata.data.message);
                          } else {
                            notifySuccessClub();
                            setTimeout(() => {
                              history.push("/club/" + finaldata.data.club_id);
                            }, 300);
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
                    <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                      Basic Information
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-8/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                            name="club_name"
                            placeholder="Enter the Club Name"
                            value={club_name}
                            onChange={(e) => onChange(e)}
                            onBlur={handleBlur}
                          />
                          <p className="FormError">
                            {errors.club_name &&
                              touched.club_name &&
                              errors.club_name}
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
                            className="block shadow focus:shadow-outline  appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2half px-4 pr-8 rounded"
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
                      {formData.privacy === "Private" ? (
                        <MultipleInputs
                          parentCallback={handleQuestion}
                        ></MultipleInputs>
                      ) : (
                        ""
                      )}
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
                          ></MultiSelect>
                          <p className="FormError">
                            {/* {errors.category &&
                                touched.category && errors.category} */}
                            {category.length === 0 ? errors.category : ""}
                          </p>
                        </div>
                      </div>
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Profile Photo
                          </label>
                          {/* <input
                          type="file"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          defaultValue={this.props.dummyPF}
                        /> */}
                          <UploadPic
                            parentCallback={handlePhotoCallback}
                          ></UploadPic>
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-gray-400" />

                    <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                      Location Information
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
                            placeholder="Enter the Address"
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
                            placeholder="Enter the Postal Code"
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
                          {loading ? (
                            <MapContainer
                              lat={latitude}
                              long={longitude}
                              parentCallback={handleCallback}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-gray-400" />

                    <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                      About Club
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
                            placeholder="Enter the description"
                            value={description}
                            name="description"
                            onChange={(e) => onChange(e)}
                            onBlur={handleBlur}
                            rows="6"
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
                            Joining Criteria
                          </label>
                          <textarea
                            type="text"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                            placeholder="Enter the Joining Criteria"
                            value={criteria}
                            name="criteria"
                            onChange={(e) => onChange(e)}
                            onBlur={handleBlur}
                            rows="6"
                          ></textarea>
                          <p className="FormError">
                            {errors.criteria &&
                              touched.criteria &&
                              errors.criteria}
                          </p>
                        </div>
                      </div>
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Rules
                          </label>
                          <textarea
                            type="text"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                            placeholder="Enter the rules"
                            value={rules}
                            name="rules"
                            onChange={(e) => onChange(e)}
                            onBlur={handleBlur}
                            rows="6"
                          ></textarea>
                          <p className="FormError">
                            {errors.rules && touched.rules && errors.rules}
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
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-12/12 px-4 pt-2">
                        {submitloading ? (
                          <div align="center">
                            <PulseLoader color="#e82953" size={10} />
                          </div>
                        ) : (
                          <div className="relative w-full mb-3 flex flex-row font-lg  justify-center ">
                            <button
                              className="bg-white mr-2  active:bg-offwhite font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-alpha text-white active:bg-lightalpha font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={handleSubmit}
                              disabled={isSubmitting}
                            >
                              Submit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CreateClub.defaultProps = {
  club_name: "Badshah gang",
  description: "je baat je baat",
  tags: ["this", "that"],
  rules: "There is one rule there is no rule at all.",
  profile_photo: dummyPF,
  place: "Raj ka darbar",
  max_members: 100,
  joining_criteria: "have to be a good person",
  category_list: ["Cricket", "Sports"],
  privacy: "Public",
};
export default CreateClub;
