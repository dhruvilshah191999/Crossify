// import React from "react";
// import Photo from "../../assets/img/team-4-470x470.png";

// export default class MemberTab extends React.Component {
//   render() {
//     return (
//       <>
//         <div className="flex flex-wrap">
//           <div className="w-full px-4">
//             <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
//               <div className="flex flex-wrap justify-center items-start mt-24 rounded">
//                 {/* left side does not scroll is pending */}
//                 <div className="w-full md:w-4/12">
//                   <ul className="ml-4 mr-4 bg-gray-200 rounded-lg">
//                     <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
//                       <a href="#" className="flex items-center justify-between">
//                         <span>All Members</span>{" "}
//                         <span> {this.props.number1}</span>
//                       </a>
//                     </li>
//                     <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
//                       <a href="#" className="flex items-center justify-between">
//                         <span>Organizers</span>{" "}
//                         <span> {this.props.number2}</span>
//                       </a>
//                     </li>
//                     <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
//                       <a href="#" className="flex items-center justify-between">
//                         <span>Moderators</span>{" "}
//                         <span> {this.props.number3}</span>
//                       </a>
//                     </li>
//                     <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha font-bold rounded-lg pointer">
//                       <a href="#" className="flex items-center justify-between">
//                         <span>Volunteers</span>{" "}
//                         <span> {this.props.number4}</span>
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="w-full md:w-6/12 bg-gray-200 rounded-lg">
//                   <h1 className="text-center font-bold text-xl uppercase border-b border-black p-4">
//                     Club Members
//                   </h1>
//                   <div className="flex justify-center flex-col mt-2">
//                     <div className="flex justify-center items-center my-2">
//                       <img
//                         className="rounded-full mr-4"
//                         alt="club_background_photo"
//                         style={{
//                           height: "50px",
//                           width: "50px",
//                         }}
//                         src={this.props.bgImage}
//                       />
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoFname}
//                       </h1>
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoLname}
//                       </h1>
//                       <h1 className="text-black text-md">
//                         , {this.props.photoPlace}
//                       </h1>
//                     </div>
//                     <div className="flex justify-center items-center my-2">
//                       <img
//                         className="rounded-full mr-4"
//                         alt="club_background_photo"
//                         style={{
//                           height: "50px",
//                           width: "50px",
//                         }}
//                         src={this.props.bgImage}
//                       />
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoFname}
//                       </h1>
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoLname}
//                       </h1>
//                       <h1 className="text-black text-md">
//                         , {this.props.photoPlace}
//                       </h1>
//                     </div>
//                     <div className="flex justify-center items-center my-2">
//                       <img
//                         className="rounded-full mr-4"
//                         alt="club_background_photo"
//                         style={{
//                           height: "50px",
//                           width: "50px",
//                         }}
//                         src={this.props.bgImage}
//                       />
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoFname}
//                       </h1>
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoLname}
//                       </h1>
//                       <h1 className="text-black text-md">
//                         , {this.props.photoPlace}
//                       </h1>
//                     </div>
//                     <div className="flex justify-center items-center my-2">
//                       <img
//                         className="rounded-full mr-4"
//                         alt="club_background_photo"
//                         style={{
//                           height: "50px",
//                           width: "50px",
//                         }}
//                         src={this.props.bgImage}
//                       />
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoFname}
//                       </h1>
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoLname}
//                       </h1>
//                       <h1 className="text-black text-md">
//                         , {this.props.photoPlace}
//                       </h1>
//                     </div>
//                     <div className="flex justify-center items-center my-2">
//                       <img
//                         className="rounded-full mr-4"
//                         alt="club_background_photo"
//                         style={{
//                           height: "50px",
//                           width: "50px",
//                         }}
//                         src={this.props.bgImage}
//                       />
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoFname}
//                       </h1>
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoLname}
//                       </h1>
//                       <h1 className="text-black text-md">
//                         , {this.props.photoPlace}
//                       </h1>
//                     </div>
//                     <div className="flex justify-center items-center my-2">
//                       <img
//                         className="rounded-full mr-4"
//                         alt="club_background_photo"
//                         style={{
//                           height: "50px",
//                           width: "50px",
//                         }}
//                         src={this.props.bgImage}
//                       />
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoFname}
//                       </h1>
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoLname}
//                       </h1>
//                       <h1 className="text-black text-md">
//                         , {this.props.photoPlace}
//                       </h1>
//                     </div>
//                     <div className="flex justify-center items-center my-2">
//                       <img
//                         className="rounded-full mr-4"
//                         alt="club_background_photo"
//                         style={{
//                           height: "50px",
//                           width: "50px",
//                         }}
//                         src={this.props.bgImage}
//                       />
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoFname}
//                       </h1>
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoLname}
//                       </h1>
//                       <h1 className="text-black text-md">
//                         , {this.props.photoPlace}
//                       </h1>
//                     </div>
//                     <div className="flex justify-center items-center my-2">
//                       <img
//                         className="rounded-full mr-4"
//                         alt="club_background_photo"
//                         style={{
//                           height: "50px",
//                           width: "50px",
//                         }}
//                         src={this.props.bgImage}
//                       />
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoFname}
//                       </h1>
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoLname}
//                       </h1>
//                       <h1 className="text-black text-md">
//                         , {this.props.photoPlace}
//                       </h1>
//                     </div>
//                     <div className="flex justify-center items-center my-2">
//                       <img
//                         className="rounded-full mr-4"
//                         alt="club_background_photo"
//                         style={{
//                           height: "50px",
//                           width: "50px",
//                         }}
//                         src={this.props.bgImage}
//                       />
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoFname}
//                       </h1>
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoLname}
//                       </h1>
//                       <h1 className="text-black text-md">
//                         , {this.props.photoPlace}
//                       </h1>
//                     </div>
//                     <div className="flex justify-center items-center my-2">
//                       <img
//                         className="rounded-full mr-4"
//                         alt="club_background_photo"
//                         style={{
//                           height: "50px",
//                           width: "50px",
//                         }}
//                         src={this.props.bgImage}
//                       />
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoFname}
//                       </h1>
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoLname}
//                       </h1>
//                       <h1 className="text-black text-md">
//                         , {this.props.photoPlace}
//                       </h1>
//                     </div>
//                     <div className="flex justify-center items-center my-2">
//                       <img
//                         className="rounded-full mr-4"
//                         alt="club_background_photo"
//                         style={{
//                           height: "50px",
//                           width: "50px",
//                         }}
//                         src={this.props.bgImage}
//                       />
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoFname}
//                       </h1>
//                       <h1 className="text-black text-xl mr-4">
//                         {this.props.photoLname}
//                       </h1>
//                       <h1 className="text-black text-md">
//                         , {this.props.photoPlace}
//                       </h1>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// MemberTab.defaultProps = {
//   bgImage: Photo,
//   photoFname: "Sagar",
//   photoLname: "Solanki",
//   photoPlace: "Nikol",
//   number1: "100",
//   number2: "20",
//   number3: "30",
//   number4: "50",
// };
import MemberUserDropdown from "components/Dropdowns/MemberUserDropdown";
//import { white } from "tailwindcss/colors";
//import "./MemberList.css";
var React = require("react");
let CONTACTS = [
  {
    id: 1,
    name: "Natarajah",
    designation: "Moderator",
    image: "http://accounts-cdn.9gag.com/media/avatar/14368888_100_1.jpg",
  },
  {
    id: 2,
    name: "Krot",
    designation: "Admin",
    image:
      "http://forums.animeboston.com/download/file.php?avatar=11355_1455595397.png",
  },
  {
    id: 3,
    name: "Mandala",
    designation: "0975149873",
    image: "http://avatars-cdn.9gag.com/avatar/erickson8903_14899765_100.jpg",
  },
  {
    id: 4,
    name: "Shiva",
    designation: "Member",
    image:
      "https://38.media.tumblr.com/4249a67e76729e9126ef3f70e741c323/tumblr_inline_mixcyvIPd81qz4rgp.jpg",
  },
  {
    id: 5,
    name: "Ashvattha",
    designation: "Member",
    image:
      "http://supertalk.superfuture.com/uploads/profile/photo-thumb-142296.jpg?_r=1424512169",
  },
  {
    id: 5,
    name: "Ashvattha",
    designation: "Member",
    image:
      "http://supertalk.superfuture.com/uploads/profile/photo-thumb-142296.jpg?_r=1424512169",
  },
  {
    id: 5,
    name: "Ashvattha",
    designation: "Member",
    image:
      "http://supertalk.superfuture.com/uploads/profile/photo-thumb-142296.jpg?_r=1424512169",
  },
  {
    id: 5,
    name: "Ashvattha",
    designation: "Member",
    image:
      "http://supertalk.superfuture.com/uploads/profile/photo-thumb-142296.jpg?_r=1424512169",
  },
  {
    id: 5,
    name: "Ashvattha",
    designation: "Member",
    image:
      "http://supertalk.superfuture.com/uploads/profile/photo-thumb-142296.jpg?_r=1424512169",
  },
  {
    id: 5,
    name: "Ashvattha",
    designation: "Member",
    image:
      "http://supertalk.superfuture.com/uploads/profile/photo-thumb-142296.jpg?_r=1424512169",
  },
];

class Contact extends React.Component {
  render() {
    return (
      <>
        <div class="flex items-center justify-between my-4">
          <div class="w-16">
            <img
              class="w-12 h-12 rounded-full"
              src={this.props.image}
              alt="img"
            />
          </div>
          <div class="flex-1 pl-2">
            <div class="text-gray-700 font-semibold">{this.props.name}</div>
            <div class="text-gray-600 font-thin">{this.props.phone}</div>
          </div>
          <div class="text-red-400 mr-4">
            <MemberUserDropdown />
          </div>
        </div>
        <hr class="boder-b-0 my-4" />
      </>
    );
  }
}

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedContacts: CONTACTS,
      currentTab: 0,
      members: [],
      moderator: [],
    };
  }

  componentDidMount() {
    //todo get the memberlist by axios

    const mymoderator = CONTACTS.filter(
      (el) => el.designation === "Moderator" || el.designation === "Admin"
    );
    const mymembers = CONTACTS.filter((el) => el.designation === "Member");
    this.setState({
      members: mymembers,
      moderator: mymoderator,
    });
  }
  searchHandler = (event) => {
    let searcjQery = event.target.value.toLowerCase(),
      displayedContacts = this.state.displayedContacts.filter((el) => {
        let searchValue = el.name.toLowerCase();
        let authority = el.designation.toLowerCase();
        return (
          searchValue.indexOf(searcjQery) !== -1 ||
          authority.indexOf(searcjQery) !== -1
        );
      });
    this.setState({
      displayedContacts: displayedContacts,
    });
  };

  renderSideMenu() {
    const mods = this.state.moderator;
    const mem = this.state.members;
    console.log("Mods : " + mods);
    let section = [
      { name: "All", val: [...mods, ...mem] },
      { name: "Moderators", val: [...mods] },
      { name: "Members", val: [...mem] },
    ];

    return section.map((el, index) => {
      return (
        <li
          className={
            this.state.currentTab === index
              ? "p-4  bg-beta text-white  hover:bg-lightbeta w-full rounded-lg pointer mb-2"
              : "p-4 text-gray-900 hover:text-white hover:bg-lightbeta w-full rounded-lg pointer mb-2 "
          }
        >
          <a
            onClick={() => {
              this.setState({
                currentTab: index,
                displayedContacts: el.val,
              });
            }}
            className="flex items-center justify-between"
          >
            <span>{el.name}</span> <span>{el.val.length}</span>
          </a>
        </li>
      );
    });
  }
  render() {
    let contacts = this.state.displayedContacts;

    return (
      <div className="relative flex flex-row min-w-0 break-words w-full mb-6  rounded-lg  border-0">
        <div class="bg-white w-1/3  px-6 mr-auto">
          <div class="border-l-4 -ml-6 pl-6 justify-between my-4">
            <ul className=" rounded-lg">
              {this.renderSideMenu()}
              {/* <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha w-full rounded-lg pointer">
                <a
                  onClick={() => this.setState({ currentTab: 0 })}
                  className="flex items-center justify-between"
                >
                  <span>All Members</span> <span>50</span>
                </a>
              </li>
              <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha  rounded-lg pointer">
                <a
                  onClick={() => this.setState({ currentTab: 1 })}
                  className="flex items-center justify-between"
                >
                  <span>Admin</span> <span> 2</span>
                </a>
              </li>
              <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha  rounded-lg pointer">
                <a
                  onClick={() => this.setState({ currentTab: 2 })}
                  className="flex items-center justify-between"
                >
                  <span>Moderators</span> <span> 10</span>
                </a>
              </li>
              <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha  rounded-lg pointer">
                <a
                  onClick={() => this.setState({ currentTab: 3 })}
                  className="flex items-center justify-between"
                >
                  <span>Members</span> <span> 100</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div class="bg-white w-2/3 rounded px-6 shadow ml-auto">
          <div class="border-l-4 border-red-400 -ml-6 pl-6 flex items-center justify-between my-4">
            <div class="font-semibold text-gray-800">Member List</div>
          </div>
          {/* <hr class="-mx-6" /> */}
          {/* <div class="relative flex w-full flex-wrap items-stretch mb-2">
            <span class=" h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i class="fas fa-eye"></i>
            </span>
            <input
              type="text"
              placeholder="Search here..."
              class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
              classNAme="search"
              onChange={this.searchHandler}
            />
          </div> */}
          <div class="bg-white w-full shadow  ml-auto mr-8 flex border border-beta rounded-lg my-2">
            <span class="w-auto flex justify-end items-center text-gray-500 p-2">
              <i className="fas fa-search text-beta"></i>
            </span>
            <input
              class="w-full rounded-lg py-2"
              type="text"
              placeholder="Search Event..."
              onChange={this.searchHandler}
            />
          </div>
          <div className="overflow-y members-container">
            <ul>
              {contacts.map((el) => {
                return (
                  <Contact
                    key={el.id}
                    name={el.name}
                    image={el.image}
                    phone={el.designation}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactList;
