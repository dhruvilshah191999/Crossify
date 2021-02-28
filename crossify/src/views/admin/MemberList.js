import MemberDropdown from "components/Dropdowns/MemberDropdown";
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
          <div class="text-red-400">
            <MemberDropdown></MemberDropdown>
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
    this.state = { displayedContacts: CONTACTS, currentTab: 1 };
  }

  searchHandler = (event) => {
    let searcjQery = event.target.value.toLowerCase(),
      displayedContacts = CONTACTS.filter((el) => {
        let searchValue = el.name.toLowerCase();
        let authority = el.designation.toLowerCase();
        if (
          searchValue.indexOf(searcjQery) !== -1 ||
          authority.indexOf(searcjQery) !== -1
        ) {
          return true;
        }
        return false;
      });
    this.setState({
      displayedContacts: displayedContacts,
    });
  };
  render() {
    let contacts = this.state.displayedContacts;

    return (
      <div className="relative flex flex-row min-w-0 break-words w-full mb-6  rounded-lg  border-0">
        <div class="bg-white w-1/3 rounded px-6 shadow mr-auto">
          <div class="border-l-4 border-red-400 -ml-6 pl-6 justify-between my-4">
            <ul className=" rounded-lg">
              <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha w-full rounded-lg pointer">
                <a href="#" className="flex items-center justify-between">
                  <span>All Members</span> <span>50</span>
                </a>
              </li>
              <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha  rounded-lg pointer">
                <a href="#" className="flex items-center justify-between">
                  <span>Admin</span> <span> 2</span>
                </a>
              </li>
              <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha  rounded-lg pointer">
                <a href="#" className="flex items-center justify-between">
                  <span>Moderators</span> <span> 10</span>
                </a>
              </li>
              <li className="p-4 text-gray-900 hover:text-white hover:bg-alpha  rounded-lg pointer">
                <a href="#" className="flex items-center justify-between">
                  <span>Members</span> <span> 100</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="bg-white w-2/3 rounded px-6 shadow ml-auto">
          <div class="border-l-4 border-red-400 -ml-6 pl-6 flex items-center justify-between my-4">
            <div class="font-semibold text-gray-800">Member List</div>
            <div class="text-red-400">See all</div>
          </div>
          <hr class="-mx-6" />
          <div class="relative flex w-full flex-wrap items-stretch mb-2">
            <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i class="fas fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="Search here..."
              class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
              classNAme="search"
              onChange={this.searchHandler}
            />
          </div>
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
    );
  }
}

export default ContactList;
