import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "context/usercontext";
import PulseLoader from "react-spinners/PulseLoader";
import Key from "config/default.json";
import { notifySuccessSignUp } from "notify";
import CryptoJS from "crypto-js";

export default function Register5() {
  let history = useHistory();
  const [loading, setloading] = useState(false);
  const [categoryloading, setcategoryloading] = useState(false);
  const { category } = useContext(UserContext);
  const [interestState, setInterestState] = useState([]);
  var decryptedData;
  var RegisterData = localStorage.getItem("RegisterData");
  if (RegisterData) {
    var bytes = CryptoJS.AES.decrypt(RegisterData, Key.Secret);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    history.push("/auth/register");
  }

  useEffect(async () => {
    setTimeout(() => {
      setcategoryloading(true);
    }, 500);
  }, []);
  useEffect(async () => {
    setInterestState(
      category.map((data) => {
        return {
          select: false,
          id: data._id,
          name: data.category_name,
        };
      })
    );
  }, [categoryloading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    let array = [];
    await interestState.map((data) => {
      if (data.select === true) {
        array.push(data.id);
      }
    });
    var data = {
      data: decryptedData,
      interest_array: array,
      url: window.location.origin,
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
        "/api/manage/WelcomeMail",
        data,
        config
      );
      if (finaldata.data.is_error) {
      } else {
        notifySuccessSignUp();
        localStorage.removeItem("RegisterData");
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
                  <h6 className="text-gray-700 text-2xl font-semibold ">
                    <i className="fa fa-heart mr-2" aria-hidden="true"></i>
                    Choose Your Interest
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
                    {loading ? (
                      <div align="center">
                        <PulseLoader color="#e82953" size={10} />
                      </div>
                    ) : (
                      <button
                        className="bg-lightalpha hover:bg-alpha text-white active:bg-gray-700 text-sm font-bold uppercase px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => onSubmit(e)}
                      >
                        Submit
                      </button>
                    )}
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
