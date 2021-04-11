import React, { Component } from "react";
import RequestsTable from "components/Tables/RequestsTable";
import Sidebar from "components/Sidebar/ManageClubSidebar.js";
import axios from "axios";

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club_id: this.props.match.params.id,
      requestData: [],
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
    const finaldata = await axios.post(
      "/api/admin/getRequested",
      object,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({
        requestData: finaldata.data.data,
      });
      setTimeout(() => {
        this.setState({ loading: true });
      }, 500);
    }
  }

  render() {
    return (
      <>
        <Sidebar />
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            {this.state.loading ? (
              <RequestsTable
                club_id={this.state.club_id}
                data={this.state.requestData}
              ></RequestsTable>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MemberList;
