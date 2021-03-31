import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "moment";
import { useParams } from "react-router";
import Navbar from "components/Navbars/ClubNavbar";
import dance_cat from "assets/img/travel_cat.jpg";
import MapContainer from "components/Maps/ViewOnlyMap";
import AskQuestion from "components/SweetAlerts/AskQuestion";
import RegisteredMember from "components/Cards/RegisteredMembers";
import JoinEventButton from "components/SweetAlerts/JoinEventButton";
import ReportEventButton from "components/SweetAlerts/ReportEventButton";
import { store } from "react-notifications-component";
import { motion } from "framer-motion";
import BigShareButton from "components/SweetAlerts/BigShareButton";

const Tag = (props) => {
  return (
    <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-beta bg-lightbeta uppercase last:mr-0 mr-2">
      {props.name}
    </span>
  );
};

export default function EventPage(props) {
  var { id } = useParams();
  const [loading, setloading] = useState(false);
  const [like, setLike] = useState(false);
  const [isInWaiting, SetisInWaiting] = useState(false);
  const [IsFull, SetIsFull] = useState(false);
  const [eventdetails, Seteventsdetails] = useState({});
  const [checkevent, setevent] = useState(false);
  const token = localStorage.getItem("jwt");
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
          finaldata.data.event_data.current_participants >=
          finaldata.data.event_data.maximum_participants
        ) {
          SetIsFull(true);
        }
        setTimeout(() => {
          setloading(true);
        }, 1000);
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

    async function fetchData() {
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
        "/api/events/checklikes",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        setLike(finaldata.data.Like);
      }
    }

    fetchData();
    CheckEvent();
    event_details();
  }, []);

  const notifyCopied = () => {
    store.addNotification({
      title: "Succesfully Copied to Clipboard",
      message: "Share the event with your friends ! ",
      type: "info",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        // onScreen: true,
      },
    });
  };

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
      store.addNotification({
        title: "Something went wrong",
        message: "Cannot add to favourite",
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          // onScreen: true,
        },
      });
    } else {
      store.addNotification({
        title: "Added to Favourites !",
        message: "You can access with ease in your profile.",
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          // onScreen: true,
        },
      });
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
      setLike(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-start  lg:mx-28">
          <div
            onLoadStart={(e) => setTimeout(10000)}
            // style={{ minHeight: "" }}
            className="flex flex-row flex-wrap  mt-16  justify-center items-start flex-shrink-0"
          >
            <div className="mr-6 text-black bg-white rounded-md">
              <img
                src={eventdetails.photo}
                className="event-image  rounded mt-2"
                alt="event_pic"
              />
            </div>

            <div className="pt-2 px-2 lg:pt-4 flex flex-col event-side-container">
              <div className="flex flex-row">
                <div className="flex flex-col justify-center">
                  <div className="text-alpha text-xl font-semibold uppercase pl-1  pt-2">
                    {Moment(eventdetails.date).format("MMM")}
                  </div>
                  <div className=" text-3xl ">
                    {Moment(eventdetails.date).format("DD")}
                  </div>
                </div>
                <div>
                  <h1
                    className="mt-3 font-semibold text-2xl text-center ml-6"
                    style={{ textTransform: "capitalize" }}
                  >
                    {eventdetails.event_name}
                  </h1>
                </div>
                <div className="ml-auto mt-4 mr-3">
                  {" "}
                  <ReportEventButton event_id={id}></ReportEventButton>
                </div>
              </div>
              <div className="flex flex-col mt-4 text-md text-gray-700 ">
                {" "}
                <div className="ml-2 flex">
                  <div>
                    <i class="fas fa-map-marker-alt text-lg "></i>
                  </div>
                  <div className="ml-3">
                    {eventdetails.location},{eventdetails.city}
                  </div>
                </div>
                <div className="mt-2 ml-2 flex">
                  <div>
                    {" "}
                    <i class="fas fa-clock"></i>
                  </div>

                  <div className="ml-2">
                    {" "}
                    {Moment(eventdetails.date).format(
                      "MMMM Do YYYY, h:mm:ss A"
                    )}
                  </div>
                </div>
                <div className="mt-6">
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
                    title={eventdetails.event_name}
                    description={eventdetails.description}
                    tags={eventdetails.tags}
                  ></BigShareButton>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <JoinEventButton
                  eventid={eventdetails._id}
                  current={eventdetails.current_participants}
                  max={eventdetails.maximum_participants}
                  check={checkevent}
                  isInWaiting={isInWaiting}
                  isFull={IsFull}
                ></JoinEventButton>
              </div>
            </div>
          </div>
          <div className="mx-6 my-4">
            <div className="flex flex-col">
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Description
                </div>
                <div className="mt-1 text-lg text-gray-700 lg:w-3/4 leading-relaxed">
                  {eventdetails.description}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Eligibility
                </div>
                <div className="mt-1 text-lg text-gray-700 w-3/4 leading-relaxed">
                  {eventdetails.eligibility}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Tags
                </div>
                <div className="mt-1 text-lg text-gray-700 w-3/4 leading-relaxed">
                  {eventdetails.tags.map((el) => (
                    <Tag name={el}></Tag>
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
              {/* // ! showing FAQ even tho there is no FAQs */}
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  FAQs <br />
                  <AskQuestion event_id={id}></AskQuestion>
                </div>
                <div
                  className="mt-1 text-lg  lg:w-3/4 leading-relaxed"
                  style={{ overflowY: "auto", maxHeight: "400px" }}
                >
                  {eventdetails.faq.some((cur) => cur == "public") ? (
                    eventdetails.faq.map((el, i) => {
                      if (el.privacy == "public" && el.status == "answered") {
                        if (i == 0) {
                          return (
                            <details>
                              <summary className="pt-0">{el.question}</summary>
                              <p>{el.answer}</p>
                            </details>
                          );
                        }
                        return (
                          <details>
                            <summary>{el.question}</summary>
                            <p>{el.answer}</p>
                          </details>
                        );
                      }
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
      </>
    );
  } else {
    return <></>;
  }
}

EventPage.defaultProps = {
  eventName: "Exhibition Hack",
  eventLocation: "Ghatlodia, Ahmedabad",
  dateAndTime: "Saturday  Feb 14 13:45 (IST)",
  hostedBy: "GreyHat Badshahs",
  hostedByPrivacy: "Public",
  hostedByImg: dance_cat,
  eligibility: " Minimin age of person shoul be 18 years old.",
  peopleGoing: 34,
  description:
    "My house is a super cozy and eclectically decorated craftsman style home with a fenced in backyard for pooches. Its situated in the historic Observatory Hill neighborhood of Pittsburgh.Its 100% a short term rental and no one lives there full time so its perfect for small get togethers, meetings and photo shoots.  Ive hosted a number of shoots and video productions as well as small intimate parties and meetings.  There is a stocked coffee station and plenty of parking on the street. I've spent years collecting decorations and furniture to create an inviting fun space. It's in a unique location that is just 4 miles from downtown and 2 miles to the stadiums. I’ve found that I can get anywhere in the area quickly from this spot. There are always plenty of Ubers/Lyfts available in minutes.",
  day: 27,
  month: "FEB",
  qna: [
    {
      question: "What special about this ?",
      answer: "Nothing",
    },
    {
      question: "Is there any fees required ?",
      answer: "No It's Free for all. Enjoy",
    },
    {
      question: "How much people should I expect ?",
      answer: "around 40-50 people usually present in this type of event.",
    },
  ],
  tags: [
    "Sports",
    "Tech",
    "Science",
    "Computers",
    "Programming",
    "Coding",
    "Hacking",
  ],
};
