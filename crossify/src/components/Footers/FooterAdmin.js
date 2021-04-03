import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-gray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4">
              <div className="text-sm text-gray-600 font-semibold py-1 text-center md:text-left">
                Crossify by&nbsp;
                <a
                  href="https://www.creative-tim.com?ref=nr-footer-admin"
                  className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
                >
                  TheDarkSlayers
                </a>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-4">
                <div className="w-full lg:w-6/12 px-2 ml-auto">
                  <div className="mt-2 lg:mb-0 mb-2 float-right">
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
                    >
                      <i className="fab fa-facebook-square"></i>
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
        </div>
      </footer>
    </>
  );
}
