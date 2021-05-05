import React, { Component } from "react";
// import { motion } from "framer-motion";

// class PlayGround extends Component {
//   state = { category: ["Test"] };
//   render() {
//     return (
//       <div>
//         <div className="flex flex-row justify-center flex-wrap container p-4">
//           {" "}
//           {this.state.category.map((el) => {
//             return (
//               <motion.button
//                 type="button"
//                 className=" rounded-lg shadow p-4 mr-6 category-container mb-4 text-center   hover:border-lightbeta hover:shadow-lg active:bg-superlightbeta active:text-white hover:bg-offwhite  hover:text-extrabeta font-semibold"
//                 style={{ outline: "none" }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {el}
//               </motion.button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }

// export default PlayGround;
import Autosuggest from "react-autosuggest";
import STATES from "views/auth/states-and-districts.json";
const languages = [
  {
    title: "1970s",
    languages: [
      {
        name: "C",
        year: 1972,
      },
    ],
  },
  {
    title: "1980s",
    languages: [
      {
        name: "C++",
        year: 1983,
      },
      {
        name: "Perl",
        year: 1987,
      },
    ],
  },
  {
    title: "1990s",
    languages: [
      {
        name: "Haskell",
        year: 1990,
      },
      {
        name: "Python",
        year: 1991,
      },
      {
        name: "Java",
        year: 1995,
      },
      {
        name: "Javascript",
        year: 1995,
      },
      {
        name: "PHP",
        year: 1995,
      },
      {
        name: "Ruby",
        year: 1995,
      },
    ],
  },
  {
    title: "2000s",
    languages: [
      {
        name: "C#",
        year: 2000,
      },
      {
        name: "C#",
        year: 2000,
      },
      {
        name: "C#",
        year: 2000,
      },
      {
        name: "C#",
        year: 2000,
      },
      {
        name: "C#",
        year: 2000,
      },
      {
        name: "C#",
        year: 2000,
      },
      {
        name: "C#",
        year: 2000,
      },
      {
        name: "Scala",
        year: 2003,
      },
      {
        name: "Clojure",
        year: 2007,
      },
      {
        name: "Go",
        year: 2009,
      },
    ],
  },
  {
    title: "2010s",
    languages: [
      {
        name: "Elm",
        year: 2012,
      },
    ],
  },
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
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
    .filter((el) => el.cities.length > 0 );
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
    // <input
    //   class="p-2  text-lg w-full"
    //   type="text"
    //   name="location"
    //   placeholder="Select Location"
    //   value=""
    //   style="outline: none;"
    // ></input>;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Select City",
      value,
      onChange: this.onChange,
      className:this.props.className,
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
