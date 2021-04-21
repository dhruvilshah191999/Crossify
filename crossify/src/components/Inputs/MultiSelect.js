import React from "react";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";

class App extends React.Component {
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

  componentDidMount = async () => {
    console.log(this.state.selectedValues);
    const finaldata = await axios.get("/api/events/get-interest");
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      console.log(finaldata.data.data);
      this.setState({ objectArray: finaldata.data.data });
    }
  };

  onSelect = (selectedList) => {
    this.props.parentCallback(selectedList);
  };

  onRemove = (selectedList) => {
    this.props.parentCallback(selectedList);
  };
  render() {
    const { objectArray, selectedValues } = this.state;
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
