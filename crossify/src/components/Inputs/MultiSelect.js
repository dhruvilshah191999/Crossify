import React from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { UserContext } from "context/usercontext";

class App extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      objectArray: [],
      selectedValues: this.props.selectedValues,
    };
    this.style = {
      chips: {
        background: "red",
      },
      searchBox: {
        border: "5px solid black",
        "border-bottom": "1px solid blue",
        "border-radius": "1px",
      },
      multiselectContainer: {
        color: "red",
      },
    };
  }

  onSelect = (selectedList) => {
    this.props.parentCallback(selectedList);
  };

  onRemove = (selectedList) => {
    this.props.parentCallback(selectedList);
  };
  render() {
    const { selectedValues } = this.state;
    return (
      <>
        <Multiselect
          options={this.context.category}
          selectedValues={selectedValues}
          displayValue="category_name"
          onSelect={this.onSelect}
          onRemove={this.onRemove}
          showCheckbox={true}
        />
      </>
    );
  }
}

export default App;
