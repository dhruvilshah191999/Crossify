import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Moment from "moment";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Navbar from "components/Navbars/ClubNavbar";
import MapContainer from "components/Maps/ViewOnlyMap";
import AskQuestion from "components/SweetAlerts/AskQuestion";
import RegisteredMember from "components/Cards/RegisteredMembers";
import JoinEventButton from "components/SweetAlerts/JoinEventButton";
import ReportEventButton from "components/SweetAlerts/ReportEventButton";
import { UserContext } from "context/usercontext";
import { notifyLiked, notifyWentWrong } from "notify";
import { motion } from "framer-motion";
import GridLoader from "react-spinners/GridLoader";
import BigShareButton from "components/SweetAlerts/BigShareButton";
import Footer from "components/Footers/FooterAdmin";

const Tag = (props) => {
  return (
    <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-beta bg-lightbeta uppercase last:mr-0 mr-2">
      {props.name}
    </span>
  );
};

const SetLiked = (props) => {
  if (props.fav_event.find((e) => e === props.id)) {
    props.returnData(true);
  } else {
    props.returnData(false);
  }
  return <></>;
};
export default function EventPage(props) {
  let history = useHistory();
  const { users } = useContext(UserContext);
  var { id } = useParams();
  const [loading, setloading] = useState(false);
  const [isInWaiting, SetisInWaiting] = useState(false);
  const [IsFull, SetIsFull] = useState(false);
  const [isLike, setLike] = useState(false);
  const [eventdetails, Seteventsdetails] = useState({});
  const [checkevent, setevent] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
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
        event_id: id,
      };
      const finaldata = await axios.post(
        "/api/events/event-details",
        send_data,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        Seteventsdetails(finaldata.data.event_data);
        if (
          new Date(finaldata.data.event_data.date).getTime() <
          new Date().getTime()
        ) {
          setCompleted(true);
        }
        if (
          finaldata.data.event_data.current_participants >=
          finaldata.data.event_data.maximum_participants
        ) {
          SetIsFull(true);
        }
        setloading(true);
      }
    }

    async function CheckEvent() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      };
      var send_data = {
        event_id: id,
        token,
      };
      const finaldata = await axios.post(
        "/api/events/checkevent",
        send_data,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setevent(finaldata.data.attend);
        SetisInWaiting(finaldata.data.waiting);
      }
    }

    CheckEvent();
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
      event_id: id,
    };
    const finaldata = await axios.post("/api/events/addlikes", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
      notifyWentWrong();
    } else {
      notifyLiked();
      users.fav_event.push(id);
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
      event_id: id,
    };
    const finaldata = await axios.post(
      "/api/events/deletelikes",
      object,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      users.fav_event.pop(id);
      setLike(false);
    }
  };

  const showClubs = (club_id) => {
    history.push("/club/" + club_id);
  };

  const gotoAdmin = () => {
    history.push("/manage/event/" + id);
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
          fav_event={users.fav_event}
          returnData={setUnreadData}
        />
        <div className="flex flex-col md:mx-0 lg:mx-28">
          <div
            // style={{ minHeight: "" }}
            className="flex flex-col md:flex-row flex-nowrap  mt-16 justify-between xs:items-center sm:items-center items-start flex-shrink-0"
          >
            <div className="text-black bg-white rounded-md event-image-div">
              <img
                src={eventdetails.photo}
                className="event-image rounded mt-2"
                alt="event_pic"
              />
            </div>

            <div className="pt-2 px-2 lg:pt-4 flex flex-col event-side-container ml-4">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col items-center">
                  <div className="text-alpha text-xl font-semibold uppercase pl-1  pt-2">
                    {Moment(eventdetails.date).format("MMM")}
                  </div>
                  <div className="text-3xl ">
                    {Moment(eventdetails.date).format("DD")}
                  </div>
                </div>
                <div>
                  <h1
                    className="font-semibold text-2xl text-center ml-4 "
                    style={{ textTransform: "capitalize" }}
                  >
                    {eventdetails.event_name}
                  </h1>
                </div>
                <div>
                  {" "}
                  {users._id === eventdetails.oragnizer_id ? (
                    ""
                  ) : (
                    <ReportEventButton event_id={id}></ReportEventButton>
                  )}
                </div>
                {/* TODO: setting as club page */}
                {users._id === eventdetails.oragnizer_id ? (
                  <div>
                    <button
                      className="float-right text-lg"
                      onClick={() => gotoAdmin()}
                    >
                      <i className=" text-md text-gray-700 fas fa-cog"></i>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col mt-4 text-md text-gray-700 ">
                {" "}
                <div className="ml-2 flex">
                  <div>
                    <i className="fas fa-map-marker-alt text-lg "></i>
                  </div>
                  <div className="ml-3">
                    {eventdetails.location}, {eventdetails.city}
                  </div>
                </div>
                <div className="mt-2 ml-2 flex">
                  <div>
                    {" "}
                    <i className="fas fa-clock"></i>
                  </div>

                  <div className="ml-2">
                    {" "}
                    {Moment(eventdetails.date).format(
                      "MMMM Do YYYY, h:mm:ss A"
                    )}
                  </div>
                </div>
                {/* <button type="button" onClick={handleClick}>
                  Click me
                </button> */}
                {/* <div title="Add to Calendar" className="addeventatc">
                  Add to Calendar
                  <span className="start">05/02/2021 08:00 AM</span>
                  <span className="end">05/02/2021 10:00 AM</span>
                  <span className="timezone">America/Los_Angeles</span>
                  <span className="title">Summary of the event</span>
                  <span className="description">Description of the event</span>
                  <span className="location">Location of the event</span>
                </div> */}
                <div
                  className="mt-2 cursor-pointer"
                  onClick={() => showClubs(eventdetails.club_id)}
                >
                  <div className="flex flex-col ml-1 mb-1">
                    <div>
                      <span className="font-semibold "> Hosted By :</span>
                    </div>
                    {/* // ! setup link here to redirect to ClubPage */}
                    <div className="flex flex-row mt-1">
                      <div>
                        <img
                          src={eventdetails.club_details[0].profile_photo}
                          alt="HostedClubImage"
                          className="rounded mini-club-image mr-4"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="font-semibold">
                          {eventdetails.club_details[0].club_name}
                        </div>
                        <div className="text-sm">
                          {/* // ! put real data here */}
                          {eventdetails.club_details[0].status} Club
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row  mt-2 lg:mt-auto  ">
                <div className="w-6/12">
                  <motion.button
                    className={
                      !isLike
                        ? "w-full text-likealpha bg-white shadow border border-solid hover:bg-alpha hover:text-white active:bg-red-600  font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        : "w-full text-white bg-brightalpha shadow hover:bg-white border border-solid hover:text-alpha active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    }
                    type="button"
                    onClick={isLike ? (e) => deletelike(e) : (e) => addlike(e)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fas fa-heart"></i> {isLike ? "Liked" : "Like"}
                  </motion.button>
                </div>
                &nbsp;
                <div className="w-6/12 self-end">
                  <BigShareButton
                    shareUrl={window.location.href}
                    title={eventdetails.event_name}
                    description={eventdetails.description}
                    tags={eventdetails.tags}
                  ></BigShareButton>
                </div>
              </div>

              {isCompleted || (
                <div
                  title="Add to Calendar"
                  className="addeventatc mt-1  text-xs rounded-lg"
                  style={{ fontSize: "smaller !important" }}
                  data-styling="none"
                >
                  <span className="uppercase">
                    <i className="far fa-calendar-plus text-base"></i> &nbsp;Add
                    to Calendar
                  </span>
                  <span className="arrow">&nbsp;</span>
                  <span className="start">{eventdetails.startdate}</span>
                  <span className="end">{eventdetails.date}</span>
                  <span className="timezone">Asia/Kolkata</span>
                  <span className="title">{eventdetails.event_name}</span>
                  <span className="description">
                    {eventdetails.description}
                  </span>
                  <span className="location">
                    {eventdetails.location +
                      ", " +
                      eventdetails.city +
                      ", " +
                      eventdetails.state}
                  </span>
                </div>
              )}

              {isCompleted ? (
                <div className="flex justify-center uppercase mt-auto mb-4 text-complete border-green-500 font-semibold rounded-lg py-4">
                  Completed
                </div>
              ) : (
                <div className="flex justify-center mt-2">
                  <JoinEventButton
                    eventid={eventdetails._id}
                    startdate={eventdetails.startdate}
                    current={eventdetails.current_participants}
                    max={eventdetails.maximum_participants}
                    check={checkevent}
                    isInWaiting={isInWaiting}
                    isFull={IsFull}
                  ></JoinEventButton>
                </div>
              )}
            </div>
          </div>
          <div className="mx-4 lg:mx-0 my-4">
            <div className="flex flex-col">
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Description
                </div>
                <div className="mt-1 text-lg text-gray-700 lg:w-3/4 leading-relaxed">
                  <pre>{eventdetails.description}</pre>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Eligibility
                </div>
                <div className="mt-1 text-lg text-gray-700 w-3/4 leading-relaxed">
                  <pre>{eventdetails.eligibility}</pre>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Tags
                </div>
                <div className="mt-1 text-lg text-gray-700 w-3/4 leading-relaxed">
                  {eventdetails.tags.map((el, index) => (
                    <Tag name={el} key={index}></Tag>
                  ))}
                </div>
              </div>
              <div
                className="flex flex-col lg:flex-row py-4"
                style={
                  eventdetails.participants_list.length !== 0
                    ? { display: "" }
                    : { display: "none" }
                }
              >
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  People going
                </div>
                {eventdetails.participants_list.length !== 0 ? (
                  <RegisteredMember
                    eventid={id}
                    capacity={eventdetails.maximum_participants}
                  ></RegisteredMember>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  FAQs <br />
                  <AskQuestion event_id={id}></AskQuestion>
                </div>
                <div
                  className="mt-1 text-lg  lg:w-3/4 leading-relaxed"
                  style={{ overflowY: "auto", maxHeight: "400px" }}
                >
                  {eventdetails.faq.length ? (
                    eventdetails.faq.map((el, i) => {
                      return (
                        <details>
                          <summary className={i === 0 ? "pt-0" : ""}>
                            {el.question}
                          </summary>
                          <pre>{el.answer}</pre>
                        </details>
                      );
                    })
                  ) : (
                    <i> Nothing added Yet.</i>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Location
                </div>
                <div className="mt-1 text-lg text-gray-700 lg:w-3/4 leading-relaxed">
                  <MapContainer data={eventdetails} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
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
