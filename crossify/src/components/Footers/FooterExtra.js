import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block" zz>
        <div className="container mx-auto">
          {/* <hr className="mb-4 border-b-1 border-gray-300" /> */}
          <div className="flex flex-nowrap xxs:flex-wrap xxs:text-center items-center justify-between">
            <div className="w-full px-4">
              <div className="text-sm text-gray-600 font-semibold py-1">
                Crossify by&nbsp;
                <a
                  href="https://www.creative-tim.com?ref=nr-footer-admin"
                  className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
                >
                  TheDarkSlayers
                </a>
              </div>
            </div>
            <div className="w-full px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full px-4 ml-auto">
                  <div className="mt-6 mb-6 text-right xxs:text-center">
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
