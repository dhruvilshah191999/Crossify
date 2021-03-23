import React, { Component } from "react";

import Navbar from "components/Navbars/ClubNavbar";
import ProfileDetails from "components/Cards/ProfileDetails";
class ProfilePage extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="flex justify-center">
          <div className="container mx-8 w-full">
            <div className="mt-20">
              <ProfileDetails></ProfileDetails>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProfilePage;
