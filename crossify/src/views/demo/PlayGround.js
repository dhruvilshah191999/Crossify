import React, { Component } from "react";
import MultipleInputs from "components/Inputs/MultipleInputs";
import UploadPic from "components/Inputs/UploadPic";
import MultiSelect from "components/Inputs/MultiSelect";

class PlayGround extends Component {
  componentDidMount() {
    const slidePage = document.querySelector(".slide-page");
    const nextBtnFirst = document.querySelector(".firstNext");
    const prevBtnSec = document.querySelector(".prev-1");
    const nextBtnSec = document.querySelector(".next-1");
    const prevBtnThird = document.querySelector(".prev-2");
    const nextBtnThird = document.querySelector(".next-2");
    const prevBtnFourth = document.querySelector(".prev-3");
    const submitBtn = document.querySelector(".submit");
    const progressText = document.querySelectorAll(".step p");
    const progressCheck = document.querySelectorAll(".step .check");
    const bullet = document.querySelectorAll(".step .bullet");
    let current = 1;

    nextBtnFirst.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-25%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
    });
    nextBtnSec.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-50%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
    });
    nextBtnThird.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-75%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
    });
    submitBtn.addEventListener("click", function () {
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
      setTimeout(function () {
        alert("Your Form Successfully Signed up");
      }, 800);
    });

    prevBtnSec.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "0%";
      bullet[current - 2].classList.remove("active");
      progressCheck[current - 2].classList.remove("active");
      progressText[current - 2].classList.remove("active");
      current -= 1;
    });
    prevBtnThird.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-25%";
      bullet[current - 2].classList.remove("active");
      progressCheck[current - 2].classList.remove("active");
      progressText[current - 2].classList.remove("active");
      current -= 1;
    });
    prevBtnFourth.addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = "-50%";
      bullet[current - 2].classList.remove("active");
      progressCheck[current - 2].classList.remove("active");
      progressText[current - 2].classList.remove("active");
      current -= 1;
    });
  }
  render() {
    return (
      <div className="p-4 border border-black " style={{ padding: "5rem" }}>
        <div className="container2 border shadow-full bg-blue-200">
          <header>Signup Form</header>
          <div className="progress-bar">
            <div className="step">
              <p>Basic Info</p>
              <div className="bullet">
                <span>1</span>
              </div>
              <div className="check fas fa-check"></div>
            </div>
            <div className="step">
              <p>Location</p>
              <div className="bullet">
                <span>2</span>
              </div>
              <div className="check fas fa-check"></div>
            </div>
            <div className="step">
              <p>About Club</p>
              <div className="bullet">
                <span>3</span>
              </div>
              <div className="check fas fa-check"></div>
            </div>
            <div className="step">
              <p>Submit</p>
              <div className="bullet">
                <span>4</span>
              </div>
              <div className="check fas fa-check"></div>
            </div>
          </div>
          <div className="form-outer">
            <form action="#">
              <div className="page slide-page">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-8/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        name="club_name"
                        placeholder="Enter the Club Name"
                        // value={club_name}
                        // onChange={(e) => onChange(e)}
                        // onBlur={handleBlur}
                      />
                      {/* <p style={{ color: "#3182ce" }}>
                        {errors.club_name &&
                          touched.club_name &&
                          errors.club_name}
                      </p> */}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Privacy
                      </label>
                      <select
                        className="block shadow focus:shadow-outline  appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2half px-4 pr-8 rounded"
                        id="grid-state"
                        placeholder="Select your relevant Categories"
                        style={{ outline: "none" }}
                        name="privacy"
                        // value={privacy}
                        // onChange={(e) => onChange(e)}
                      >
                        <option>Public</option>
                        <option>Private</option>
                        <option>Closed</option>
                      </select>
                    </div>
                  </div>
                  {/* {formData.privacy === "Private" ? ( */}
                  <MultipleInputs
                  // parentCallback={handleQuestion}
                  ></MultipleInputs>
                  {/* ) : (
                    ""
                  )} */}
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Categories
                      </label>
                      <MultiSelect
                        placeholder="Select your relevant Categories"
                        // parentCallback={handleCategory}
                      ></MultiSelect>
                      <p style={{ color: "#3182ce" }}>
                        {/* {errors.category &&
                                touched.category && errors.category} */}
                        {/* {category.length === 0 ? errors.category : ""} */}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Profile Photo
                      </label>
                      {/* <input
                          type="file"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          defaultValue={this.props.dummyPF}
                        /> */}
                      <UploadPic
                      // parentCallback={handlePhotoCallback}
                      ></UploadPic>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <button className="firstNext next">Next</button>
                </div>
              </div>
              <div className="page">
                <div className="title">Contact Info:</div>
                <div className="field">
                  <div className="label">Email Address</div>
                  <input type="text" />
                </div>
                <div className="field">
                  <div className="label">Phone Number</div>
                  <input type="Number" />
                </div>
                <div className="field btns">
                  <button className="prev-1 prev">Previous</button>
                  <button className="next-1 next">Next</button>
                </div>
              </div>
              <div className="page">
                <div className="title">Date of Birth:</div>
                <div className="field">
                  <div className="label">Date</div>
                  <input type="text" />
                </div>
                <div className="field">
                  <div className="label">Gender</div>
                  <select>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="field btns">
                  <button className="prev-2 prev">Previous</button>
                  <button className="next-2 next">Next</button>
                </div>
              </div>
              <div className="page">
                <div className="title">Login Details:</div>
                <div className="field">
                  <div className="label">Username</div>
                  <input type="text" />
                </div>
                <div className="field">
                  <div className="label">Password</div>
                  <input type="password" />
                </div>
                <div className="field btns">
                  <button className="prev-3 prev">Previous</button>
                  <button className="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayGround;
