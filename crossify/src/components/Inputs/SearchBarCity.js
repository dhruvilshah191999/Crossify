import React from "react";

import Autosuggest from "react-autosuggest";
import STATES from "views/auth/states-and-districts.json";

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");
  var crispStates = STATES.states;

  return crispStates
    .map((el) => {
      return {
        state: el.state,
        cities: el.districts.filter(
          (city) => regex.test(city) && city !== "Select Option"
        ),
      };
    })
    .filter((el) => el.cities.length > 0);
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion}</span>;
}

function renderSectionTitle(section) {
  return <strong>{section.state}</strong>;
}

function getSectionSuggestions(section) {
  return section.cities;
}

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: [],
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    });
    this.props.onLocationChange(newValue);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Select City",
      value,
      onChange: this.onChange,
      className: this.props.className,
    };

    return (
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps}
      />
    );
  }
}
