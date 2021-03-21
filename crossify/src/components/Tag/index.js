import React, { Component } from "react";

class Tag extends Component {
  render() {
    return (
      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-beta bg-lightbeta mr-1 mt-1">
        {this.props.data}
      </span>
    );
  }
}

export default Tag;
