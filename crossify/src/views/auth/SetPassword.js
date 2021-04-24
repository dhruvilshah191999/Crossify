import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { notifyWrongLink, notifySuccessPassword } from "notify";
import { Formik } from "formik";

function SetPassword() {
  const { id } = useParams();
  let history = useHistory();
  const [formData, setData] = useState({
    password: "",
    confirm_password:"",
  });

  const { password, confirm_password } = formData;

  useEffect(() => {
    async function check() {
      const Credentials = {
        generate:id,
      };
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      };
      const res = await axios.post("/api/manage/check-code", Credentials, config);
      if (res.data.is_error) {
        notifyWrongLink();
        history.push("/auth/login")
      }
    }
    check();
  },[history,id]);

  const onChange = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center">
                <h1 className="text-gray-600 text-sm font-bold">
                  Set Your New Password
                </h1>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <Formik
                initialValues={formData}
                validate={() => {
                  const errors = {};
                  if (!password) {
                    errors.password = "Password is required !";
                  } else if (password.length < 6) {
                    errors.password = "Minimim 6 characters are required !";
                  } else if (!confirm_password) {
                    errors.confirm_password = "Confirm password is required !";
                  } else if (password !== confirm_password) {
                    errors.confirm_password = "Password does not match !";
                  }
                  return errors;
                }}
                onSubmit={async ({ setSubmitting }) => {
                  const Credentials = {
                    password,
                    generate:id,
                  };
                  try {
                    const config = {
                      method: "POST",
                      header: {
                        "Content-Type": "application/json",
                      },
                      validateStatus: () => true,
                    };
                    const res = await axios.post(
                      "/api/manage/reset_password",
                      Credentials,
                      config
                    );
                    if (res.data.is_error) {
                      notifyWrongLink();
                    } else {
                      notifySuccessPassword();
                      history.push("/auth/login")
                    }
                  } catch (error) {
                    console.log(error);
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.password && touched.password && errors.password}
                      </p>
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        value={confirm_password}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.confirm_password &&
                          touched.confirm_password &&
                          errors.confirm_password}
                      </p>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-lightalpha hover:bg-alpha text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetPassword;
