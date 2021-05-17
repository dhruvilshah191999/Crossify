import React, { Component } from "react";

export class InputTagsContainer extends Component {
  state = { tags: this.props.tags || ["hello", "how are you ? "] };
  removeTag(index) {
    var newTags = this.state.tags;
    newTags.splice(index, 1);
    this.setState({ tags: newTags });
    this.props.handleUpdateTags(this.state.tags);
  }
  handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      if (this.state.tags.indexOf(e.target.value) === -1) {
        var tags = this.state.tags;
        tags.push(e.target.value);
        this.setState({ tags: tags });
        this.props.handleUpdateTags(this.state.tags);
      }
      e.target.value = "";
    }
  };
  render() {
    return (
      <div className="flex flex-col">
        <div>
          <input
            type="text"
            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            placeholder="Enter the relevant Tags "
            name="Tags"
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <div className="mt-2">
          {this.state.tags.map((el, index) => (
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-beta bg-lightbeta mr-1 mt-1">
              {el}
              <i
                className="ml-1 fas fa-times cursor-pointer"
                onClick={() => this.removeTag(index)}
              ></i>
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default InputTagsContainer;
