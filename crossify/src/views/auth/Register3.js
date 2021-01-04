import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Key from "config/default.json";
import CryptoJS from "crypto-js";

export default function Register5() {
  let history = useHistory();
  const [interestState, setInterestState] = useState([]);
  var decryptedData;
  var localemail = localStorage.getItem("email");
  if (localemail) {
    var bytes = CryptoJS.AES.decrypt(localemail, Key.Secret);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    history.push("/auth/register");
  }

  useEffect(async () => {
    let InterestArray = [];
    try {
      const config = {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      };
      const finaldata = await axios.get("/api/events/get-interest", config);
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        InterestArray = finaldata.data.data;
      }
    } catch (err) {
      console.log(err);
    }

    setInterestState(
      InterestArray.map((data) => {
        return {
          select: false,
          id: data._id,
          name: data.category_name,
        };
      })
    );
    console.clear();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let array = [];
    await interestState.map((data) => {
      if (data.select === true) {
        array.push(data.id);
      }
    });
    var data = {
      email: decryptedData.email,
      interest_array: array,
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
        "/api/events/add-interest",
        data,
        config
      );
      if (finaldata.data.is_error) {
        localStorage.removeItem("email");
        history.push("/auth");
      } else {
        localStorage.removeItem("email");
        history.push("/auth");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container mx-auto px-12 h-full bg-gray-900">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-12">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-700 text-sm font-bold uppercase">
                    <i className="fa fa-heart mr-2" aria-hidden="true"></i>
                    Choose Your Interest
                    <i className="fa fa-heart ml-2" aria-hidden="true"></i>
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <div className="">
                    {interestState.map((data) => (
                      <div className="relative w-full mb-3" key={data.id}>
                        <input
                          type="checkbox"
                          onChange={(event) => {
                            let checked = event.target.checked;
                            setInterestState(
                              interestState.map((records) => {
                                if (records.id === data.id) {
                                  records.select = checked;
                                }
                                return records;
                              })
                            );
                          }}
                          checked={data.select}
                          className="text-gray-700 bg-white rounded text-sm"
                        ></input>

                        <label className="ml-2 inline-block uppercase text-gray-700 text-sm font-bold mb-2 mr-2">
                          {data.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="w-full mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={(e) => onSubmit(e)}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
