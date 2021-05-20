import React from "react";

export default class AboutTab extends React.Component {
  render() {
    return (
      <div className="mx-4">
        <div className="mb-4 overflow-hidden">
          <div className="text-2xl text-gray-800 font-semibold mt-1 mb-1">
            About
          </div>
          <div className="my-4 bg-white text-gray-700 rounded-lg">
            <pre>{this.props.description}</pre>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-2xl text-gray-800 font-semibold mt-1 mb-1">
            Rules
          </div>
          <div className="my-4 bg-white text-gray-700 rounded-lg">
            <pre>{this.props.rules}</pre>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-2xl text-gray-800 font-semibold mt-1 mb-1">
            Criteria
          </div>
          <div className="my-4 bg-white text--gray-700 rounded-lg">
            <pre>{this.props.joining_criteria}</pre>
          </div>
        </div>
      </div>
    );
  }
}

AboutTab.defaultProps = {
  description:
    "sum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  rules:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose",
  joining_criteria:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 o(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,omes from a line in section 1.10.32.",
};
