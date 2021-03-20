import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "moment";
import { useParams } from "react-router";
import Navbar from "components/Navbars/ClubNavbar";
import dance_cat from "assets/img/travel_cat.jpg";
import MapContainer from "components/Maps/MapCode";
import AskQuestion from "components/Modals/AskQuestion";
import RegisteredMember from "components/Cards/RegisteredMembers";
import JoinEventButton from "components/Modals/JoinEventButton";
import ReportEventButton from "components/Modals/ReportEventButton";
import { store } from "react-notifications-component";

// todo For Golu : MapContainer has to changed because we only want Map which shows the Event latitude and Longitute

const Tag = (props) => {
  return (
    <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-beta bg-lightbeta uppercase last:mr-0 mr-2">
      {props.name}
    </span>
  );
};

export default function EventPage(props) {
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const [eventdetails, Seteventsdetails] = useState({});
  const [checkevent, setevent] = useState(false);
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
        setTimeout(setloading(true), 1000);
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
      }
    }

    CheckEvent();
    event_details();
  }, []);
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col  container  event-container">
          <div
            onLoadStart={(e) => setTimeout(10000)}
            className="flex flex-row flex-wrap mt-20 justify-center items-start"
          >
            <div className=" mr-6  text-black bg-white rounded-md ">
              <img
                src={eventdetails.photo}
                className="event-image align-middle rounded mt-2"
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
                    <span>
                      {" "}
                      <ReportEventButton></ReportEventButton>
                    </span>
                  </h1>
                </div>
              </div>
              <div className="flex flex-col mt-4 text-md text-gray-700 ">
                {" "}
                <div>
                  <i class="fas fa-map-marker-alt text-lg "></i>
                  <span className="ml-2">
                    {" "}
                    {eventdetails.location},{eventdetails.city}
                  </span>
                </div>
                <div className="mt-2">
                  {" "}
                  <i class="fas fa-clock"></i>
                  <span className="ml-2">
                    {" "}
                    {Moment(eventdetails.date).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </span>
                </div>
                <div className="mt-6">
                  <div className="flex flex-col">
                    <div>
                      <span className="font-semibold"> Hosted By :</span>
                    </div>
                    <div className="flex flex-row">
                      <div>
                        <img
                          src={props.hostedByImg}
                          alt="HostedClubImage"
                          className="rounded mini-club-image mr-4"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="font-semibold">{props.hostedBy}</div>
                        <div className="text-sm">
                          {props.hostedByPrivacy} Club
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row  mt-2 lg:mt-auto ">
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
              <div className="flex justify-center mt-2">
                <JoinEventButton
                  eventid={eventdetails._id}
                  check={checkevent}
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
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  People going
                </div>
                <RegisteredMember></RegisteredMember>
              </div>

              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  FAQs <br />
                  <AskQuestion></AskQuestion>
                  {/* <button className="font-semibold border shadow hover:bg-lightbeta focus:outline-none border-beta hover:border-beta text-white text-sm px-4 py-1 rounded bg-beta">
                    <i class="fas fa-user-plus"></i> Ask
                  </button> */}
                </div>
                <div
                  className="mt-1 text-lg  w-3/4 leading-relaxed"
                  style={{ overflowY: "auto", maxHeight: "400px" }}
                >
                  {eventdetails.faq.map((el, i) => {
                    if (el.answer != null && el.answer != "") {
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
                  })}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Location
                </div>
                <div className="mt-1 text-lg text-gray-700 w-3/4 leading-relaxed">
                  <MapContainer
                    lat={eventdetails.latitude}
                    long={eventdetails.longitude}
                  />
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
