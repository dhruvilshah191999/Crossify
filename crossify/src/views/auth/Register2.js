import React, { useState } from "react";
import City from "./states-and-districts.json";
import { usePosition } from "use-position";

export default function Register2() {
  const watch = true;
  const { latitude, longitude } = usePosition(watch);
  const [statename, setStateName] = useState("");
  const [cityname, setCityName] = useState("");
  const [formData, setformData] = useState({
    username: "",
    address: "",
    pincode: "",
  });

  var { username, address, pincode } = formData;
  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  var districts = [];
  if (statename !== "") {
    const citylist = City.states.find((city) => city.state === statename);
    districts = citylist.districts;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(statename, cityname, formData, longitude, latitude);
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full mt-10">
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
                      required
                    />
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
                      value={address}
                      className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    />
                  </div>

                  <div className="-mx-3 md:flex">
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
                        className="w-full rounded py-3 px-3 text-gray-700 bg-white shadow focus:outline-none focus:shadow-outline text-sm ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>

                  <div className="-mx-3 md:flex mt-6">
                    <div className="md:w-1/2 md:mb-0 w-full w-1/2 mr-3">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => onSubmit(e)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
