import React, { Component } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

//todo GOLU all the things are created you just have to make backend code for api/join-club and api/undo-join-club

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      isJoined: this.props.check,
      club_id: this.props.clubid,
      isPublic: 1,
      questions: [
        "Why Do you want to join this Club ?",
        "What skillsets do you posses ?",
        "Any Achievements related to IT industry.",
      ],
      answers: [],
    };
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  onJoining = async () => {
    const token = localStorage.getItem("jwt");
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    var send_data = {
      token,
      club_id: this.state.club_id,
    };
    console.log(send_data);
    const finaldata = await axios.post(
      "/api/club/join-club",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({ alert: null, isJoined: finaldata.data.participated });
    }
  };
  removeThisMember = async () => {
    const token = localStorage.getItem("jwt");
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    var send_data = {
      token,
      club_id: this.state.club_id,
    };
    console.log(send_data);
    const finaldata = await axios.post(
      "/api/club/undo-join-club",
      send_data,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      this.setState({
        alert: null,
        isJoined: finaldata.data.participated || false,
      });
    }
  };
  successJoined() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        success
        title={"Welcome to the club !"}
        confirmBtnText="Got It !"
        confirmBtnCssClass="text-base rounded px-4 px-2 overwrite-success-btn"
        confirmBtnStyle={{ backgroundColor: "##28a745" }}
        onConfirm={this.onJoining}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You successfully joined{" "}
        <span className="font-semibold">{this.props.clubName}</span> as a
        Member.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
      isJoined: true,
    });
  }
  onCancleRequest = () => {
    //todo GOLU cancle Request
    this.setState({ alert: null, isRequested: false });
  };

  onRecievedInput = () => {
    //todo GOLU grab the question and answer here and post it
    this.setState({ alert: null, isRequested: true, isJoined: false });
  };
  requestForJoining() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black "
        success
        showCancel
        confirmBtnText="Submit"
        confirmBtnBsStyle="success"
        customClass="text-black"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-green-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        title="Fill up the form."
        onConfirm={this.onRecievedInput}
        onCancel={this.hideAlert}
        type={"controlled"}
        dependencies={[this.state.questions]}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        <div>
          <form>
            <div className="flex flex-col ">
              {this.state.questions.map((el, index) => (
                <div>
                  <div className="w-full  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-gray-700 text-base font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        {el}
                      </label>
                      <textarea
                        rows="2"
                        className="bg-gray-100 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        defaultValue={this.state.answers[index]}
                        onChange={(e) => {
                          this.setState({ answers: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  removeRegisteration() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        danger
        showCancel
        confirmBtnText="Leave"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.removeThisMember}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are canceling your Club Membership.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  cancleRequest() {
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        danger
        showCancel
        confirmBtnText="Delete My Request"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 px-2"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={this.onCancleRequest}
        onCancel={this.hideAlert}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are canceling your request to join this club.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  render() {
    return (
      <div className="w-full">
        {this.state.isJoined ? (
          <button
            className=" w-full  hover:bg-lightalpha shadow border border-solid  bg-lightalpha text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => this.removeRegisteration()}
          >
            <i class="fas fa-file-signature"></i> Member
            {/* //todo GOLU here just
           // get the designation of the person and put it here */}
          </button>
        ) : this.state.isRequested ? (
          <button
            className=" w-full  hover:bg-alpha shadow border border-solid  bg-lightalpha text-white active:bg-alpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => this.cancleRequest()}
          >
            <i class="fas fa-envelope"></i>&nbsp; Requested
          </button>
        ) : this.state.isPublic ? (
          <button
            className=" w-full  hover:bg-lightalpha shadow border border-solid  bg-alpha text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => this.successJoined()}
          >
            <i class="fas fa-user-plus "></i> Join
          </button>
        ) : (
          <button
            className=" w-full  hover:bg-orange-300 shadow border border-solid  bg-orange-500 text-white active:bg-orange-300 font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => this.requestForJoining()}
          >
            <i class="fas fa-id-card-alt"></i>&nbsp; Request to join
          </button>
        )}

        {this.state.alert}
      </div>
    );
  }
}
