import React from "react";

export default class AboutTab extends React.Component {
  render() {
    return (
      <div className="mx-4">
        <div className="mb-4">
          <div className="text-2xl text-gray-800 font-semibold mt-1 mb-1">
            About
          </div>
          <div className="my-4 bg-white text-gray-700 rounded-lg">
            {this.props.description}
          </div>
        </div>
        <div className="mb-4">
          <div className="text-2xl text-gray-800 font-semibold mt-1 mb-1">
            Rules
          </div>
          <div className="my-4 bg-white text-gray-700 rounded-lg">
            {this.props.rules}
          </div>
        </div>
        <div className="mb-4">
          <div className="text-2xl text-gray-800 font-semibold mt-1 mb-1">
            Criteria
          </div>
          <div className="my-4 bg-white text--gray-700 rounded-lg">
            {this.props.joining_criteria}
          </div>
        </div>
      </div>
    );
  }
}
