import React, { Component } from "react";

class EditSocialMedia extends Component {
  render() {
    return (
      <div>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">
                Privacy Settings
              </h6>
              <button
                className="bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Save &nbsp; <i className="fas fa-save"></i>
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-gray-500 text-sm mt-3 mb-2 font-bold uppercase">
                Configuration
              </h6>
              <div className="flex flex-col">
                <div>
                  <label class="inline-flex items-center mt-3">
                    <input
                      type="checkbox"
                      class="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2 font-bold">
                      Make profile photo visible to public
                    </span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center mt-3">
                    <input
                      type="checkbox"
                      class="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2 font-bold">
                      Show Social Media on Profile
                    </span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center mt-3">
                    <input
                      type="checkbox"
                      class="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2 font-bold">
                      {" "}
                      Show Interest on profile
                    </span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center mt-3">
                    <input
                      type="checkbox"
                      class="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2 font-bold">
                      Show Joined Clubs on Profile
                    </span>
                  </label>
                </div>
                <div>
                  <label class="inline-flex items-center mt-3">
                    <input
                      type="checkbox"
                      class="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2 font-bold">
                      Email Subscription to newsletter
                    </span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditSocialMedia;
