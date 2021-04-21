import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { notifyWrongLink } from "notify";

function VerifiedWindow() {
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    async function check() {
      const Credentials = {
        generate: id,
      };
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      };
      const res = await axios.post(
        "/api/manage/update-code",
        Credentials,
        config
      );
      if (res.data.is_error) {
        notifyWrongLink();
        history.push("/auth/login");
      }
    }
    check();
  }, []);

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center">
                <h1 className="text-gray-600 text-4xl font-bold">
                  Welcome to the Crossify
                </h1>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 text-center">
              <span>
                <span className="text-lg font-semibold ">
                  Your account has been verified.
                </span>{" "}
                <br />
                We are exicted to see you here. Many adventures are waiting for
                you. Discover your nearby tribe and make a strong community.
              </span>
              <br />
              <button
                class=" mt-6 bg-lightalpha hover:bg-alpha text-white  ml-2 lg:ml-0  active:bg-gray-100 uppercase text-base font-bold  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                type="button"
              >
                Discover
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifiedWindow;
