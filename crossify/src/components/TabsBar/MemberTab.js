import React from "react";
import Photo from "../../assets/img/team-4-470x470.png";

export default class MemberTab extends React.Component {
  render() {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="flex flex-wrap justify-center items-start mt-24 rounded">
                {/* left side does not scroll is pending */}
                <div className="w-full md:w-4/12">
                  <ul className="ml-4 mr-4 bg-gray-200 rounded-lg">
                    <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
                      <a href="#" className="flex items-center justify-between">
                        <span>All Members</span>{" "}
                        <span> {this.props.number1}</span>
                      </a>
                    </li>
                    <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
                      <a href="#" className="flex items-center justify-between">
                        <span>Organizers</span>{" "}
                        <span> {this.props.number2}</span>
                      </a>
                    </li>
                    <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
                      <a href="#" className="flex items-center justify-between">
                        <span>Moderators</span>{" "}
                        <span> {this.props.number3}</span>
                      </a>
                    </li>
                    <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
                      <a href="#" className="flex items-center justify-between">
                        <span>Volunteers</span>{" "}
                        <span> {this.props.number4}</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-6/12 bg-gray-200 rounded-lg">
                  <h1 className="text-center font-bold text-xl uppercase border-b border-black p-4">
                    Club Members
                  </h1>
                  <div className="flex justify-center flex-col mt-2">
                    <div className="flex justify-center items-center my-2">
                      <img
                        className="rounded-full mr-4"
                        alt="club_background_photo"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                        src={this.props.bgImage}
                      />
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoFname}
                      </h1>
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoLname}
                      </h1>
                      <h1 className="text-black text-md">
                        , {this.props.photoPlace}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center my-2">
                      <img
                        className="rounded-full mr-4"
                        alt="club_background_photo"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                        src={this.props.bgImage}
                      />
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoFname}
                      </h1>
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoLname}
                      </h1>
                      <h1 className="text-black text-md">
                        , {this.props.photoPlace}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center my-2">
                      <img
                        className="rounded-full mr-4"
                        alt="club_background_photo"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                        src={this.props.bgImage}
                      />
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoFname}
                      </h1>
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoLname}
                      </h1>
                      <h1 className="text-black text-md">
                        , {this.props.photoPlace}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center my-2">
                      <img
                        className="rounded-full mr-4"
                        alt="club_background_photo"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                        src={this.props.bgImage}
                      />
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoFname}
                      </h1>
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoLname}
                      </h1>
                      <h1 className="text-black text-md">
                        , {this.props.photoPlace}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center my-2">
                      <img
                        className="rounded-full mr-4"
                        alt="club_background_photo"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                        src={this.props.bgImage}
                      />
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoFname}
                      </h1>
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoLname}
                      </h1>
                      <h1 className="text-black text-md">
                        , {this.props.photoPlace}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center my-2">
                      <img
                        className="rounded-full mr-4"
                        alt="club_background_photo"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                        src={this.props.bgImage}
                      />
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoFname}
                      </h1>
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoLname}
                      </h1>
                      <h1 className="text-black text-md">
                        , {this.props.photoPlace}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center my-2">
                      <img
                        className="rounded-full mr-4"
                        alt="club_background_photo"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                        src={this.props.bgImage}
                      />
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoFname}
                      </h1>
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoLname}
                      </h1>
                      <h1 className="text-black text-md">
                        , {this.props.photoPlace}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center my-2">
                      <img
                        className="rounded-full mr-4"
                        alt="club_background_photo"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                        src={this.props.bgImage}
                      />
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoFname}
                      </h1>
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoLname}
                      </h1>
                      <h1 className="text-black text-md">
                        , {this.props.photoPlace}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center my-2">
                      <img
                        className="rounded-full mr-4"
                        alt="club_background_photo"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                        src={this.props.bgImage}
                      />
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoFname}
                      </h1>
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoLname}
                      </h1>
                      <h1 className="text-black text-md">
                        , {this.props.photoPlace}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center my-2">
                      <img
                        className="rounded-full mr-4"
                        alt="club_background_photo"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                        src={this.props.bgImage}
                      />
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoFname}
                      </h1>
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoLname}
                      </h1>
                      <h1 className="text-black text-md">
                        , {this.props.photoPlace}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center my-2">
                      <img
                        className="rounded-full mr-4"
                        alt="club_background_photo"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                        src={this.props.bgImage}
                      />
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoFname}
                      </h1>
                      <h1 className="text-black text-xl mr-4">
                        {this.props.photoLname}
                      </h1>
                      <h1 className="text-black text-md">
                        , {this.props.photoPlace}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

MemberTab.defaultProps = {
  bgImage: Photo,
  photoFname: "Sagar",
  photoLname: "Solanki",
  photoPlace: "Nikol",
  number1: "100",
  number2: "20",
  number3: "30",
  number4: "50",
};
