import React, { Component, useState } from "react";
import demoImg1 from "../../assets/img/pp1.jpg";
import demoImg2 from "../../assets/img/pp3.jpg";
import demoImg3 from "../../assets/img/pp4.jpg";

const Member = (props) => {
  return (
    <div class="flex items-center justify-between my-4 w-24">
      <div class="w-16">
        <img class="w-16 h-16 rounded-full" src={props.image} alt="img" />
      </div>
      <div class="flex-1 pl-4">
        <div class="text-gray-700 font-semibold">{props.name}</div>
        <div class="text-gray-600 font-normal text-base">
          {props.designation}
        </div>
      </div>
    </div>
  );
};

class RegisteredMembers extends Component {
  state = { Members: JoinedMembers };
  searchHandler = (event) => {
    let searcjQery = event.target.value.toLowerCase(),
      displayedContacts = JoinedMembers.filter((el) => {
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
      Members: displayedContacts,
    });
  };
  render() {
    return (
      <div className="mt-1 text-lg text-gray-800 font-semibold w-3/4 leading-relaxed">
        <div className="flex flex-row">
          <div className="mt-2">{this.props.peopleGoing} booked so far</div>
          <div class="relative flex w-1/2 flex-wrap items-stretch mb-2 ml-auto">
            <span class=" h-full leading-snug font-normal z-2 text-center text-gray-700 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i class="fas fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="Find your friends..."
              class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
              classNAme="search"
              onChange={this.searchHandler}
            />
          </div>
        </div>
        <br />
        <div className="flex flex-row flex-wrap overflow-x-auto max-h-300-px">
          {this.state.Members.map((el) => {
            return (
              <Member
                image={el.profilPic}
                name={el.name}
                designation={el.designation}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default RegisteredMembers;

const JoinedMembers = [
  {
    name: "Harshil Patel",
    profilPic: demoImg1,
    designation: "Badshah",
  },
  {
    name: "Ayush Patel",
    profilPic: demoImg2,
    designation: "Admin",
  },
  {
    name: "Trupal Patel",
    profilPic: demoImg3,
    designation: "Member",
  },
  {
    name: "Dhruvil Shah",
    profilPic: demoImg2,
    designation: "Member",
  },
  {
    name: "Sagar Solanki",
    profilPic: demoImg3,
    designation: "Member",
  },
  {
    name: "Bhargav Patel",
    profilPic: demoImg1,
    designation: "Member",
  },
  {
    name: "Harshil Patel",
    profilPic: demoImg1,
    designation: "Badshah",
  },
  {
    name: "Ayush Patel",
    profilPic: demoImg2,
    designation: "Admin",
  },
  {
    name: "Trupal Patel",
    profilPic: demoImg3,
    designation: "Member",
  },
  {
    name: "Dhruvil Shah",
    profilPic: demoImg2,
    designation: "Member",
  },
  {
    name: "Sagar Solanki",
    profilPic: demoImg3,
    designation: "Member",
  },
  {
    name: "Bhargav Patel",
    profilPic: demoImg1,
    designation: "Member",
  },
  {
    name: "Harshil Patel",
    profilPic: demoImg1,
    designation: "Badshah",
  },
  {
    name: "Ayush Patel",
    profilPic: demoImg2,
    designation: "Admin",
  },
  {
    name: "Trupal Patel",
    profilPic: demoImg3,
    designation: "Member",
  },
  {
    name: "Dhruvil Shah",
    profilPic: demoImg2,
    designation: "Member",
  },
  {
    name: "Sagar Solanki",
    profilPic: demoImg3,
    designation: "Member",
  },
  {
    name: "Bhargav Patel",
    profilPic: demoImg1,
    designation: "Member",
  },
];

RegisteredMembers.defaultProps = {
  Members: JoinedMembers,
  peopleGoing: JoinedMembers.length,
};
