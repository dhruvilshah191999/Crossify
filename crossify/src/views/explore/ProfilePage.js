import React, { Component } from "react";
import Navbar from "components/Navbars/ClubNavbar";
import MemberDetails from "components/Cards/MemberDetails";
import Footer from "components/Footers/FooterAdmin";
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.match.params.id,
    };
  }
  render() {
    return (
      <>
        <Navbar />
        <div className="flex justify-center">
          <div className="container mx-8 w-full">
            <div className="mt-20">
              <MemberDetails user_id={this.state.user_id}></MemberDetails>
            </div>
          </div>
        </div>
        <hr />
        <Footer />
      </>
    );
  }
}

export default ProfilePage;
