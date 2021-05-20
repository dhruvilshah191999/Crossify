import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Moment from "moment";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { ModalManager } from "react-dynamic-modal";
import { motion } from "framer-motion";
import GridLoader from "react-spinners/GridLoader";
import TabsBar from "components/TabsBar/TabsBar";
import Navbar from "components/Navbars/ClubNavbar";
import { UserContext } from "context/usercontext";
import demopf from "assets/img/demobg.jpg";
import demobg from "assets/img/demopf.png";
import MyModal from "components/Modals/RequestForEvent";
import MyTag from "components/Tag";
import { notifyClubLiked, notifyWentWrong } from "notify";
import JoinClubButton from "components/SweetAlerts/JoinClubButton";
import BigShareButton from "components/SweetAlerts/BigShareButton";
import Footer from "components/Footers/FooterAdmin";

const SetLiked = (props) => {
  if (props.fav_club.find((e) => e === props.id)) {
    props.returnData(true);
  } else {
    props.returnData(false);
  }
  return <></>;
};

function ClubPage(props) {
  let history = useHistory();
  var { id } = useParams();
  const { category, users } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setloading] = useState(false);
  const [isRequest, setRequest] = useState(false);
  const [moderator, setmoderator] = useState(false);
  const [isPublic, setPublic] = useState(true);
  const [isJoin, setIsJoin] = useState(false);
  const [isLike, setLike] = useState(false);
  const [clubData, setClubData] = useState([]);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
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
        setIsJoin(finaldata.data.isMember);
        setmoderator(finaldata.data.isModerator);
        if (finaldata.data.isAdmin) {
          setIsJoin(true);
        }
        if (finaldata.data.data[0].status === "Private") {
          setPublic(false);
          CheckRequestMember();
        }
        setloading(true);
      }
    }

    async function CheckRequestMember() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        token: token,
        club_id: id,
      };
      const finaldata = await axios.post(
        "/api/club/IsMemberRequestExist",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setRequest(finaldata.data.request);
      }
    }

    event_details();
  }, [id, token]);

  const addlike = async (e) => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      token: token,
      club_id: id,
    };
    const finaldata = await axios.post("/api/club/addlikes", object, config);
    if (finaldata.data.is_error) {
      notifyWentWrong();
    } else {
      notifyClubLiked();
      users.fav_club.push(id);
      setLike(true);
    }
  };

  const deletelike = async (e) => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      token: token,
      club_id: id,
    };
    const finaldata = await axios.post("/api/club/removelikes", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      users.fav_club.pop(id);
      setLike(false);
    }
  };
  const openModal = () => {
    ModalManager.open(
      <MyModal
        onRequestClose={() => true}
        club_id={id}
        isAdmin={isAdmin}
        category={category}
      />
    );
  };
  const gotoAdmin = () => {
    history.push("/admin/" + id);
  };

  const setUnreadData = (chilData) => {
    setLike(chilData);
  };
  if (loading) {
    return (
      <>
        <Navbar />
        <SetLiked
          id={id}
          fav_club={users.fav_club}
          returnData={setUnreadData}
        />
        <div
          style={{
            marginTop: 65,

            backgroundColor: "#fafafa",
          }}
        >
          <div className="flex flex-col flex-wrap lg:mx-20">
            <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap mt-4 justify-between xs:items-center sm:items-center items-start flex-shrink-0 ">
              <div className="club-image-div">
                <img
                  className="overflow-hidden object-contain rounded-lg club-image"
                  alt="club_background_photo"
                  src={clubData.profile_photo}
                />
              </div>
              <div className="bg-white rounded p-6 border leading-relaxed club-side-container">
                <div className="text-3xl font-bold">
                  {clubData.club_name}
                  {isAdmin || moderator ? (
                    <button
                      className="float-right text-lg"
                      onClick={() => gotoAdmin()}
                    >
                      <i className=" text-md text-gray-700 fas fa-cog ml-auto"></i>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-base mt-2 text-gray-600 ml-2">
                  &nbsp;<i className="fas fa-map-marker-alt text-sm"></i>
                  &nbsp;&nbsp; {clubData.city},{clubData.state} <br />
                  <i className="fas fa-users text-sm"></i> &nbsp;&nbsp;
                  {clubData.member_list ? clubData.member_list.length : 0}{" "}
                  Members
                  <br />
                  <i className="fas fa-couch text-sm"></i> &nbsp;&nbsp;
                  {clubData.status + " Club"}
                  <br />
                  <i className="fas fa-user-shield text-sm"></i> &nbsp;&nbsp;
                  {clubData.user_data[0].fname} {clubData.user_data[0].lname}
                  <br />
                  <i className="fas fa-calendar-day text-sm"></i>
                  &nbsp;&nbsp;&nbsp;&nbsp;
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
                      className={
                        !isLike
                          ? "w-full text-likealpha bg-white shadow border border-solid hover:bg-alpha hover:text-white active:bg-red-600  font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          : "w-full text-white bg-brightalpha shadow hover:bg-white border border-solid hover:text-alpha active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      }
                      type="button"
                      onClick={
                        isLike ? (e) => deletelike(e) : (e) => addlike(e)
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fas fa-heart"></i> Like
                    </motion.button>
                  </div>
                  &nbsp;
                  <div className="w-6/12 self-end">
                    <BigShareButton
                      shareUrl={window.location.href}
                      title={clubData.club_name}
                      description={clubData.description}
                      tags={clubData.tags}
                    ></BigShareButton>
                  </div>
                </div>
                <div className={isJoin ? "flex justify-center" : "hidden"}>
                  <button
                    className=" w-full  hover:bg-lightbeta shadow border border-solid  bg-beta text-white active:bg-lightbeta font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={openModal.bind(this)}
                  >
                    <i className="fas fa-pen-alt"></i> Apply for Event
                  </button>
                </div>

                <div
                  //className={isAdmin ? "hidden" : "flex justify-center"}
                  className="flex justify-center"
                >
                  <JoinClubButton
                    clubName={clubData.club_name}
                    isPublic={isPublic}
                    club_id={id}
                    isJoin={isJoin}
                    isMod={moderator}
                    isAdmin={isAdmin}
                    question={clubData.question}
                    isRequest={isRequest}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded border mt-4 p-2 mb-8">
              <TabsBar
                club_id={id}
                description={clubData.description}
                rules={clubData.rules}
                photo={clubData.photo}
                file={clubData.file}
                joining_criteria={clubData.joining_criteria}
                isJoin={isJoin}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <div
          className="flex justify-center items-center"
          style={{ height: "100vh" }}
        >
          <GridLoader color="#36D7B7" size={15} />
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
