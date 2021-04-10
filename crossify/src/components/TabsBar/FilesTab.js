import React, { Component } from "react";
import FileTable from "components/Tables/FileTable";
import axios from "axios";
class FilesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club_id: this.props.club_id,
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
      }, 100);
    }
  }
  render() {
    return (
      <div>
        {this.state.loding ? (
          <FileTable
            club_id={this.state.club_id}
            data={this.state.mediaData}
          ></FileTable>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default FilesTab;
