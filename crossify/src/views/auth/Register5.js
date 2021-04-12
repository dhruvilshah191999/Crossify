import React, { useState } from "react";
import Navbar from "components/Navbars/RegNavbar.js";
import axios from "axios";
export default function Register5() {
  componentDidMount = () => {
    this.getCategoryData();
  };

  var getCategoryData = () => {
    axios
      .get("/api/category_send")
      .then((response) => {
        const data = response.data;
        this.setState();
        console.log(data);
        console.log("Data recieved");
      })
      .catch(() => {
        console.log("error in data recieving");
      });
  };
  return (
    <>
      <Navbar transparent />
      <div className="container mx-auto px-12 h-full bg-gray-900">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-12">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-700 text-sm font-bold uppercase">
                    <i className="fa fa-heart mr-2" aria-hidden="true"></i>
                    Choose Your Interest
                    <i className="fa fa-heart ml-2" aria-hidden="true"></i>
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <div className="text-center">
                    <div className="relative w-full mb-3">
                      <label className="inline-block uppercase text-gray-700 text-sm font-bold mb-2 mr-2">
                        <i
                          className="fa fa-briefcase mr-2"
                          aria-hidden="true"
                        ></i>
                        Business
                      </label>
                      <input
                        type="checkbox"
                        className="text-gray-700 bg-white rounded text-sm"
                      ></input>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="inline-block uppercase text-gray-700 text-sm font-bold mb-2 mr-2">
                        <i className="fa fa-child mr-2" aria-hidden="true"></i>
                        Dance
                      </label>
                      <input
                        type="checkbox"
                        className="text-gray-700 bg-white rounded text-sm "
                      ></input>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="inline-block uppercase text-gray-700 text-sm font-bold mb-2 mr-2">
                        <i className="fas fa-tv mr-2"></i>entertainment
                      </label>
                      <input
                        type="checkbox"
                        className="text-gray-700 bg-white rounded"
                      ></input>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="inline-block uppercase text-gray-700 text-sm font-bold mb-2 mr-2">
                        <i className="fas fa-vest-patches mr-2"></i>fashion
                      </label>
                      <input
                        type="checkbox"
                        className="text-gray-700 bg-white rounded text-sm"
                      ></input>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="inline-block uppercase text-gray-700 text-sm font-bold mb-2 mr-2">
                        <i className="fas fa-utensils mr-2"></i>food
                      </label>
                      <input
                        type="checkbox"
                        className="text-gray-700 bg-white rounded text-sm"
                      ></input>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="inline-block uppercase text-gray-700 text-sm font-bold mb-2 mr-2">
                        <i className="fas fa-running mr-2"></i>fitness
                      </label>
                      <input
                        type="checkbox"
                        className="text-gray-700 bg-white rounded text-sm"
                      ></input>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="inline-block uppercase text-gray-700 text-sm font-bold mb-2 mr-2">
                        <i className="fa fa-trophy mr-2" aria-hidden="true"></i>
                        sport
                      </label>
                      <input
                        type="checkbox"
                        className="text-gray-700 bg-white rounded text-sm"
                      ></input>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="inline-block uppercase text-gray-700 text-sm font-bold mb-2 mr-2">
                        <i className="fab fa-windows mr-2"></i>technology
                      </label>
                      <input
                        type="checkbox"
                        className="text-gray-700 bg-white rounded text-sm"
                      ></input>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="inline-block uppercase text-gray-700 text-sm font-bold mb-2 mr-2">
                        <i className="fa fa-plane mr-2" aria-hidden="true"></i>
                        travel
                      </label>
                      <input
                        type="checkbox"
                        className="text-gray-700 bg-white rounded text-sm"
                      ></input>
                    </div>
                  </div>
                  <div className="w-full mt-6">
                    <button
                      className="bg-lightalpha hover:bg-alpha text-white active:bg-gray-700 text-sm font-bold uppercase px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Next
                    </button>
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
