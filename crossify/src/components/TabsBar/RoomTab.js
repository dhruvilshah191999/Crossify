import React from "react";

export default class RoomTab extends React.Component {
  render() {
    return (
      <>
        <div className="flex flex-wrap justify-center items-start">
          {/* left side */}
          <div className="w-full md:w-4/12">
            <ul className="ml-4 mr-4 bg-gray-200 rounded-lg">
              <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
                <a href="#">
                  <p>JAVA</p>
                </a>
              </li>
              <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
                <a href="#">
                  <p>C ++</p>
                </a>
              </li>
              <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
                <a href="#">
                  <p>Machine Learning</p>
                </a>
              </li>
              <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
                <a href="#">
                  <p>MERN stack</p>
                </a>
              </li>
            </ul>
            <div className="m-4 p-4 text-white bg-gray-700 font-bold rounded-lg">
              <a href="#" className="flex items-center justify-center">
                <span>Create Chat Room</span>
                <i className="far fa-comments ml-2"></i>
              </a>
            </div>
          </div>
          {/* right side */}
          <div className="w-full md:w-8/12 border-2 border-gray-300 relative h-28">
            <div className="bg-gray-200 font-bold text-lg p-4">
              <h1>Machine Learning</h1>
            </div>
            <div className="bg-gray-200 font-bold text-lg p-4 absolute right-0 left-0 bottom-0 inline-flex justify-between items-center">
              <label for="exampleInputPassword1">Type a message :</label>
              <input
                type="text"
                className="p-2 w-75 rounded-lg focus:rounded-lg"
                id="exampleInputPassword1"
                placeholder="type your message here"
              ></input>
              <a href="#">
                <i className="far fa-paper-plane text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
