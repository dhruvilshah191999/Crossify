import React from "react";
import axios from "axios";
import UploadPic from "components/Inputs/UploadPic";
import Sidebar from "components/Sidebar/ManageEventSidebar.js";
import PulseLoader from "react-spinners/PulseLoader";
import ScaleLoader from "react-spinners/ScaleLoader";

export default class DetailsSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      photoUrl: null,
      isCompleted: false,
      description: "",
      eligibility: "",
      event_data: null,
      loading: false,
      loading2: true,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    var send_data = {
      event_id: id,
    };
    const finaldata = await axios.post(
      "/api/profile/event-details",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      if (
        new Date(finaldata.data.event_data.date).getTime() <
        new Date().getTime()
      ) {
        this.setState({ isCompleted: true });
      }
      this.setState({
        description: finaldata.data.event_data.description,
        eligibility: finaldata.data.event_data.eligibility,
        event_data: id,
        photoUrl: finaldata.data.event_data.photo,
        loading2: false,
      });
      console.log(this.state.photoUrl);
    }
  }

  onChange = (e) =>
    this.setState({ ...this.state, [e.target.name]: e.target.value });

  handleCallback = (childData) => {
    this.setState({ photo: childData });
  };

  onSubmit = async (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    if (this.state.photo != null) {
      var url = "https://api.cloudinary.com/v1_1/crossify/image/upload/";
      var path = "Event/" + this.state.photo.name;
      var data = new FormData();
      data.append("file", this.state.photo);
      data.append("upload_preset", "crossify-project");
      data.append("public_id", path);
      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      };
      axios
        .post(url, data, config)
        .then(async (res) => {
          const userdata = {
            description: this.state.description,
            eligibility: this.state.eligibility,
            photo: res.data.secure_url,
            event_id: this.state.event_data,
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
              "/api/manage/details-update",
              userdata,
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
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      };
      var send_data = {
        description: this.state.description,
        eligibility: this.state.eligibility,
        photo: this.state.photo,
        event_id: this.state.event_data,
      };
      const finaldata = await axios.post(
        "/api/manage/details-update",
        send_data,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        window.location.reload();
      }
    }
  };
  render() {
    return (
      <>
        <Sidebar />
        <div className="flex flex-wrap">
          <div className="w-full  px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-gray-800 text-xl font-bold">
                    Event Details
                  </h6>
                  {this.state.loading ? (
                    <div align="center">
                      <PulseLoader color="#48bb78" size={10} />
                    </div>
                  ) : this.state.isCompleted ? (
                    <div className=" p-2 text-sm bg-red-500 text-white font-semibold uppercase rounded-lg ">
                      <i className="fas fa-lock"></i> &nbsp;Read only
                    </div>
                  ) : (
                    <button
                      className="bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={this.onSubmit}
                    >
                      Save &nbsp; <i className="fas fa-save"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {this.state.loading2 ? (
                  <div
                    className="flex justify-center items-center"
                    style={{ height: "55vh" }}
                  >
                    <ScaleLoader color="#825ee4" size={60} />
                  </div>
                ) : (
                  <form>
                    <fieldset disabled={this.state.isCompleted}>
                      <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                        Event Details
                      </h6>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Profile Photo
                            </label>
                            <UploadPic
                              file={this.state.photoUrl}
                              parentCallback={this.handleCallback}
                            ></UploadPic>
                          </div>
                        </div>
                      </div>

                      <hr className="mt-6 border-b-1 border-gray-400" />

                      <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                        About Event
                      </h6>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              description
                            </label>
                            <textarea
                              type="text"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              rows="6"
                              name="description"
                              onChange={this.onChange}
                              value={this.state.description}
                            ></textarea>
                          </div>
                        </div>
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Eligibility
                            </label>
                            <textarea
                              type="text"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              rows="6"
                              name="eligibility"
                              onChange={this.onChange}
                              value={this.state.eligibility}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
