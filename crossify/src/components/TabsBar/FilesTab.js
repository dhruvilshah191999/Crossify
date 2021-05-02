import React, { Component } from "react";
import FileTable from "components/Tables/FileTable";

class FilesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club_id: this.props.club_id,
      mediaData: this.props.file || [],
      loding: false,
    };
  }

  async componentDidMount() {
    this.state.mediaData.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB - dateA;
    });
    setTimeout(() => {
      this.setState({ loding: true });
    }, 100);
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
