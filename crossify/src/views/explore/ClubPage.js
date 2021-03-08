import React from "react";
import Navbar from "components/Navbars/ClubNavbar";
import TabsBar from "components/TabsBar/TabsBar";
import demopf from "assets/img/demobg.jpg";
import demobg from "assets/img/demopf.png";
import MyModal from "components/Modals/AdoptedModal";
import MyTag from "components/Tag";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";

class ClubPage extends React.Component {
  openModal() {
    ModalManager.open(<MyModal onRequestClose={() => true} />);
  }
  render() {
    return (
      <>
        <Navbar />
        <div style={{ marginTop: 65, backgroundColor: "#fafafa" }}>
          <div className="flex flex-col items-center flex-wrap">
            <div className="flex flex-row flex-wrap mt-2 ">
              <div className="club-bg mx-4 my-2">
                <img
                  className="w-full h-full overflow-hidden object-contain rounded-lg"
                  alt="club_background_photo"
                  src={this.props.bgImage}
                />
              </div>
              <div
                className="bg-white rounded  mx-2 my-2 p-6 border leading-relaxed max-w-370-px"
                style={{ width: 370 }}
              >
                <div className="text-3xl font-bold">
                  {this.props.clubName}
                  <button className="float-right text-lg">
                    <i className=" text-md text-gray-700 fas fa-cog ml-auto"></i>
                  </button>
                </div>
                <div className="text-base mt-2 text-gray-600 ml-2">
                  &nbsp;<i class="fas fa-map-marker-alt text-sm"></i>
                  &nbsp;&nbsp;&nbsp; {this.props.loc} <br />
                  <i class="fas fa-users text-sm"></i> &nbsp;&nbsp;
                  {this.props.noOfMembers + " "}
                  Members
                  <br />
                  <i class="fas fa-couch text-sm"></i> &nbsp;&nbsp;
                  {this.props.clubType + " Club"}
                  <br />
                  <i class="fas fa-user-shield text-sm"></i> &nbsp;&nbsp;
                  {this.props.owner}
                  <br />
                  <i class="fas fa-calendar-day text-sm"></i>&nbsp;&nbsp;&nbsp;
                  {this.props.createdAt}
                </div>
                <div className="p-1 my-2 leading-wide">
                  {this.props.categories.map((el) => (
                    <MyTag data={el}></MyTag>
                  ))}
                </div>
                <div className="flex flex-row justify-center my-2">
                  <div className="w-6/12">
                    <button
                      className="w-full text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
                <div className="flex justify-center">
                  <button
                    className=" w-full hover:text-alpha hover:bg-white shadow border border-solid  bg-beta text-white active:bg-lightbeta font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={this.openModal.bind(this)}
                  >
                    <i className="fas fa-pen-alt"></i> Apply for Event
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    className=" w-full hover:text-alpha hover:bg-white shadow border border-solid  bg-alpha text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i class="fas fa-user-plus"></i> Join
                  </button>
                </div>
              </div>
            </div>
            <div
              className="bg-white rounded border ml-4 mt-2 p-2"
              style={{ width: 1225 }}
            >
              <TabsBar />
            </div>
          </div>
        </div>
      </>
    );
  }
}

ClubPage.defaultProps = {
  bgImage: demobg,
  owner: "Harshil Patel",
  profileImage: demopf,
  noOfMembers: 45,
  clubName: "GreyHat BadShah",
  clubType: "Public",
  loc: "Ahmedabad , India",
  createdAt: "12 Feb 2012",
  categories: ["Hacking", "CyberSecurity", "Tech"],
  description:
    "Grey hat hackers are a blend of both black hat and white hat activities. ... Often, grey hat hackers will look for vulnerabilities in a system without the owner's permission or knowledge. If issues are found, they will report them to the owner, sometimes requesting a small fee to fix the issue.",
};

export default ClubPage;
