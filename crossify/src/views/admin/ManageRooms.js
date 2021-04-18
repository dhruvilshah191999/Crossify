import React, { Component } from "react";
import Sidebar from "components/Sidebar/ManageClubSidebar.js";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import RoomsTable from "components/Tables/RoomsTable";
class ManageRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club_id: this.props.match.params.id,
      Data: [],
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
    const finaldata = await axios.post("/api/admin/Getchannel", object, config);
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({
        Data: finaldata.data.data,
      });
      setTimeout(() => {
        this.setState({ loading: true });
      }, 300);
    }
  }

  render() {
    return (
      <>
        <Sidebar />
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            {this.state.loading ? (
              <RoomsTable
                club_id={this.state.club_id}
                data={this.state.Data}
              ></RoomsTable>
            ) : (
              <div
                className="flex justify-center items-center"
                style={{ height: "60vh" }}
              >
                <ScaleLoader color="#825ee4" size={60} />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default ManageRooms;
