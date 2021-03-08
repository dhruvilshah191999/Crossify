import Navbar from "components/Navbars/ClubNavbar";
import React from "react";
import { InputTagsContainer } from "react-input-tags";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import MapContainer from "components/Maps/MapCode";
import dummyPF from "../../assets/img/demopf.png";
import MultiSelect from "components/Forms/MultiSelect";
import UploadPic from "components/Inputs/UploadPic";
// components

export default class CreateClub extends React.Component {
  state = {
    tags: ["Harshil"],
  };

  handleUpdateTags = (tags) => {
    this.setState({ tags });
  };
  render() {
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
                          defaultValue={this.props.club_name}
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
                          class="block shadow focus:shadow-outline  appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2half px-4 pr-8 rounded"
                          id="grid-state"
                          placeholder="Select your relevant Categories"
                          style={{ outline: "none" }}
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
                        <MultiSelect placeholder="Select your relevant Categories"></MultiSelect>
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
                        <UploadPic></UploadPic>
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
                          defaultValue={this.props.place}
                        />
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
                        <input
                          type="email"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          defaultValue="New York"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          defaultValue="United States"
                        />
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
                          defaultValue="Postal Code"
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
                        <MapContainer />
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
                          defaultValue={this.props.description}
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
                          defaultValue={this.props.joining_criteria}
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
                          defaultValue={this.props.rules}
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
                          Tags
                        </label>
                        <InputTagsContainer
                          tags={this.state.tags}
                          handleUpdateTags={this.handleUpdateTags}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-12/12 px-4 pt-2">
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
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
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
