import UploadPic from "components/Inputs/UploadPic";
import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      file: null,
      description: null,
      club_id: this.props.club_id,
    };
  }
  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  handlePhotoCallback = (childData) => {
    this.setState({file:childData });
  };

  onRecievedInput = () => {
    const token = localStorage.getItem("jwt");
    if (this.state.file != null) {
      var url = "https://api.cloudinary.com/v1_1/crossify/image/upload/";
      var path = "ClubPhoto/" + this.state.club_id + "/" + this.state.file.name.split(".")[0];
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
          var object = {
            token,
            club_id: this.state.club_id,
            description: this.state.description,
            photo: res.data.url,
            name: this.state.file.name,
            size: this.state.file.size,
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
              "/api/admin/AddPhoto",
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
    }

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
        confirmBtnText="Upload"
        confirmBtnBsStyle="success"
        title="Are you sure?"
        focusCancelBtn
        customClass="w-800px text-black"
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-green-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        title="Upload New Media"
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
                    File
                  </label>
                  <UploadPic parentCallback={this.handlePhotoCallback}></UploadPic>
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
        <button
          className="bg-green-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => this.confirmArrival()}
        >
          <i class="fas fa-plus"></i>&nbsp; Upload Media
        </button>

        {this.state.alert}
      </>
    );
  }
}
