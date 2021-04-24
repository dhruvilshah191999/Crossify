import React, { Component } from "react";
import meme from "../../assets/img/error.png";
import Navbar from "components/Navbars/ClubNavbar";
class ErrorPage extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div
          class="gradient text-white min-h-screen flex items-center"
          // style={{
          //   backgroundImage:
          //     "linear-gradient(to right top, #fc878e, #fb838f, #fb8090, #fa7c91, #f97992, #f7799b, #f37aa4, #ef7cad, #e583be, #d98acc, #ca92d8, #ba9ae1)",
          // }}
        >
          <div class="container mx-auto p-4 flex flex-wrap items-center">
            <div class="w-full lg:w-6/12 text-center p-4">
              <img
                //src="https://themichailov.com/img/not-found.svg"
                src={meme}
                alt="Not Found"
              />
            </div>
            <div class="w-full lg:w-6/12 text-center md:text-left p-4 text-black">
              <div class="text-lg mb-8">
                You may have mistyped the address or the page may have moved. We
                are very sorry for inconvenience. It looks like you're trying to
                access a page that was has been deleted or never even existed
              </div>
              <a
                href="../"
                className="text-white rounded-lg p-4 font-bold hover:bg-brightalpha bg-alpha uppercase"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ErrorPage;
