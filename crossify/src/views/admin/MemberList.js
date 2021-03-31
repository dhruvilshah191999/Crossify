import React, { Component } from "react";
import Sidebar from "components/Sidebar/ManageClubSidebar.js";
import MembersTable from "components/Tables/MembersTable";
import axios from "axios";

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club_id: this.props.match.params.id,
      memberData: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      club_id: this.state.club_id,
    };
    const finaldata = await axios.post("/api/admin/GetMembers", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({
        memberData: finaldata.data.data,
      });
      setTimeout(() => {
        this.setState({ loading: true });
      }, 500);
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <>
          <Sidebar />
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <MembersTable
                club_id={this.state.club_id}
                data={this.state.memberData}
              ></MembersTable>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default MemberList;
