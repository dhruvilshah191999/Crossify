import UploadPic from "components/Inputs/UploadPic";
import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      file: this.props.link,
      description: this.props.description,
      club_id: this.props.club_id,
      old_file: this.props.link,
      link: this.props.link,
      size: this.props.size,
      name: this.props.name,
    };
  }

  handlePhotoCallback = (childData) => {
    this.setState({ file: childData });
  };

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };
  onRecievedInput = async () => {
    var file = this.state.file;
    var desc = this.state.description;
    if (this.state.file != null && this.state.file != this.state.old_file) {
      var url = "https://api.cloudinary.com/v1_1/crossify/image/upload/";
      var path =
        "ClubPhoto/" +
        this.state.club_id +
        "/" +
        this.state.file.name.split(".")[0];
      var data = new FormData();
      data.append("file", this.state.file);
      data.append("upload_preset", "crossify-project");
      data.append("public_id", path);
      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      };
      axios
        .post(url, data, config)
        .then(async (res) => {
          var BytestoKB = file.size * 0.000977;
          var object = {
            club_id: this.state.club_id,
            description: desc,
            photo: res.data.url,
            name: file.name,
            size: BytestoKB,
            link: this.state.link,
          };
          try {
            const config = {
              method: "POST",
              header: {
                "Content-Type": "application/json",
              },
              validateStatus: () => true,
            };
            const finaldata = await axios.post(
              "/api/admin/EditPhoto",
              object,
              config
            );
            if (finaldata.data.is_error) {
              console.log(finaldata.data.message);
            } else {
              window.location.reload();
            }
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => console.log(err));
    } else {
      var object = {
        club_id: this.state.club_id,
        description: this.state.description,
        photo: this.state.old_file,
        name: this.state.name,
        size: this.state.size,
        link: this.state.link,
      };
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      };
      const finaldata = await axios.post(
        "/api/admin/EditPhoto",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        window.location.reload();
      }
    }

    this.setState({
      alert: null,
      file: null,
      description: null,
    });
  };
  confirmProcess = () => {
    this.props.handleRejection();
    this.setState({ alert: null });
  };
  confirmArrival() {
    const getAlert = () => (
      <SweetAlert
        success
        showCancel
        confirmBtnText="Update"
        confirmBtnBsStyle="success"
        title="Are you sure?"
        focusCancelBtn
        customClass="w-800px text-black"
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-blue-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        title="Edit Media"
        onConfirm={this.onRecievedInput}
        onCancel={this.hideAlert}
        type={"controlled"}
        dependencies={[this.state.file, this.state.description]}
      >
        <div>
          <form>
            <div className="flex flex-wrap ">
              <div className="w-full  px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Media
                  </label>
                  <UploadPic
                    file={this.state.file}
                    parentCallback={this.handlePhotoCallback}
                  ></UploadPic>
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="bg-gray-100 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={this.state.description}
                    onChange={(e) => {
                      this.setState({ description: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  render() {
    return (
      <>
        <button title="Edit" onClick={() => this.confirmArrival()}>
          <i className="fas fa-edit text-blue-500 text-lg focus:outline-none mr-4 "></i>
        </button>

        {this.state.alert}
      </>
    );
  }
}
