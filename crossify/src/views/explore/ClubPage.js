import React, { useState , useEffect}from "react";
import Navbar from "components/Navbars/ClubNavbar";
import axios from "axios";
import { useParams } from "react-router";
import TabsBar from "components/TabsBar/TabsBar";
import demopf from "assets/img/demobg.jpg";
import demobg from "assets/img/demopf.png";
import MyModal from "components/Modals/RequestForEvent";
import MyTag from "components/Tag";
import Moment from "moment";
import JoinClubButton from "components/Modals/JoinClubButton";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { motion } from "framer-motion";

function ClubPage(props) {
  var { id } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setloading] = useState(false);
  const [clubData, setClubData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    async function event_details() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      };
      var send_data = {
        club_id: id,
        token,
      };
      const finaldata = await axios.post(
        "/api/club/get-club",
        send_data,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setClubData(finaldata.data.data[0]);
        setIsAdmin(finaldata.data.isAdmin);
        setTimeout(setloading(true), 1000);
      }
    }
    event_details();
  },[])
  const openModal = () => {
    ModalManager.open(<MyModal onRequestClose={() => true} club_id={id}/>);
  };

  if (loading) {
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
                  src={clubData.profile_photo}
                />
              </div>
              <div
                className="bg-white rounded  mx-2 my-2 p-6 border leading-relaxed max-w-370-px"
                style={{ width: 370 }}
              >
                <div className="text-3xl font-bold">
                  {clubData.club_name}
                  {/* //todo GOLU just redirect to the /admin page for control or
                  manage this club (ONLY IF HE IS MOD OR CREATOR OF THE CLUB) */}
                  {isAdmin ? (
                    <button className="float-right text-lg">
                      <i className=" text-md text-gray-700 fas fa-cog ml-auto"></i>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-base mt-2 text-gray-600 ml-2">
                  &nbsp;<i class="fas fa-map-marker-alt text-sm"></i>
                  &nbsp;&nbsp;&nbsp; {clubData.city},{clubData.state} <br />
                  <i class="fas fa-users text-sm"></i> &nbsp;&nbsp;
                  {props.noOfMembers + " "}
                  Members
                  <br />
                  <i class="fas fa-couch text-sm"></i> &nbsp;&nbsp;
                  {clubData.status + " Club"}
                  <br />
                  <i class="fas fa-user-shield text-sm"></i> &nbsp;&nbsp;
                  {clubData.user_data[0].fname} {clubData.user_data[0].lname}
                  <br />
                  <i class="fas fa-calendar-day text-sm"></i>&nbsp;&nbsp;&nbsp;
                  {Moment(clubData.date).format("DD MMM YYYY")}
                </div>
                <div className="p-1 my-2 leading-wide">
                  {clubData.tags.map((el) => (
                    <MyTag data={el}></MyTag>
                  ))}
                </div>
                <div className="flex flex-row justify-center my-2">
                  <div className="w-6/12">
                    <motion.button
                      className="w-full text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fas fa-heart"></i> Like
                    </motion.button>
                  </div>
                  &nbsp;
                  <div className="w-6/12 self-end">
                    <motion.button
                      className="w-full text-blue-500 bg-white shadow border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i class="fas fa-share-alt"></i> Share
                    </motion.button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className=" w-full  hover:bg-lightbeta shadow border border-solid  bg-beta text-white active:bg-lightbeta font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={openModal.bind(this)}
                  >
                    <i className="fas fa-pen-alt"></i> Apply for Event
                  </button>
                </div>

                <div className="flex justify-center">
                  {/* <button
                    className=" w-full  hover:bg-lightalpha shadow border border-solid  bg-alpha text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i class="fas fa-user-plus"></i> Join
                  </button> */}
                  <JoinClubButton
                    clubName={props.clubName}
                    designation="Member"
                  />{" "}
                </div>
              </div>
            </div>
            <div
              className="bg-white rounded border ml-4 mt-2 p-2"
              style={{ width: 1225 }}
            >
              <TabsBar
                club_id={id}
                description={clubData.description}
                rules={clubData.rules}
                joining_criteria={clubData.joining_criteria}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  else {
    return <></>
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
