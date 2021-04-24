import React, { Component } from "react";

class PlayGround extends Component {
  componentDidMount() {
    const $button = document.getElementById("sendNotification");
    const $bell = document.getElementById("notification");

    $button.addEventListener("click", function (event) {
      const count = Number($bell.getAttribute("data-count")) || 0;

      $bell.setAttribute("data-count", count + 1);
      $bell.classList.add("show-count");
      $bell.classList.add("notify");
    });

    $bell.addEventListener("animationend", function (event) {
      $bell.classList.remove("notify");
    });
  }
  render() {
    return (
      <div>
        <div className="p-4 flex justify-center gap-1">
          <div>
            <button id="sendNotification" class="btn">
              Send notification
            </button>
            <div id="notification" class="notification">
              <i className="fas fa-comments"></i>
              <span className="notification-badge"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayGround;
