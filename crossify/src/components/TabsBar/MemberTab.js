import MemberUserDropdown from "components/Dropdowns/MemberUserDropdown";

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
    id: 6,
    name: "Ashvattha",
    designation: "Member",
    image:
      "http://supertalk.superfuture.com/uploads/profile/photo-thumb-142296.jpg?_r=1424512169",
  },
  {
    id: 7,
    name: "Ashvattha",
    designation: "Member",
    image:
      "http://supertalk.superfuture.com/uploads/profile/photo-thumb-142296.jpg?_r=1424512169",
  },
  {
    id: 8,
    name: "Ashvattha",
    designation: "Member",
    image:
      "http://supertalk.superfuture.com/uploads/profile/photo-thumb-142296.jpg?_r=1424512169",
  },
  {
    id: 9,
    name: "Ashvattha",
    designation: "Member",
    image:
      "http://supertalk.superfuture.com/uploads/profile/photo-thumb-142296.jpg?_r=1424512169",
  },
  {
    id: 10,
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
      displayedContacts: [],
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
      displayedContacts: CONTACTS,
      members: mymembers,
      moderator: mymoderator,
    });
    console.log(this.state);
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
        <a
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
            <a className="flex items-center justify-between mx-3">
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
        <div class="bg-white w-2/3 rounded px-6 shadow ml-auto">
          <div class="border-l-4 border-red-400 -ml-6 pl-6 flex items-center justify-between my-4">
            <div class="font-semibold text-gray-800">Member List</div>
          </div>

          <div class="bg-white w-full shadow  ml-auto mr-8 flex border border-beta rounded-lg my-2">
            <span class="w-auto flex justify-end items-center text-gray-500 p-2">
              <i className="fas fa-search text-beta"></i>
            </span>
            <input
              class="w-full rounded-lg py-2"
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
