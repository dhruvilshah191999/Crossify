import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objectArray: this.props.category,
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
    const { objectArray, selectedValues } = this.state;
    console.log(this.context);
    return (
      <>
        <Multiselect
          options={objectArray}
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
