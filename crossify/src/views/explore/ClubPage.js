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

function ClubPage(props) {
  let history = useHistory();
  var { id } = useParams();
  const { category } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setloading] = useState(false);
  const [isRequest, setRequest] = useState(false);
  const [moderator, setmoderator] = useState(false);
  const [isPublic, setPublic] = useState(true);
  const [isJoin, setIsJoin] = useState(false);
  const [like, setLike] = useState(false);
  const [count, setCount] = useState({});
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
        if (finaldata.data.isAdmin) {
          setIsJoin(true);
        }
        if (finaldata.data.data[0].status === "Private") {
          setPublic(false);
        }
        setTimeout(() => {
          setloading(true);
        }, 500);
      }
    }

    async function get_count() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      };
      var send_data = {
        club_id: id,
      };
      const finaldata = await axios.post(
        "/api/admin/getCount",
        send_data,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setCount(finaldata.data.data);
      }
    }

    async function fetchData() {
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
        "/api/club/checklikes",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setLike(finaldata.data.Like);
      }
    }

    async function CheckMember() {
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
        "/api/club/IsMemberExist",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setIsJoin(finaldata.data.join);
        setmoderator(finaldata.data.moderator);
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

    CheckMember();
    CheckRequestMember();
    fetchData();
    event_details();
    get_count();
  }, []);

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
      setLike(false);
    }
  };
  const openModal = () => {
    ModalManager.open(
      <MyModal onRequestClose={() => true} club_id={id} isAdmin={isAdmin} category={category }/>
    );
  };
  const gotoAdmin = () => {
    history.push("/admin/" + id);
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
                  {count.member + " "}
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
                        !like
                          ? "w-full text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          : "w-full text-white bg-red-500 shadow hover:bg-white border border-solid border-red-500 hover:text-red-500 active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      }
                      type="button"
                      onClick={like ? (e) => deletelike(e) : (e) => addlike(e)}
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
                  {loading ? (
                    <JoinClubButton
                      clubName={clubData.club_name}
                      isPublic={isPublic}
                      club_id={id}
                      isJoin={isJoin}
                      isAdmin={isAdmin}
                      question={clubData.question}
                      isRequest={isRequest}
                    />
                  ) : (
                    ""
                  )}{" "}
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
                isJoin={isJoin}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        </div>
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
