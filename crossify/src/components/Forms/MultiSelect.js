import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plainArray: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
      objectArray: [
        { key: "Option 1", cat: "Group 1" },
        { key: "Option 2", cat: "Group 1" },
        { key: "Option 3", cat: "Group 1" },
        { key: "Option 4", cat: "Group 2" },
        { key: "Option 5", cat: "Group 2" },
        { key: "Option 6", cat: "Group 2" },
        { key: "Option 7", cat: "Group 2" },
      ],
      selectedValues: [
        { key: "Option 1", cat: "Group 1" },
        { key: "Option 2", cat: "Group 1" },
      ],
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
    this.addItem = this.addItem.bind(this);
  }
  addItem() {
    this.selectedValues.push({ key: "Option 3", cat: "Group 1" });
  }
  render() {
    const { plainArray, objectArray, selectedValues } = this.state;
    return (
      <>
        <Multiselect
          options={objectArray}
          displayValue="key"
          showCheckbox={true}
        />
      </>
    );
  }
}

export default App;
