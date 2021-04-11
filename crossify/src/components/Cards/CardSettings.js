import React, { useState } from "react";
import dummyPF from "assets/img/demopf.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MapContainer from "components/Maps/MapCode";
import City from "../../views/auth/states-and-districts.json";
import UploadPic from "components/Inputs/UploadPic";
import MultipleInputs from "components/Inputs/MultipleInputs";
export default function CardSettings(props) {
  let history = useHistory();
  const [photo, setPhoto] = useState(null);
  const [privacy, setPrivacy] = useState(props.data.status);
  const [question1, setquestion] = useState(props.data.question);
  const [latitude, setlatitude] = useState(props.data.latitude);
  const [longitude, setlongitude] = useState(props.data.longitude);
  const [statename, setStateName] = useState(props.data.state);
  const [cityname, setCityName] = useState(props.data.city);
  const [formData, SetformData] = useState({
    club_name: props.data.club_name,
    address: props.data.location,
    postalcode: props.data.pincode,
    description: props.data.description,
    criteria: props.data.joining_criteria,
    rules: props.data.rules,
  });

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

  var districts = [];
  if (statename !== "") {
    const citylist = City.states.find((city) => city.state === statename);
    districts = citylist.districts;
  }

  const onChange = (e) =>
    SetformData({ ...formData, [e.target.name]: e.target.value });


  const {
    club_name,
    address,
    postalcode,
    description,
    criteria,
    rules,
  } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (photo != null) {
      var url = "https://api.cloudinary.com/v1_1/crossify/image/upload/";
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
            club_id: props.data._id,
            club_name,
            privacy,
            address,
            state: statename,
            city: cityname,
            latitude,
            longitude,
            postalcode,
            description,
            rules,
            criteria,
            photo: res.data.url,
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
              "/api/admin/update-club",
              object,
              config
            );
            if (finaldata.data.is_error) {
              console.log(finaldata.data.message);
            } else {
              history.go(0);
            }
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => console.log(err));
    }
    else {
      var object = {
        club_id: props.data._id,
        club_name,
        privacy,
        address,
        state: statename,
        city: cityname,
        latitude,
        longitude,
        postalcode,
        description,
        rules,
        criteria,
        photo: props.data.profile_photo,
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
          "/api/admin/update-club",
          object,
          config
        );
        if (finaldata.data.is_error) {
          console.log(finaldata.data.message);
        } else {
          history.go(0);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">Club Info</h6>
            <div>
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150"
                type="button"
              >
                Go to Club
              </button>
              <button
                className="bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => onSubmit(e)}
              >
                Save &nbsp; <i className="fas fa-save"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Club Information
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
                    value={club_name}
                    onChange={(e) => onChange(e)}
                  />
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
                    name="privacy"
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value)}
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
              {privacy === "Private" && (
                <MultipleInputs
                  questions={question1}
                  parentCallback={handleQuestion}
                ></MultipleInputs>
              )}
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
                    name="address"
                    value={address}
                    onChange={(e) => onChange(e)}
                  />
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
                    value={statename}
                  >
                    {City.states.map((city) => (
                      <option value={city.state} key={city.state}>
                        {city.state}
                      </option>
                    ))}
                  </select>
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
                    value={cityname}
                  >
                    {districts.map((element) => (
                      <option value={element} key={element}>
                        {element}
                      </option>
                    ))}
                  </select>
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
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    name="postalcode"
                    value={postalcode}
                    onChange={(e) => onChange(e)}
                  />
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
                    value={description}
                    name="description"
                    onChange={(e) => onChange(e)}
                    rows="6"
                  ></textarea>
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
                    value={criteria}
                    name="criteria"
                    onChange={(e) => onChange(e)}
                    rows="6"
                  ></textarea>
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
                    value={rules}
                    name="rules"
                    onChange={(e) => onChange(e)}
                    rows="6"
                  ></textarea>
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
                  <UploadPic parentCallback={handlePhotoCallback}></UploadPic>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

CardSettings.defaultProps = {
  club_name: "Badshah gang",
  description: "je baat je baat",
  tags: ["this", "that"],
  rules: "There is one rule there is no rule at all.",
  profile_photo: dummyPF,
  location: "b-34 ganeshpark-1 ghatlodia ahmedabad",
  max_members: 100,
  joining_criteria: "have to be a good person",
  category_list: ["Cricket", "Sports"],
  privacy: "Public",
};
