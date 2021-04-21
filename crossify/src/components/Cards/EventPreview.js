import React, { useEffect, useState } from "react";
import Moment from "moment";
import Tag from "components/Tag";
import { useParams } from "react-router";
import dance_cat from "assets/img/travel_cat.jpg";
import demopf from "assets/img/demopf.png";
import MapContainer from "components/Maps/ViewOnlyMap";
import AskQuestion from "components/SweetAlerts/AskQuestion";
import RegisteredMember from "components/Cards/RegisteredMembers";
import JoinEventButton from "components/SweetAlerts/JoinEventButton";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import { motion } from "framer-motion";

export default function EventPreview(props) {
  var { id } = useParams();
  const [eventdetails, Seteventsdetails] = useState({});
  const [loading, setloading] = useState(false);
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
        setTimeout(() => {
          setloading(true);
        }, 300);
      }
    }
    event_details();
  }, []);

  if (loading) {
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-b border-0">
          <div className="rounded-t bg-gray-200 mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">
                {" "}
                Event Preview
              </h6>
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                // onClick={(e) => onSubmit(e)}
              >
                Edit &nbsp; <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div
              onLoadStart={(e) => setTimeout(10000)}
              className="flex flex-col lg:flex-row flex-wrap mt-4 justify-center items-start"
            >
              <div className="event-preview-photo-container mr-6  text-black bg-white rounded-md ">
                <img
                  src={eventdetails.photo}
                  className="event-image-preview align-middle rounded-lg mt-2"
                  alt="event_pic"
                />
              </div>

              <div className="pt-2 px-2 lg:pt-4 flex flex-col event-side-container ">
                <div className="flex flex-col lg:flex-row">
                  <div className="flex flex-col justify-center">
                    <div className="text-alpha text-xl font-semibold uppercase pt-2">
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
                </div>
                <div className="flex flex-col mt-4 text-md text-gray-700 ">
                  {" "}
                  <div>
                    <i className="fas fa-map-marker-alt text-lg "></i>
                    <span className="ml-2">
                      {" "}
                      {eventdetails.location},{eventdetails.city}
                    </span>
                  </div>
                  <div className="mt-2">
                    {" "}
                    <i className="fas fa-clock"></i>
                    <span className="ml-2">
                      {" "}
                      {Moment(eventdetails.date).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </span>
                  </div>
                  <div className="mt-6">
                    <div className="flex flex-col mb-1">
                      <div>
                        <span className="font-semibold"> Hosted By :</span>
                      </div>
                      <div className="flex flex-col lg:flex-row">
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
                            {props.hostedByPrivacy} Club
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row  mt-3 md:mt-auto ">
                  <div className="w-6/12">
                    <motion.button
                      className="w-full text-red-500 bg-white shadow border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      style={{ cursor: "not-allowed" }}
                      whileHover={{ scale: 1.1 }}
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
                      style={{ cursor: "not-allowed" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fas fa-share-alt"></i> Share
                    </motion.button>
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <JoinEventButton readonly={true}></JoinEventButton>
                </div>
              </div>
            </div>
            <div className=" m-4 lg:mx-6 lg:my-4">
              <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row py-4">
                  <div className="font-semibold text-gray-800 text-2xl w-full lg:w-1/4">
                    Description
                  </div>
                  <div className="mt-1 text-lg text-gray-700 w-full lg:w-3/4 leading-relaxed">
                    {eventdetails.description}
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row py-4">
                  <div className="font-semibold text-gray-800 text-2xl w-full lg:w-1/4">
                    Eligibility
                  </div>
                  <div className="mt-1 text-lg text-gray-700 w-full lg:w-3/4 leading-relaxed">
                    {eventdetails.eligibility}
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row py-4">
                  <div className="font-semibold text-gray-800 text-2xl w-full lg:w-1/4">
                    Tags
                  </div>
                  <div className="mt-1 text-lg text-gray-700 w-full lg:w-3/4 leading-relaxed">
                    {eventdetails.tags.map((el) => (
                      <Tag data={el}></Tag>
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
                  <div className="font-semibold text-gray-800 text-2xl w-full lg:w-1/4">
                    People going
                  </div>
                  {eventdetails.participants_list.length !== 0 ? (
                    <RegisteredMember eventid={id}></RegisteredMember>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex flex-col lg:flex-row py-4">
                  <div className="font-semibold text-gray-800 text-2xl w-full lg:w-1/4">
                    FAQs <br />
                    <AskQuestion></AskQuestion>
                    {/* <button className="font-semibold border shadow hover:bg-lightbeta focus:outline-none border-beta hover:border-beta text-white text-sm px-4 py-1 rounded bg-beta">
                    <i className="fas fa-user-plus"></i> Ask
                  </button> */}
                  </div>
                  <div
                    className="mt-1 text-lg  w-3/4 leading-relaxed"
                    style={{ overflowY: "auto", maxHeight: "400px" }}
                  >
                    {eventdetails.faq.length ? (
                      eventdetails.faq.map((el, i) => {
                        if (
                          el.privacy === "public" &&
                          el.status === "answered"
                        ) {
                          if (i === 0) {
                            return (
                              <details>
                                <summary className="pt-0">
                                  {el.question}
                                </summary>
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
                      <i>Nothing Added Yet.</i>
                    )}
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row py-4">
                  <div className="font-semibold text-gray-800 text-2xl w-full lg:w-1/4">
                    Location
                  </div>
                  <div className="mt-1 text-lg text-gray-700 w-full lg:w-3/4 leading-relaxed">
                    <MapContainer data={eventdetails} />
                  </div>
                </div>
              </div>
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
          style={{ height: "60vh" }}
        >
          <ScaleLoader color="#825ee4" size={60} />
        </div>
      </>
    );
  }
}
EventPreview.defaultProps = {
  eventName: "Exhibition Hack",
  eventLocation: "Ghatlodia, Ahmedabad",
  dateAndTime: "Saturday  Feb 14 13:45 (IST)",
  photo: demopf,
  hostedBy: "GreyHat Badshahs",
  hostedByPrivacy: "Public",
  hostedByImg: dance_cat,
  eligibility: " Minimin age of person shoul be 18 years old.",
  peopleGoing: 34,
  description:
    "My house is a super cozy and eclectically decorated craftsman style home with a fenced in backyard for pooches. Its situated in the historic Observatory Hill neighborhood of Pittsburgh.Its 100% a short term rental and no one lives there full time so its perfect for small get togethers, meetings and photo shoots.  Ive hosted a number of shoots and video productions as well as small intimate parties and meetings.  There is a stocked coffee station and plenty of parking on the street. I've spent years collecting decorations and furniture to create an inviting fun space. It's in a unique location that is just 4 miles from downtown and 2 miles to the stadiums. I’ve found that I can get anywhere in the area quickly from this spot. There are always plenty of Ubers/Lyfts available in minutes.",
  day: 27,
  month: "FEB",
  faq: [
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
