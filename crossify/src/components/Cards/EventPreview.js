import React, { useEffect, useState } from "react";
import Moment from "moment";
import Tag from "components/Tag";
import dance_cat from "assets/img/travel_cat.jpg";
import demopf from "assets/img/demopf.png";
import MapContainer from "components/Maps/MapCode";
import AskQuestion from "components/Modals/AskQuestion";
import RegisteredMember from "components/Cards/RegisteredMembers";
import JoinEventButton from "components/Modals/JoinEventButton";
// import axios from "axios";
// import City from "../../views/auth/states-and-districts.json";
export default function EventPreview(props) {
  // const token = localStorage.getItem("jwt");
  // const [statename, setStateName] = useState("");
  // const [cityname, setCityName] = useState("");
  // const [formData, SetformData] = useState({
  //   username: "",
  //   email: "",
  //   fname: "",
  //   lname: "",
  //   address: "",
  //   postalcode: "",
  //   about_me: "",
  //   occupation: "",
  // });

  // //todo GOLU added occupation in the form as well
  // const {
  //   username,
  //   email,
  //   fname,
  //   lname,
  //   address,
  //   postalcode,
  //   about_me,
  //   occupation,
  // } = formData;

  // const onChange = (e) =>
  //   SetformData({ ...formData, [e.target.name]: e.target.value });

  // var districts = [];
  // if (statename !== "") {
  //   const citylist = City.states.find((city) => city.state === statename);
  //   districts = citylist.districts;
  // }

  // useEffect(() => {
  //   async function fetchData() {
  //     const config = {
  //       method: "POST",
  //       header: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     var object = {
  //       token: token,
  //     };
  //     const finaldata = await axios.post(
  //       "/api/profile/get-user",
  //       object,
  //       config
  //     );
  //     if (finaldata.data.is_error) {
  //       console.log(finaldata.data.message);
  //     } else {
  //       SetformData({
  //         username: finaldata.data.data.username,
  //         email: finaldata.data.data.email,
  //         fname: finaldata.data.data.fname,
  //         lname: finaldata.data.data.lname,
  //         address: finaldata.data.data.address,
  //         postalcode: finaldata.data.data.pincode,
  //         about_me: finaldata.data.data.about_me,
  //         occupation: finaldata.data.data.occupation,
  //       });
  //       setStateName(finaldata.data.data.state);
  //       setCityName(finaldata.data.data.city);
  //     }
  //   }

  //   fetchData();
  // }, []);

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   var object = {
  //     username,
  //     fname,
  //     lname,
  //     email,
  //     address,
  //     city: cityname,
  //     state: statename,
  //     about_me,
  //     pincode: postalcode,
  //     occupation,
  //     token,
  //   };
  //   const config = {
  //     method: "POST",
  //     header: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const finaldata = await axios.post(
  //     "/api/profile/update-user",
  //     object,
  //     config
  //   );
  //   if (finaldata.data.is_error) {
  //     console.log(finaldata.data.message);
  //   } else {
  //     window.location.reload();
  //   }
  // };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-b border-0">
        <div className="rounded-t bg-gray-200 mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold"> Event Preview</h6>
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
                src={props.photo}
                className="event-image-preview align-middle rounded-lg mt-2"
                alt="event_pic"
              />
            </div>

            <div className="pt-2 px-2 lg:pt-4 flex flex-col event-side-container ">
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col justify-center">
                  <div className="text-alpha text-xl font-semibold  pt-2">
                    {Moment(props.date).format("MMM")}
                  </div>
                  <div className=" text-3xl ">
                    {Moment(props.date).format("DD")}
                  </div>
                </div>
                <div>
                  <h1
                    className="mt-3 font-semibold text-2xl text-center ml-6"
                    style={{ textTransform: "capitalize" }}
                  >
                    {props.event_name}
                  </h1>
                </div>
              </div>
              <div className="flex flex-col mt-4 text-md text-gray-700 ">
                {" "}
                <div>
                  <i class="fas fa-map-marker-alt text-lg "></i>
                  <span className="ml-2">
                    {" "}
                    {props.location},{props.city}
                  </span>
                </div>
                <div className="mt-2">
                  {" "}
                  <i class="fas fa-clock"></i>
                  <span className="ml-2">
                    {" "}
                    {Moment(props.date).format("MMMM Do YYYY, h:mm:ss a")}
                  </span>
                </div>
                <div className="mt-6">
                  <div className="flex flex-col">
                    <div>
                      <span className="font-semibold"> Hosted By :</span>
                    </div>
                    <div className="flex flex-col lg:flex-row">
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
              <div className="flex flex-col lg:flex-row  mt-3 md:mt-auto ">
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
                // eventid={props._id}
                // check={checkevent}
                ></JoinEventButton>
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
                  {props.description}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl w-full lg:w-1/4">
                  Eligibility
                </div>
                <div className="mt-1 text-lg text-gray-700 w-full lg:w-3/4 leading-relaxed">
                  {props.eligibility}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl w-full lg:w-1/4">
                  Tags
                </div>
                <div className="mt-1 text-lg text-gray-700 w-full lg:w-3/4 leading-relaxed">
                  {props.tags.map((el) => (
                    <Tag data={el}></Tag>
                  ))}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl w-full lg:w-1/4">
                  People going
                </div>
                <RegisteredMember></RegisteredMember>
              </div>

              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl w-full lg:w-1/4">
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
                  {props.faq.map((el, i) => {
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
                <div className="font-semibold text-gray-800 text-2xl w-full lg:w-1/4">
                  Location
                </div>
                <div className="mt-1 text-lg text-gray-700 w-full lg:w-3/4 leading-relaxed">
                  <MapContainer lat={props.latitude} long={props.longitude} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
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
