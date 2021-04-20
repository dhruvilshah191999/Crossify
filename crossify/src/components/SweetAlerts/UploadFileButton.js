import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { PickerOverlay, PickerDropPane } from "filestack-react";
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

  onSubmit = async (res) => {
    const token = localStorage.getItem("jwt");
    var object = {
      token,
      club_id: this.state.club_id,
      description: this.state.description,
      file: res.filesUploaded[0].url,
      name: res.filesUploaded[0].filename,
      size: res.filesUploaded[0].size,
    };
    try {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      };
      const finaldata = await axios.post("/api/admin/AddFile", object, config);
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  onRecievedInput = () => {
    const uploadOverlay = (
      <PickerOverlay
        apikey="ANZJzty1sQkCaLmKAzpe3z"
        onSuccess={(res) => this.onSubmit(res)}
      />
    );
    this.setState({
      alert: uploadOverlay,
    });
  };
  confirmProcess = () => {
    this.props.handleRejection();
    this.setState({ alert: null });
  };
  confirmArrival() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        success
        showCancel
        confirmBtnText="Select My File"
        confirmBtnBsStyle="success"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-green-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        title="Upload New File"
        onConfirm={this.onRecievedInput}
        onCancel={this.hideAlert}
        type={"controlled"}
        dependencies={[this.state.file, this.state.description]}
      >
        <div>
          <form>
            <div className="flex flex-wrap ">
              <div className="w-full  px-4"></div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Describe Your File
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
        <button
          className="bg-green-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => this.confirmArrival()}
        >
          <i className="fas fa-plus"></i>&nbsp; Upload File
        </button>

        {this.state.alert}
      </>
    );
  }
}
