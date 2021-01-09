import React from "react";
import { useParams } from "react-router";
import Key from "config/default.json";
import CryptoJS from "crypto-js";
import Navbar from "components/Navbars/ClubNavbar";
import health_cat from "../assets/img/health_cat.jpg";
import dance_cat from "../assets/img/dance_cat.jpg";

export default function EventPage() {
  const { id } = useParams();
  var bytes = CryptoJS.AES.decrypt(id, Key.Secret);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  console.log(originalText);
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap mt-24 bg-white justify-center items-start">
        <div className="w-full md:w-6/12 px-4 py-4 text-black bg-gray-100 rounded-md border-2 border-gray-600">
          <img
            src={health_cat}
            className="w-full align-middle rounded-lg mt-2"
            alt="event_pic"
            style={{
              height: "250px",
            }}
          />
          <h1 className="mt-2 font-semibold text-3xl text-center bg-gray-300 rounded-full">
            CRICKET TOURNAMENT
          </h1>
          <h1 className="mt-2 text-xl">
            {" "}
            <span className="font-semibold text-xl"> Place : </span> Nikol ,
            Ahmedabad , Gujarat
          </h1>
          <h2 className="mt-2 text-xl">
            {" "}
            <span className="font-semibold text-xl"> Date & Time :</span>{" "}
            14/01/2021 , 10:00 IST{" "}
          </h2>
          <h2 className="mt-2">
            <span className="font-semibold text-xl"> Organized By :</span>
            <i className="fas fa-user-friends text-md text-black p-3 border border-gray-900 text-center shadow-lg rounded-full bg-gray-100 mx-4"></i>
          </h2>
          {/* category */}
          <div className="mt-2 font-normal text-xl text-black">
            <span className="bg-gray-300 border-2 border-gray-600 rounded-full px-2 mr-2">
              Business
            </span>
            <span className="bg-gray-300 border-2 border-gray-600 rounded-full px-2 mr-2">
              Entertainment
            </span>
            <span className="bg-gray-300 border-2 border-gray-600 rounded-full px-2 mr-2">
              Food
            </span>
            <span className="bg-gray-300 border-2 border-gray-600 rounded-full px-2 mr-2">
              Travel
            </span>
          </div>

          {/* tags */}
          <div className="mt-2 font-normal text-xl text-black">
            <span className="bg-gray-300 border-2 border-gray-600 rounded-full px-2 mr-2">
              Cricket
            </span>
            <span className="bg-gray-300 border-2 border-gray-600 rounded-full px-2 mr-2">
              Football
            </span>
            <span className="bg-gray-300 border-2 border-gray-600 rounded-full px-2 mr-2">
              Java
            </span>
            <span className="bg-gray-300 border-2 border-gray-600 rounded-full px-2 mr-2">
              C++
            </span>
          </div>
          <div className="mt-2 font-semibold text-xl">Description :</div>
          <div className="mt-1 text-xl">
            This is an online networking event to connect travellers in
            Ahmedabad with whom you can plan a trip on your own if you are
            comfortable once connected and get to know each other.
          </div>
          <div className="mt-2 font-semibold text-xl">Eligibility :</div>
          <div className="mt-1 text-xl">
            Minimin age of person shoul be 18 years old.
          </div>
        </div>

        <div className="w-full md:w-4/12 px-4 py-4 text-black">
          <h1 className="mt-2 text-3xl">GROUP :</h1>
          <div className="w-full flex justify-between items-start">
            <img
              src={dance_cat}
              className="rounded-lg mr-2"
              alt="group_pic"
              style={{
                height: "150px",
              }}
            />
            <p className="flex flex-col">
              <span className="text-lg text-xl font-semibold">
                Nikol Sports Group
              </span>{" "}
              <span className="text-lg text-black bg-gray-300 text-center rounded-md">
                PUBLIC
              </span>
            </p>
          </div>

          <div className="flex flex-row justify-center my-2">
            <div className="w-6/12">
              <button
                className="w-full text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-redColor hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <i className="fas fa-heart"></i> Like
              </button>
            </div>
            &nbsp;
            <div className="w-6/12 self-end">
              <button
                className="w-full text-blue-500 bg-white shadow border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <i class="fas fa-share-alt"></i> Share
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Joined People :</h1>
              <a
                href=""
                className="font-semibold border border-lightRed hover:border-redColor text-white px-4 py-1 rounded bg-lightRed hover:bg-redColor"
              >
                <i class="far fa-user-circle"></i> SEE MORE ...
              </a>
            </div>
            <div className="rounded-md border-2 border-gray-600 mt-2 bg-gray-100 flex justify-between">
              <i className="fas fa-user-friends text-lg text-black p-3 border border-gray-900 text-center shadow-lg h-12 w-12 inline-flex items-center justify-center rounded-full bg-gray-100 mx-4 my-4"></i>
              <i className="fas fa-user-friends text-lg text-black p-3 border border-gray-900 text-center shadow-lg h-12 w-12 inline-flex items-center justify-center rounded-full bg-gray-100 mx-4 my-4"></i>
              <i className="fas fa-user-friends text-lg text-black p-3 border border-gray-900 text-center shadow-lg h-12 w-12 inline-flex items-center justify-center rounded-full bg-gray-100 mx-4 my-4"></i>
              <i className="fas fa-user-friends text-lg text-black p-3 border border-gray-900 text-center shadow-lg h-12 w-12 inline-flex items-center justify-center rounded-full bg-gray-100 mx-4 my-4"></i>
              <i className="fas fa-user-friends text-lg text-black p-3 border border-gray-900 text-center shadow-lg h-12 w-12 inline-flex items-center justify-center rounded-full bg-gray-100 mx-4 my-4"></i>
              <i className="fas fa-user-friends text-lg text-black p-3 border border-gray-900 text-center shadow-lg h-12 w-12 inline-flex items-center justify-center rounded-full bg-gray-100 mx-4 my-4"></i>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Reviews :</h1>

              <a
                href=""
                className="font-semibold border border-lightRed hover:border-redColor text-white px-4 py-1 rounded bg-lightRed hover:bg-redColor"
              >
                <i class="fas fa-users"></i> SEE MORE ...
              </a>
            </div>
            <div className="flex justify-between rounded-md border-2 border-gray-600 bg-gray-100 items-center rounded p-4 mt-2">
              <i className="fas fa-user-friends border border-gray-900 text-md text-black p-3 text-center shadow-lg h-12 w-12 inline-flex items-center justify-center rounded-full bg-gray-100 mx-4"></i>
              <span className="text-md">
                it Xeeders AI algorithm will connect you to right people in
                Ahmedabad based on your interests and request. also respond to
                others in the club.
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <h1 className="w-1/3 text-xl font-semibold">FAQs :</h1>
              <div className="w-2/3 flex justify-end">
                <a
                  href=""
                  className="font-semibold border border-beta hover:border-beta text-white px-4 py-1 rounded bg-beta"
                >
                  <i class="fas fa-user-plus"></i> Ask Question
                </a>
                <a
                  href=""
                  className="font-semibold border border-lightRed hover:border-redColor text-white px-4 py-1 ml-2 rounded bg-lightRed hover:bg-redColor"
                >
                  <i class="fas fa-user-tag"></i> SEE MORE ...
                </a>
              </div>
            </div>
            {/* FAQ01 */}
            <details class="mt-2">
              <summary class="text-md rounded-md border-2 border-gray-600 bg-gray-100 rounded py-2 px-4">
                How Long is this site live?
              </summary>
              <span>
                Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore
                ex aute deserunt esse ipsum elit aliqua. Aute quis minim velit
                nostrud pariatur culpa magna in aute.
              </span>
            </details>
            {/* FAQ02 */}
            <details class="mt-2">
              <summary className="text-md rounded-md border-2 border-gray-600 bg-gray-100 rounded py-2 px-4">
                How Long is this site live?
              </summary>
              <span>
                Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore
                ex aute deserunt esse ipsum elit aliqua. Aute quis minim velit
                nostrud pariatur culpa magna in aute.
              </span>
            </details>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}
