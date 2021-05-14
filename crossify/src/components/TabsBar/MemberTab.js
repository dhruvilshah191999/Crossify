import Moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
var React = require("react");
class Contact extends React.Component {
  render() {
    return (
      <>
        <Link
          className="flex items-center justify-between my-4 cursor-pointer"
          to={`/profilepage/${this.props.user_id}`}
        >
          <div className="w-16">
            <img
              className="w-12 h-12 rounded-full"
              src={this.props.image}
              alt="img"
            />
          </div>
          <div className="flex-1 pl-2">
            <div
              className="text-gray-700 font-semibold text-lg"
              style={{ textTransform: "capitalize", lineHeight: "1rem" }}
            >
              {this.props.name}
            </div>

            <div
              className="text-gray-600 font-thin text-sm"
              style={{ textTransform: "capitalize" }}
            >
              {"Joined "}
              {Moment(this.props.date).format("MMM YYYY")}
              <div
                className="text-gray-600 font-thin text-sm"
                style={{ textTransform: "capitalize", lineHeight: "0.75rem" }}
              >
                {this.props.phone}
              </div>
            </div>
          </div>
          {/*<div className="text-red-400 mr-4">
            <MemberUserDropdown />
            </div>*/}
        </Link>
        <hr className="boder-b-0 my-4" />
      </>
    );
  }
}
class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedContacts: [],
      finalContacts: [],
      currentTab: 0,
      members: [],
      moderator: [],
      club_id: this.props.club_id,
    };
  }
  async componentDidMount() {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    var send_data = {
      club_id: this.state.club_id,
    };
    const finaldata = await axios.post(
      "/api/club/GetMembers",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({
        displayedContacts: finaldata.data.data,
        finalContacts: finaldata.data.data,
        members: finaldata.data.members,
        moderator: finaldata.data.moderator,
        creatorId: finaldata.creator_id,
      });
    }
  }
  searchHandler = (event) => {
    let searcjQery = event.target.value.toLowerCase(),
      displayedContacts = this.state.finalContacts.filter((el) => {
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
        <a
          href={() => false}
          onClick={() => {
            this.setState({
              currentTab: index,
              displayedContacts: el.val,
            });
          }}
        >
          <li
            className={
              this.state.currentTab === index
                ? "p-2 m-2  bg-beta text-white   rounded-lg pointer mb-2"
                : "p-2 m-2 text-gray-900 hover:text-white hover:bg-lightbeta  rounded-lg pointer mb-2 "
            }
          >
            <a
              href={() => false}
              className="flex items-center justify-between mx-3"
            >
              <span>{el.name}</span> <span>{el.val.length}</span>
            </a>
          </li>
        </a>
      );
    });
  }
  render() {
    let contacts = this.state.displayedContacts;

    return (
      <div className="relative flex flex-row min-w-0 break-words w-full mb-6  rounded-lg  border-0">
        <div className="w-1/3">
          <ul className="ml-4 mr-4 rounded-lg ">
            <div className="p-4 font-semibold text-lg mx-3 border-b">
              Category
            </div>
            {this.renderSideMenu()}
          </ul>
        </div>
        <div className="bg-white w-2/3 rounded px-6 shadow ml-auto">
          <div className="border-l-4 border-red-400 -ml-6 pl-6 flex items-center justify-between my-4">
            <div className="font-semibold text-gray-800">Member List</div>
          </div>

          <div className="bg-white w-full shadow  ml-auto mr-8 flex border border-beta rounded-lg my-2">
            <span className="w-auto flex justify-end items-center text-gray-500 p-2">
              <i className="fas fa-search text-beta"></i>
            </span>
            <input
              className="w-full rounded-lg py-2"
              type="text"
              placeholder="Search Club Stakeholders"
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
                    date={el.date}
                    user_id={el.user_id}
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
