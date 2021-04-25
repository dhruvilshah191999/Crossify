import React, { useEffect, useState } from "react";
import axios from "axios";
function EditSocialMedia() {
  const [SformData, SetSformData] = useState({
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  const { facebook, linkedin, twitter, instagram } = SformData;

  const onChange = (e) =>
    SetSformData({ ...SformData, [e.target.name]: e.target.value });

  useEffect(() => {
  const token = localStorage.getItem("jwt");
    async function fetchData() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        token: token,
      };
      const finaldata = await axios.post(
        "/api/profile/get-user",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        if (finaldata.data.data.social_media != null) {
          SetSformData({
            facebook: finaldata.data.data.social_media.facebook,
            linkedin: finaldata.data.data.social_media.linkedin,
            twitter: finaldata.data.data.social_media.twitter,
            instagram: finaldata.data.data.social_media.instagram,
          });
        }
      }
    }

    fetchData();
  }, []);

  const onSubmit = async (e) => {
    const token = localStorage.getItem("jwt");
    e.preventDefault();
    var object = {
      facebook,
      linkedin,
      twitter,
      instagram,
      token,
    };
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    const finaldata = await axios.post(
      "/api/profile/update-social",
      object,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">Social Network</h6>
            <button
              className="bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={(e) => onSubmit(e)}
            >
              Save &nbsp; <i className="fas fa-save"></i>
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Usernames
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  LinkedIn
                </label>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <span className="z-10 h-full leading-snug font-normal absolute text-center  absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fab fa-linkedin text-linkedin text-2xl"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Example : www.linkedin.com/in/hackershil"
                    className="px-4 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                    name="linkedin"
                    value={linkedin}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Facebook
                </label>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-blue-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fab fa-facebook-square text-2xl"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Example : www.facebook.com/harshil.y.patel"
                    className="px-4 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                    name="facebook"
                    value={facebook}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Twitter
                </label>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-blue-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fab fa-twitter text-2xl"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Example : www.twitter.com/hackershil"
                    className="px-4 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                    name="twitter"
                    value={twitter}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Instagram
                </label>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <span className="z-10 h-full leading-snug font-normal absolute text-center  absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i
                      className="fab fa-instagram text-pink-500 text-2xl"
                      style={{ color: "#bc2a8d" }}
                    ></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Example : www.instagram.com/hackershil"
                    className="px-4 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                    name="instagram"
                    value={instagram}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSocialMedia;
