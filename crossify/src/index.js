import React from "react";
import ReactDOM from "react-dom";
import App from "app.js";
import UserContextProvider from "context/usercontext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
