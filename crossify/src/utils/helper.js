import socket from "socket.io-client";
import urlObject from "./../config/default.json";

var BackendURL = urlObject.BackendURL;
export default socket(BackendURL, {
  transport: ["websocket"],
});
