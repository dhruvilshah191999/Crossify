import React, { Component } from "react";
import Sidebar from "components/Sidebar/ManageClubSidebar.js";
import ManageMediaTable from "components/Tables/ManageMediaTable";
import axios from "axios";

class MediaManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club_id: this.props.match.params.id,
      mediaData: [],
      loding:false,
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
    const finaldata = await axios.post("/api/admin/GetPhotos", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({
        mediaData: finaldata.data.data,
      });
      setTimeout(this.setState({loding:true}), 1000);
    }
  }
  render() {
    if (this.state.loding) {
      return (
        <>
          <Sidebar />
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <ManageMediaTable club_id={this.state.club_id} data={this.state.mediaData}></ManageMediaTable>
            </div>
          </div>
        </>
      );
    }
    else {
      return <></>
    }
  }
}

export default MediaManager;
