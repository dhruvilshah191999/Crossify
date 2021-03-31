import React, { Component } from "react";
import ManageFilesTable from "components/Tables/ManageFilesTable";
import Sidebar from "components/Sidebar/ManageClubSidebar.js";
import axios from "axios";

class FilesManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club_id: this.props.match.params.id,
      mediaData: [],
      loding: false,
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
    const finaldata = await axios.post("/api/admin/GetFiles", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({
        mediaData: finaldata.data.data,
      });
      setTimeout(() => {
        this.setState({ loding: true });
      }, 500);
    }
  }

  render() {
    if (this.state.loding) {
      return (
        <>
          <Sidebar />
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <ManageFilesTable
                club_id={this.state.club_id}
                data={this.state.mediaData}
              ></ManageFilesTable>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default FilesManager;
