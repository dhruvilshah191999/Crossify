import React, { Component } from "react";
import meme from "../../assets/img/error.png";
class ErrorPage extends Component {
  render() {
    return (
      <div
        class="gradient text-white min-h-screen flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(to right top, #fc878e, #fb838f, #fb8090, #fa7c91, #f97992, #f7799b, #f37aa4, #ef7cad, #e583be, #d98acc, #ca92d8, #ba9ae1)",
        }}
      >
        <div class="container mx-auto p-4 flex flex-wrap items-center">
          <div class="w-full md:w-5/12 text-center p-4">
            <img
              //src="https://themichailov.com/img/not-found.svg"
              src={meme}
              alt="Not Found"
            />
          </div>
          <div class="w-full md:w-7/12 text-center md:text-left p-4">
            <div class="text-xl md:text-3xl font-medium mb-4">
              Oops. This page has gone missing.
            </div>
            <div class="text-lg mb-8">
              You may have mistyped the address or the page may have moved.
            </div>
            <a
              href="../"
              className="border border-white rounded p-4 font-normal hover:font-bold"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
