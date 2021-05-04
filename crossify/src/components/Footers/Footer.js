import React from "react";
import crossifyImg from "assets/logos/logo_final.png";

export default function Footer() {
  return (
    <>
      <footer className=" bg-gray-300 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 px-4 ">
              <img
                alt="brandphoto"
                src={crossifyImg}
                className="mr-2 inline-block"
                style={{ height: 30 }}
              ></img>

              <h4 className="text-3xl font-semibold inline-block pb-2">
                Crossify
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-gray-700">
                Connect with your Hobbies and meet your liked minded future
                friends
              </h5>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-6/12 px-4 ml-auto">
                  <div className="mt-6 lg:mb-0 mb-6">
                    <button
                      className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                      type="button"
                      onClick={() => {
                        window.open(
                          " https://twitter.com/CrossifyWeb",
                          "_blank"
                        );
                      }}
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://www.facebook.com/groups/510718810086566",
                          "_blank"
                        );
                      }}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </button>
                    <button
                      className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://www.linkedin.com/groups/9049763/",
                          "_blank"
                        );
                      }}
                    >
                      <i className="fab fa-linkedin"></i>
                    </button>
                    <button
                      className="bg-white text-gray-900 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://www.github.com/dhruvilshah191999/Crossify",
                          "_blank"
                        );
                      }}
                    >
                      <i className="fab fa-github"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-400" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-600 font-semibold py-1 ">
                Crossify by{" "}
                <a
                  href="https://www.creative-tim.com?ref=nr-footer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  TheDarkSlayers
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
