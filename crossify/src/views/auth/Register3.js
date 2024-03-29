import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "context/usercontext";
import PulseLoader from "react-spinners/PulseLoader";
import Key from "config/default.json";
import { notifySuccessSignUp } from "notify";
import CryptoJS from "crypto-js";
import businessIcon from "../../assets/icons/manager.svg";
import danceIcon from "../../assets/icons/dance.svg";
import entertainmentIcon from "../../assets/icons/videocamera.svg";
import fashionIcon from "../../assets/icons/dress.svg";
import foodIcon from "../../assets/icons/fast-food.svg";
import fitnessIcon from "../../assets/icons/exercise.svg";
import sportIcon from "../../assets/icons/football-players.svg";
import techIcon from "../../assets/icons/innovation.svg";
import travelIcon from "../../assets/icons/travel.svg";
import artIcon from "../../assets/icons/art.svg";
import bookIcon from "../../assets/icons/reading.svg";
import careerIcon from "../../assets/icons/goal.svg";
import beautyIcon from "../../assets/icons/cosmetics.svg";
import tradingIcon from "../../assets/icons/exchange-rate.svg";
import adventureIcon from "../../assets/icons/adventure.svg";
import musicIcon from "../../assets/icons/music.svg";
import photoIcon from "../../assets/icons/camera.svg";
import scifiIcon from "../../assets/icons/controller.svg";
import writingIcon from "../../assets/icons/writing.svg";
import othersIcon from "../../assets/icons/direction.svg";

let intersetMap = {
  Business: businessIcon,
  Dance: danceIcon,
  Entertainment: entertainmentIcon,
  Fashion: fashionIcon,
  Food: foodIcon,
  Fitness: fitnessIcon,
  Sports: sportIcon,
  Technology: techIcon,
  Travel: travelIcon,
  "Art & Crafts": artIcon,
  Books: bookIcon,
  Career: careerIcon,
  Beauty: beautyIcon,
  Trading: tradingIcon,
  Adventure: adventureIcon,
  Music: musicIcon,
  Photography: photoIcon,
  "Sci-Fi & Games": scifiIcon,
  Writing: writingIcon,
  Others: othersIcon,
};

export default function Register5() {
  let history = useHistory();
  const design = true;
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

  useEffect(() => {
    async function setTime() {
      setTimeout(() => {
        setcategoryloading(true);
      }, 500);
    }
    setTime();
  }, []);

  useEffect(() => {
    async function setData() {
      setInterestState(
        category.map((data) => {
          return {
            select: false,
            id: data._id,
            name: data.category_name,
          };
        })
      );
    }
    setData();
  }, [categoryloading, category]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const array = interestState
      .filter(({ select }) => select)
      .map(({ id }) => id);

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
      {!design ? (
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
      ) : (
        <div className="container relative mx-auto category-width">
          <div className="p-8 sm:p-0 flex flex-row flex-wrap justify-center items-center">
            {interestState.map((el) => {
              return (
                <div
                  className="p-4 m-2 text-center rounded-lg icon-class"
                  onClick={() => {
                    setInterestState(
                      interestState.map((records) => {
                        if (records.id === el.id) {
                          records.select = !records.select;
                        }
                        return records;
                      })
                    );
                  }}
                >
                  <div>
                    <img
                      src={intersetMap[el.name]}
                      className="imgIcon cursor-pointer"
                      alt="category_name"
                    />
                  </div>
                  <div className="text-black">{el.name}</div>

                  {el.select ? (
                    <div className="overlay2">
                      <i className="fas fa-check"></i>
                    </div>
                  ) : (
                    <div className="overlay cursor-pointer"></div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-center">
            <button
              className="px-12 font-semibold hover:bg-semibeta py-4 bg-beta rounded-lg text-white"
              onClick={onSubmit}
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}
    </>
  );
}
