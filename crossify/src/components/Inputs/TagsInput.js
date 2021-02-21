// // // import TagsInput from "react-tagsinput";

// // // import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

// // // export default class Example extends React.Component {
// // //   constructor() {
// // //     super();
// // //     this.state = { tags: [] };
// // //   }

// // //   render() {
// // //     return <TagsInput value={this.state.tags} onChange={this.handleChange} />;
// // //   }
// // // }
// // import React from "react";
// // import ReactTagInput from "@pathofdev/react-tag-input";
// // import "@pathofdev/react-tag-input/build/index.css";

// // class TagsInput extends React.Component
// // {
// //     state = {tags};
// //     handleChange(e)
// //     {

// //     }
// //     render(
// //         return <ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} />;
// //     )
// // }
// // export default function App() {
// //   const [tags, setTags] = React.useState(["example tag"]);

// // }

// import React, { Component } from "react";

// import "./style.css";
// import { WithContext as ReactTags } from "react-tag-input";

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tags: [
//         { id: 1, text: "Thailand" },
//         { id: 2, text: "India" },
//       ],
//       suggestions: COUNTRIES,
//     };
//     this.handleDelete = this.handleDelete.bind(this);
//     this.handleAddition = this.handleAddition.bind(this);
//     this.handleDrag = this.handleDrag.bind(this);
//     this.handleTagClick = this.handleTagClick.bind(this);
//   }

//   handleDelete(i) {
//     this.setState({
//       tags: this.state.tags.filter((tag, index) => index !== i),
//     });
//   }

//   handleAddition(tag) {
//     let { tags } = this.state;
//     this.setState({ tags: [...tags, { id: tags.length + 1, text: tag }] });
//   }

//   handleDrag(tag, currPos, newPos) {
//     const tags = [...this.state.tags];

//     // mutate array
//     tags.splice(currPos, 1);
//     tags.splice(newPos, 0, tag);

//     // re-render
//     this.setState({ tags });
//   }

//   handleTagClick(index) {
//     console.log("The tag at index " + index + " was clicked");
//   }

//   render() {
//     const { tags, suggestions } = this.state;
//     return (
//       <ReactTags
//         tags={tags}
//         suggestions={suggestions}
//         handleDelete={this.handleDelete}
//         handleAddition={this.handleAddition}
//         handleDrag={this.handleDrag}
//         handleTagClick={this.handleTagClick}
//       />
//     );
//   }
// }
