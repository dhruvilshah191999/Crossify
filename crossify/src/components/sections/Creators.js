import React, { Component } from "react";
import harshilImg from "assets/img/harshilImg.jpg";
import dhruvilImg from "assets/img/pp1.jpg";
import sagarImg from "assets/img/sagar_.jpg";
import bhargavImg from "assets/img/bhargavImage.jpg";

class Creators extends Component {
  render() {
    return (
      <section className="pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl text-white font-semibold">
                Here are our heroes
              </h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Talent wins games, but teamwork and intelligence win
                championships.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={harshilImg}
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold text-offwhite">
                    Harshil Patel
                  </h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Team Lead & UI/UX Designer
                  </p>
                  <div className="mt-6 text-lg">
                    <button
                      className="bg-linkedin text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://linkedin.com/in/hackershil",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-linkedin"></i>
                    </button>
                    <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open("https://twitter.com/hackershil", "_blank");
                        return false;
                      }}
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-instagram text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://instagram.com/hackershil",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                    <button
                      className="bg-github text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open("https://github.com/hackershil", "_blank");
                        return false;
                      }}
                    >
                      <i className="fab fa-github"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={dhruvilImg}
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold text-offwhite">
                    Dhruvil Shah
                  </h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Backend Dev
                  </p>
                  <div className="mt-6 text-lg">
                    <button
                      className="bg-linkedin text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://www.linkedin.com/in/dhruvil-shah-834851192/",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-linkedin"></i>
                    </button>
                    <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://twitter.com/Dhruvil12268331",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-twitter"></i>
                    </button>

                    <button
                      className="bg-github text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://github.com/dhruvilshah191999",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-github"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={bhargavImg}
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold text-offwhite">
                    Bhargav Kanodiya
                  </h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Backend Dev
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-linkedin text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://www.linkedin.com/in/bhargav-kanodiya-9a72b2171",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-linkedin"></i>
                    </button>
                    <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://twitter.com/Bhargavpatel_27",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-instagram text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://www.instagram.com/bhargav_patel_2742/",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                    <button
                      className="bg-github text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open("https://github.com/bhargu-27", "_blank");
                        return false;
                      }}
                    >
                      <i className="fab fa-github"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={sagarImg}
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold text-offwhite">
                    Sagar Solanki
                  </h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    UI Designer
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-linkedin text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://www.linkedin.com/in/sagar-solanki-6857561a0/",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-linkedin"></i>
                    </button>
                    <button
                      className="bg-github text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://github.com/sagarsolanki1811",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-github"></i>
                    </button>
                    <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://twitter.com/sagar_solanki18",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-instagram text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://www.instagram.com/sagarsolanki1811/",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Creators;
