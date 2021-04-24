import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { notifyWrongEmail, notifySuccessMail } from "notify";
import { Formik } from "formik";

function ForgotPassword() {
  let history = useHistory();
  const [formData, setData] = useState({
    email: "",
  });

  const { email } = formData;

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
                  Forgot Password
                </h1>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <Formik
                initialValues={formData}
                validate={() => {
                  const errors = {};
                  if (!email) {
                    errors.email = "Email is required !";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
                  ) {
                    errors.email = "Invalid email address !";
                  }
                  return errors;
                }}
                onSubmit={async ({ setSubmitting }) => {
                  const Credentials = {
                    email: email,
                    url: window.location.origin
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
                      "/api/manage/ForgotMail",
                      Credentials,
                      config
                    );
                    if (res.data.is_error) {
                      notifyWrongEmail();
                    } else {
                      notifySuccessMail();
                      history.push("/auth/login");
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
                        Email
                      </label>
                      <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.email && touched.email && errors.email}
                      </p>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-beta hover:bg-alpha text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Reset Password
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

export default ForgotPassword;
