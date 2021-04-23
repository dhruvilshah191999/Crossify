import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "context/usercontext";

export default function ContextData() {
  const {
    category_dispatch,
    event_dispatch,
    club_dispatch,
    islogin_dispatch,
    dispatch,
    interestevent_dispatch,
  } = useContext(UserContext);
  useEffect(async () => {
    const token = localStorage.getItem("jwt");
    async function checkLogin() {
      if (!token) {
        islogin_dispatch({ type: "Login-Status", status: false });
      } else {
        islogin_dispatch({ type: "Login-Status", status: true });
        try {
          const data = {
            token: token,
          };
          const config = {
            method: "POST",
            header: {
              "Content-Type": "application/json",
            },
          };
          const res = await axios.post("/api/auth", data, config);
          if (res.data.is_error) {
            window.localStorage.removeItem("jwt");
          } else {
            dispatch({ type: "ADD_USER", payload: res.data });
          }
        } catch (error) {
          window.localStorage.removeItem("jwt");
        }
      }
    }

    async function withoutlogin_event() {
      const config = {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      };
      const finaldata = await axios.get("/api/events/get-event", config);
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        event_dispatch({ type: "Add-Event", add: finaldata.data.data });
      }
    }

    async function login_event() {
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
        "/api/events/get-event-byuser",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        event_dispatch({ type: "Add-Event", add: finaldata.data.data });
      }
    }

    async function withoutlogin_club() {
      const config = {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      };
      const finaldata = await axios.get("/api/events/get-club", config);
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        club_dispatch({ type: "Add-Club", add: finaldata.data.data });
      }
    }

    async function login_club() {
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
        "/api/events/get-club-byuser",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        club_dispatch({ type: "Add-Club", add: finaldata.data.data });
      }
    }

    async function withoutlogin_interest_data() {
      const finaldata = await axios.get("/api/events/get-interest-data");
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        interestevent_dispatch({
          type: "Add-Event",
          add: finaldata.data.data,
        });
      }
    }

    async function login_interest_data() {
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
        "/api/events/user-interest-data",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        interestevent_dispatch({ type: "Add-Event", add: finaldata.data.data });
      }
    }

    async function get_interest() {
      const finaldata = await axios.get("/api/events/get-interest");
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        category_dispatch({ type: "Add-Category", add: finaldata.data.data });
      }
    }

    checkLogin();
    get_interest();
    if (!token) {
      withoutlogin_event();
      withoutlogin_club();
      withoutlogin_interest_data();
    } else {
      login_event();
      login_club();
      login_interest_data();
    }
  }, []);
  return <></>;
}
