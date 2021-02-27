import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Login from "views/auth/Login.js";
import Background from "assets/img/register_bg_2.png";
import Register from "views/auth/Register.js";
import Register2 from "views/auth/Register2";
import SocialRegister2 from "views/auth/SocialRegister2";
import Register3 from "views/auth/Register3";
import ChangePassword from "views/auth/ChangePassword";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${Background})`,
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Route path="/auth/register/step2" exact component={Register2} />
            <Route path="/auth/register/step3" exact component={Register3} />
            <Route
              path="/auth/changepassword"
              exact
              component={ChangePassword}
            />
            <Route
              path="/auth/register/socialstep2"
              exact
              component={SocialRegister2}
            />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
        </section>
      </main>
    </>
  );
}
